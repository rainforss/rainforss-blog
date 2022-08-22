---
layout: "../../layouts/post.astro"
coverImage: "/src/images/marketing-email-tracking.jpg"
title: "D365 Marketing Email and Website Tracking"
description: "website tracking can bring you very detailed information about visitors' interactions but not the individual visitor while by email tracking you know the exact person (because you have the person's email hence the contact record) who interacted with your marketing email but you will not be able to know if a user clicks on a paragraph or a heading of your email content."
publishDate: "3 May 2022"
author: "Jake Chen"
---

Marketing plays a crucial role in the expansion and growth of a business and there has been a rise in popularity of the marketing automation tools/services. Serving marketing content to your target audience through your website or marketing email is only the beginning of the customer journey and implementing a personalized marketing strategy based on audience's reaction is most likely a more important piece of the puzzle. This is why the big wigs - D365 Marketing from Microsoft being one of them - of marketing automation tool/service providers offer both website traffic tracking and email tracking in their product bundle.

As a marketing specialist, it would be a blessing to know your audience's interactions and engage new conversations accordingly with the help of these tools. However, there are caveats that you might not be aware of if you do not have enough knowledge about how tracking - **especially email tracking** - is accomplished.

---

Website interaction tracking is generally more capable than email interaction tracking since it is realized using Javascript - a script that runs in the browser. Remember the code snippet you were asked to embed in your website to enable website traffic tracking?

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

That code snippet was a piece of Javascript code, or sometimes a reference to some Javascript code hosted on the internet. When someone loads up your website in the browser, the code snippet starts running in the browser and the script has methods called "event listeners" that monitors all kinds of interactions. The abundance of event listeners in Javascript language makes it possible that almost any interaction can be captured, for example, user clicks on any section of the web page or user scrolls up/down the page.

Being very powerful at capturing user interactions, the website tracking has one major limitation - the user is (or should be) anonymous most of the time. Now you might be asking, "What about service offerings like Visitor Queue"? Yes some services like Visitor Queue can provide a bit more details about individual visitors to your website since their Javascript tracking code looks up the IP address of the visitors and tries to match the IP address with a company or organization. In this case, you would know that someone in a "Foo" company might be interested in your marketing content but you still do not have concrete information about the 'someone' who visited your website. Also, this type of tracking _may or may not_ be legal depending on the territory where your business operates in so **ALWAYS** make sure that tracking services you are using would not bring you **lawsuits**.

In short, website tracking can bring you very detailed information about visitors' interactions but not the individual visitor. Therefore, most of the website tracking services (for example Google Analytics) provide you with analytical data which can guide you to better design and organize your website content and properly funnel your visitors to a CTA button or form submission.

---

Email tracking would be the opposite of website tracking. You know the exact person (because you have the person's email hence the contact record) who interacted with your marketing email but you will not be able to know if a user clicks on a paragraph or a heading of your email content.

![Email click map](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a4gw4g73kk0x43jj1e50.PNG)

Looking at the email click map provided by D365 Marketing email insights, you can notice that only clicks on hyperlinks are tracked. If a heading in the email does not have a hyperlink embedded, you would not see the click interactions on the heading at all. On the other hand, this same interaction can easily be captured in website tracking. But why?

Since emails contain very confidential information to users, email clients **DO NOT ALLOW** any scripts embedded in the email HTML. Without the help of scripting, email tracking services are not able to capture any interactions without a work-around that being the use of _hyperlinks_. To illustrate, imagine if you have embedded a hyperlink [About Us](www.betach.com/about) in the marketing email and this hyperlink is actually an HTML element that looks like this:

```html
<a href="www.betach.com/about">About Us</a>
```

When you save this hyperlink in the email editor, the marketing automation tool will further encrypt the original url (www.betach.com/about) into another url that points to a proxy server (most likely the server of the marketing automation service). Have a look at the following screenshot, you can notice that the url actually points to a server 'svc.dynamics.com' with some unique identifiers provided.

![marketing email screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oa7e80yi9dgvy2uxxuct.PNG)

When this link is clicked, a browser tab will open to send an HTTP request to this url where the marketing application server intercepts the request, looks up the contact record and actual url using the unique identifiers, increments the user click count by 1 in database and then redirects the page to the actual url: www.betach.com/about.

With the above setup, email tracking services can record recipients' click on hyperlinks without any scripts embedded in the email body.

One of my clients who had some background knowledge in HTML tried to embed an HTML link which contains a sales-rep's email as follows:

```html
<a href="mailto:xxx@xxx.com">Contact your sales rep</a>
```

Once the marketing email was set up, he wondered why he could not use the 'click of contact your sales rep button' as a criteria to segment the customer journey. With previous explanation, this is now easier to interpret:

Although this HTML element is also rendered as a hyperlink in the email clients, a click on the link would only open up a new email in the default email client on your desktop with the recipient field pre-populated with the email address. Since this behaviour is **completely irrelevant** to the browser, no HTTP request is made to the proxy marketing server and the marketing server has no way of recording the click event. Most of the time, the marketing automation's email editor will disregard this type of hyperlink and will not encrypt the link href property at all.

---

Another caveat worth mentioning is that 'email open' events tracked by email automation services might not be accurate as you anticipated. The most popular method to track email opens is implemented by a pixel image embedded in the marketing email body. The pixel image itself is hosted, as you might have guessed, in the marketing automation service's own server. When the email is opened in an email client, the email client attempts to send an HTTP request to the marketing server asking for the pixel image when the marketing server intercepts this request and record the event as email being opened. Because of security concerns, major email clients such as Gmail have started enforcing the email to not make HTTP request to remote resources unless the user explicitly allows so by clicking a button to start fetching the resources. With the enforcement in place, a good amount of email opens could have been missed since users could read the email content without downloading the extra image files.

**The key takeaway here is that marketing specialists utilizing both tracking tools should have a good understanding of the underlying mechanisms. Without a solid background knowledge of these tools, you could mix up the capabilities of them and go down a pitfall where things are not working as you expect them to and you would have a hard time troubleshooting.**
