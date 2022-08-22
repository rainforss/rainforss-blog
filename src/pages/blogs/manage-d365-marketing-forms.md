---
layout: "../../layouts/post.astro"
coverImage: "/src/images/manage-marketing-form.png"
title: "Manage your Dynamics 365 Marketing Forms properly"
description: "If you have used the marketing form designer provided by D365 Marketing, you probably know about - or have already complained about its lack of configurability for styling. Yes you can configure the form's layout, font size, text alignment, text color and paddings for form elements but these functionalities can barely make a web form which is no where near perfect."
publishDate: "14 August 2022"
pubDate: "14 August 2022"
author: "Jake Chen"
---

_Dynamics 365 for Marketing is an advanced marketing automation solution which has seen a great rise in popularity since its unveiling. Because of the complex nature of marketing tools (online marketing, email marketing and real-time marketing) and the fact that D365 Marketing module being "young" in its product lifecycle, this marketing automation solution is deemed to receive more critics than other Dynamics 365 products which are more "mature"._

Here is one of the most prominent critiques I have heard working with clients and other D365 Marketing functional consultants:

> Customizable can go too far, very involved to develop what is needed. Requires investment in both time and resources. No one seems to know how to get it to work, even the so-called experts.

This pain point is very valid since I have seen a many poorly implemented, customized and managed D365 Marketing instances. In this article, I will use Marketing Forms - one of the most used marketing tools for lead capturing - to prove this point and demonstrate how you can properly implement and maintain D365 Marketing Forms for clients to avoid unnecessary frustration.

---

**_The topics discussed in the following section require some knowledge about D365 Marketing Forms_**

Generally speaking, marketing forms need to follow a client's branding principles so they can be embedded in the client's public facing website seamlessly. In this case, the marketing forms need to styled accordingly unless your client is willing to use a marketing form which looks like it is coming from a 1980's webpage:

![An old HTML web form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0ob57k1jwp87wfioqzf1.png)

If you have used the marketing form designer provided by D365 Marketing, you probably know about - or have already complained about its lack of configurability for styling. Yes you can configure the form's layout, font size, text alignment, text color and paddings for form elements but these functionalities can barely make a web form which is no where near perfect.

---

![OOB form designer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v869lao3gmzimb3ef6mj.PNG)

<figcaption>The form editor itself is enough make a basic form somewhat dynamic, but things like perfectly centering the reCAPTCHA block and styling the submit button cannot be done using the user interface</figcaption>

---

Even if you can let the skewed reCAPTCHA block and unstyled button fly, any new fields being added to the marketing form need to be styled individually using the editor user interface. As a functional consultant, you would probably expect that your time is better spent elsewhere.

Luckily, the form designer provides an HTML editor which can be used by web developers (or anyone who has enough knowledge about HTML and CSS) to customize web form appearances to whatever the client requires. However, this customization can also bring us to some very messy scenarios which usually lead to the first part of the quoted critique - "Customizable can go too far so the solution requires investments in both time and resources".

---

Let's say that you - a functional consultant - has gathered the branding requirements from the customer and added all the fields to the marketing form using the form designer. However, the basic form designer cannot achieve the fancy design of the marketing form so the task is passed to a front-end developer within your development team so the form can be properly styled using custom CSS. This seems like no big deal because every front-end developer (event the juniors) can write CSS and style the form, right?

_**Unfortunaly, this implementation is very concerning, coming from a solution design perspective.**_

- CSS can be added inline of any HTML element and it can also be added between the style tags using class names. If developers on your development team are not following the exact same enforced coding patterns and class naming principles, this implementation can lead to very a bloaded and messy HTML/CSS code base for all the marketing forms available
- If the marketing form styling needs to be updated following a client's feedback (which happens very frequently) and the task is assigned to another developer, he/she might not be able to follow what the previous dev has done and simply proceeds to add his/her own CSS styling to override the previous styles, which leads to more unnecessary lines of code
- If a new unstyled field is added to the existig form or if there is another similar form which needs some custom styling, you and your developers need to rinse and repeat this painfully inefficient and messy process.

---

![Field inconsistency](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tocuj23m5zxlnkqxoif8.PNG)

## <figcaption>A new text field is dropped onto the form, see the inconsistency of field size?</figcaption>

If we go down this route, we are relying on a group of people's (from all senority levels) diligence just to implement and maintain ONE marketing form. Also, the functional consultants (without solid HTML/CSS experience) will ALWAYS rely on the developers for custom styling changes. Furthermore, If people made the code base a giant pile of spaghetti, it'll be impossible for technical supports to troubleshoot and often customers quote "no one knows what is going on, even the so-called experts",

**_What could be a more elegant solution? Make use of form templates and custom attributes to enable additional form designer options for non-technical D365 Marketing users._**

---

![Form template with custom attributes](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6f80ymvy0k5a6ja72jvc.PNG)

<figcaption>If you look closely to the right, you can notice the all the additional configurations which cannot be done using out-of-box form designer</figcaption>

---

Sometimes we do criticize Microsoft for poorly documented features but this would not be one of those occasions: the custom attribute feature is documented [here](https://docs.microsoft.com/en-us/dynamics365/marketing/custom-template-attributes) under MS Docs for Dynamics 365 Marketing.

To summarize the implementation process, one of your developers would need to add all the commonly used form elements (text fields, dropdown fields, radio input, etc.) to a marketing form template and enable custom configuration attributes such as the gap between each form field and the color of the input labels. This can be done by adding meta tags to the form template's HTML and changing related CSS properties to a templated format. If you are interested about the details of setup, I will release a guide in the future.

So what are the benefits of this implementation?

- The types of form fields are definite and the client would only need certain level of control over the form fields (field gaps, button color, button color when hovering, etc.), all of which can be implemented by a developer at once on a marketing form template. This means that you have less dependencies involved so the client does not continuous support on small things like changing a button's background color.

- Admittedly, this implementation does not completely eliminate the risk of poorly coded CSS, but it does alleviate the severity of the issue by having developers implementing the code base only once.

- The custom configuration can be generic so that you or the client can simply change, for example, the color or font size of all input labels by modifying only one field. The styling change will also be applied to **new fields** being added to marketing forms.

- The migration process to another environment is simle and streamlined. Simply copy the HTML of the marketing form template and paste it into a new marketing form template created in another environment and you can start using the template for new forms.

**_Let's see it in action. _**

![Form configuration using template](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yc69pjxoem6d7vixefkb.PNG)

<figcaption>When you change the configuration, for example, the label text color using the color-picker, all labels change color.</figcaption>

---

![Adding new fields to form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tkpggam1ctm9ggwdc548.PNG)

<figcaption>When a new form element is added, it follows the same styling configuration as existing fields.</figcaption>

---

This implementation makes it easier for anyone (even without knowledge of HTML/CSS) to control advanced styling attributes, removing the need of constant support from developers. Also, if a client complains to you about certain configuration not working, you know that it won't be some "mysteries" hidden in HTML/CSS of the form.

---

**_As always, try not to settle with a solution which "just works". Design a solution that makes everyone's job hassle-free and it is what a marketing automation solution supposed to do._**
