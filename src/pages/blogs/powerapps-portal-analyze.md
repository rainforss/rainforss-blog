---
layout: "../../layouts/post.astro"
coverImage: "/src/images/powerapps-portal-pricing.png"
title: "Is the Power Apps Portal a viable option as your customer facing website?"
description: "Microsoft has always been promoting the Power Apps Portal (previously Dynamics Portal) as a 'no-code' solution for external facing websites.Together with the naming change, the pricing model of this Microsoft product has also seen significant changes."
publishDate: "21 June 2022"
author: "Jake Chen"
---

_Microsoft has always been promoting the Power Apps Portal (previously Dynamics Portal) as a "no-code" solution for external facing websites.Together with the naming change, the pricing model of this Microsoft product has also seen significant changes._

Prior to _1st October 2020_, a customer had to purchase a portal with a flat one-time payment and that pricing model was deemed less profitable since the major clients' portals had very high traffic volume of unauthenticated and authenticated visitors. From 1st October 2020, Microsoft has decided to adopt a **consumption-based** pricing scheme which makes customers pay monthly fees based on the number of page views and login sessions.

The following screenshot demonstrates the updated consumption-based pricing model:

![Power Apps Portal pricing model](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tx68gjuqlh4b7a0mwtat.png "Price chart of Power Apps Portal")

<figcaption>the updated consumption-based pricing model</figcaption>

If you found this pricing model confusing (which I did), this [amazing article](https://thehosk.medium.com/understanding-power-portals-pricing-and-how-it-differs-from-dynamics-portals-c1753710e34b) by Ben Hosking gives crystal clear descriptions about the updated pricing model, together with some beneficial background knowledge and thoughts about the portals.

Although the pay-as-you-go service model may seem cost-effective for consumers who have lower traffic volume and less registered portal users, bigger customers might not enjoy this change since they were always paying the same amount **regardless of the amount of traffic** hitting the portal. To make the situation even worse, there are some caveats that portal owners are required to pay at the **beginning of the month** and the purchased consumption amount (pageviews and logins) **DOES NOT** roll over to the next month if not used up.

Let's consider the following scenario to understand the grievance your customers might potentially have: A university is using a Power Apps Portal to manage student/staff/alumni logins and the IT department is managing the portal monthly payment based on the averaged number of logins per month. The employment center of the university is holding a career fair in the coming month which will result in a huge influx of authenticated users. However, not knowing the pricing model of Power App Portals, the employment center does not notify the IT department of the event and the greatly increased amount of logins would cause service disruptions of the portal. Furthermore, assuming the employment center learnt a lesson and notified IT department to increase the purchased amount of logins, there could be instances where the actual logins are way under the anticipated amount. With the purchased quota not being able to roll over, this would potentially result in thousands of purchased logins in vain.

The **key takeaway** of the previous example is that a customer can experience difficulties determine the proper amount of logins/pageviews and that can lead to either unforseeable service disruptions or wasted budgets. While this issue might not be as severe for bigger organizations since they could work with statistical data to make a decision on a payment plan and there is more expenditure budgetd, medium to small sized customers would find it hard to manage the **traffic fluctuation**.

There are many other scenarios we can examine to understand the concerns of choosing Power Apps Portal as your solution but I would leave that to future posts. I will quickly summarize my considerations and thoughts of features offered by Power Apps Portal in this article as follows:

- **Low-code or no-code solution to configure a website**

This could either be a curse or blessing based on different situations. With the low-code or no-code solution, one can quickly start a "okay" public facing website using templates and basic configurations without much technical aptitude. Here is a basic demo portal landing page:

![A basic portal configured with low-code solution](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/69v4nzs702wgit6lqxvb.png "Power Apps Portal created with templates and basic configurations")

**However**, if more interactions are desired to make the website "lively" (see a "lively" [custom coded website](https://personal-site-mocha-pi.vercel.app/) and a [Power Apps Portal](https://north52.microsoftcrmportals.com/) configured by North52 professionals), the use of HTML/CSS/Javascript coding is inevitable. Now you are facing a [condumdrum](https://dictionary.cambridge.org/dictionary/english/conundrum) of getting a developer to add custom code to a low-code/no-code platform which he/she likely has very little idea about (unless you can find a technical person who is proficient at both coding and Dynamics 365).

---

- **Microsoft takes care of the scaling aspect of Power Apps Portal**

Scalability is a bitter-sweet problem to have (meaning that you are getting more traffic on your web application) and most of the organizations do not have the luxury or opportunity to ever have to worry about this problem. Moreover, the majority of public facing content is usually static (meaning it is likely to be stale for a long period of time) and this type of content can be cached to [content-delivery networks](https://www.cloudflare.com/en-ca/learning/cdn/what-is-a-cdn/) (CDN), rendering the scalability unnecessary since the content is not served directly by web server when requested.

Of course there are way more aspects to look into but to summarize, the auto-scaling feature can certainly benefit large organizations while other organizations probably wouldn't make use of the feature at all.

---

- **Power Apps Portal can have a sophisticated security hierachy to manage different level of access.**

Again, having a nested security configuration can bring in benefits or hassles based on the complexity of content you have on the external facing website. For the customers that I have previously worked with, only the large scale organizations are utilizing a complicated security role configuration while the relatively smaller ones only have two security levels - authenticated and unauthenticated.

Therefore, it is likely that you will be paying for features that are rarely used if you are a small to medium sized customer making use of Power Apps Portal.

---

- **Power Apps Portal is using a pay-as-you-go pricing model.**

Based on the pricing model, the monthly cost to larger companies who have high traffic volume to the portals could be high and the cost will add up over time. However, these companies have higher budget than others so they can enjor all the benefits offered by Power Apps Portal while not being too concerned about the cost.

From the perspective of companies which do not have a good amount of visitors on external facing website, the monthly cost could look promising if we are aiming for under 100 logins and 100,000 pageviews per month. Does it mean that Power Apps Portal is a better choice than having some developers code a web application with integration to Dynamics 365? The answer is not definite.

You might be asking, "what's the catch?" Firstly, you definitely need to spend thousands if you are trying to have developers develop your website but the website's monthly cost will be much lower comparing to Power Apps Portal's. This means that a custom built website could still be the winner if we are talking about a long run. Secondly, moving away from Power Apps Portal once you are onboard will be a gruesome task because you have no access to the source code of Power Apps Portal.

---

There are way more features to be discussed but I will stop here for the sake of reader's sanity. I will potentially address more considerations about other features in the future.

In conclusion, I am not depicting a bad image of Power Apps Portal though it might seem that I am questioning certain aspects of Power Apps Portal. It is actually a solid product offering in the market when compared to other competitors such as Salesforce Portals. Nonetheless, this type of product offering might or might not be the optimal solution for everyone who is seeking an established public facing web application. Make your decision after careful considerations.

I sincerely hope that you would find this article inspiring or intuitive (at least part of it). I am happy to answer any questions in the comment or have some more discussions :)

---

_So what would be a better solution if a web application which can securely surface data from Dynamics 365 environment (DataVerse) is desired? I will have this covered in another post, stay tuned._

#### The solution stack consists of NextJS, Vercel Serverless Functions, Redis Cloud and Dynamics 365 Web APIs

![Custom portal with authentication and integration to Dynamics 365](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/87jvaim7w26g1ro3xr3r.jpg "Custom portal for higher education")
