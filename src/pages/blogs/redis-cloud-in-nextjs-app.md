---
layout: "../../layouts/post.astro"
coverImage: "/src/images/redis-cloud-pricing.png"
title: "Using Redis Cloud in your NextJS application"
description: "Things are very different if you are using Redis Enterprise Cloud in a NextJS application and having your backend services orchestrated using the Serverless Functions. If you do not understand the basics of NextJS and Serverless Functions enough, you would encounter this error and never understand the cause of it"
publishDate: "21 June 2022"
author: "Jake Chen"
---

Recently, a Youtuber and Javascript influencer FireShip released a [tutorial](https://www.youtube.com/watch?v=DOIWQddRD5M&t=334s&ab_channel=Fireship) of utilizing Redis Enterprise Cloud as a high speed cloud data storage in a NextJS web application and the tutorial attracted hundreds of thousand of views on the internet. Although I was on the fence about using an in-memory database as the main database for a full-stack application, the Redis Enterprise Cloud service offer - together with a $200 voucher - had me interested enough to try it as a runtime cache of a NextJS application I built for a product demo to York University.

Arriving at Redis Enterprice Cloud service offering page, I picked the free tier since I was not certain if I would start spending the $200 credit yet. The free service tier - as you would imagine for anything that is free - does not offer a lot: 30MB RAM for 1 dedicated database with **30 maximum concurrent connections**.

![Redis Enterprise Cloud pricing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/adqf02q6yhezk66m26l9.PNG "Redis Enterprise Cloud pricing information")

30 maximum connections may not seem like an issue as long as you are not building an application that has specific requirements for concurrency. This statement could be true if we are establishing connections between a Node server and a Redis cache since it is [recommended that only one or two Redis client would be instantiated then reused](https://github.com/redis/node-redis/issues/558) in the Node server. In this case, there is a limited number of connections ([clients are connections in Redis](https://stackoverflow.com/questions/51517578/how-many-total-connection-or-max-connections-are-available-in-redis-server)) needed when the server is running and communicating with Redis.

---

However, things are very different if you are using Redis Enterprise Cloud in a NextJS application and having your backend services orchestrated using the **Serverless Functions**. If you do not understand the basics of NextJS and Serverless Functions enough, you would encounter this error and never understand the cause of it:

> ERR max number of clients reached

If I am only connecting to Redis with one application, how is it possible that all 30 connections are occupied? Let's look at some code before I reveal the answer.

```javascript
import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}
```

This is a code piece copied from [Fireship's tutorial](https://fireship.io/lessons/redis-nextjs/). It instantiates a Redis client with the help of ["Redis-OM"](https://www.npmjs.com/package/redis-om) library and declares a "connect" function which can be used to establish a connection between the client and Redis. As the code specifies, the "connect" function will only attempt to open a connection if no open connections exist between the client and Redis.

```javascript
const client = createClient({ url: process.env.REDIS_URL });

export const connect = async () => {
  if (client.isOpen) {
    console.log("Already connected to Redis");
    return;
  }

  await client.connect();
  console.log("Connected successfully.");
};
```

This is another code piece if the ["Node-Redis"](https://www.npmjs.com/package/redis) library is being used. There are slight differences but the logic is the same: open a connection only if there is no existing connection established between the client and Redis.

Either piece of code makes sense on paper here: since the code only gets executed once when the application is up and running, only one instance of client is created and the "connect" function will create the connection only once no matter how many times it is called, right?

**Wrong**. Remember that NextJS's _Serverless Functions_ and _Edge Functions_ are executed in a **highly dynamic environment** based on resource allocation, meaning the environment where the functions are executed will not be the same as the environment where your NextJS was built and deployed in (e.g. Vercel, Netlify, etc.). Therefore, when you are creating NextJS API routes (these routes are realized by serverless functions if the NextJS app is deployed in Vercel, Netlify or similar platforms) under the /pages/api folder to have them call the "connect" function and then interact with data in Redis, it is almost inevitable that every serverless function execution will be in a **different environment** where the connection to Redis has not been opened before. With this setup, each serverless function invocation because of API calls will attempt to create a unique connection to your Redis Cloud database. Theoretically, 30 invocations of serverless functions which try to connect to Redis could exhaust the allowed number of connections for free tier. To make things worse, Redis does not have a default setting for connection timeout so the connections created will be kept alive unless your client-side code does the clean up.

_If you are already stranded with Redis Cloud having maximum number of connections, connect to Redis Cloud using RedisInsights and run the `CLIENT KILL TYPE normal` command to evict all the basic connections._

---

In a serverless NextJS application setup, it is imperative to always **close the connection** after your code finishes interacting with Redis data. To complete my tutorial, here is an example setup I am using to handle Redis connections and interactions in a NextJS app supported by serverless functions:

```javascript
//Initialize the Redis client in global execution context to ensure uniqueness of the client
let client = global.redis;

//If no Redis client is found, create the client using Redis connection string
if (!client) {
  client = global.redis = createClient({ url: process.env.REDIS_URL });
}

//Open connection only when there is no existing connection
export const connect = async () => {
  if (client.isOpen) {
    console.log("Already connected to Redis");
    return;
  }

  await client.connect();
  console.log("Connected successfully.");
};

//Close connection only when there is an existing connection
export const disconnect = async () => {
  if (!client.isOpen) {
    return;
  }
  await client.quit();
  console.log("Disconnected.");
};

//Retrieve the cached data
export const getcache = async () => {
  const cache = await redis.get("cacheBetachSite");
  return cache;
};
```

The comments are pretty self-explanatory so I will not go into too much details here. If you are wondering how these helper functions are being used in API routes or NextJS SSG/SSR functions, here are two examples:

- NextJS SSG/SSR functions

```javascript
export const getStaticProps: GetStaticProps = async () => {
  try {
    await connect();
    const cachedData = await getcache();
    await disconnect();
    return {
      props: {
        cachedData
      },
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      props: {
        error,
      },
    };
  }
};
```

---

- API routes supported by serverless functions

```javascript
export default async function demoRoute(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const cachedData = await getcache();
    await disconnect();
    return res.status(200).json(cachedData);
  } catch (error: any) {
    return res.status(500).json({ error: "Unknown error." });
  }
}
```

---

**Being a part of the IT community, we have the blessing that one can always find tutorials or documentations about a variety of technologies and tools, however, tutorials or documentations might not always fit into each individual's own use case seamlessly**.
