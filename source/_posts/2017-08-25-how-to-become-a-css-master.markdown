---
layout: post
title: "How to become a master in CSS in 5 simple steps"
date: 2017-08-25 15:52:26 +0300
comments: true
categories:
- web
tags:
- web
- css
- webdevelopment
---
[As you know](https://blog.shem.dev/blog/2017/03/31/5-things-i-learned-as-an-android-developer-after-doing-some-web-development/)- I lately left my comfort zone, closed Android Studio and dive straight into a scary, rough sea called Web Development.
An integral part of building web apps is working with CSS. For the ones that not familiar with Cascading Style Sheet- this is how web developers design their web pages, give it some life and structure, add animations and lose their sanity while doing so.
<!-- more -->
In this post, I'll try to describe what it takes for one who wants, for a reason I can't understand, to become a master in CSS in 5 simple steps:

## 1. lose your intuition

So you just need to add one more button to the end of the form, how hard it can get, right? No, PLEASE DON'T SAY RIGHT!

CSS not like the right side, it will always prefer left. Because when you'll add `float: right;` something wrong going to happen. Some elements will change their positions; some divs will go over each other; some old versions of IE going to display your page upside down. Why? I don't know.

How to solve it? You probably need to add `overflow:hidden` to the parent element (or adding dummy div to clear floating, of course). Why? Again, I don't know.

This is how CSS works, you think it supposes to work on one way, but you're usually wrong.

{% img center /images/posts/graphs/css.png 500 %}

## 2. Practice meditation regularly

To continue with the previous part- when dealing with CSS, lots of things won't work as expected. You can try to understand the logic behind it, but most of the time it's just a waste of time.

So what I recommend- before each day you know you are going to work on styling your page, take a couple of minutes and let your body and mind relax. Meditate with this in mind: "this going to be hard, this going to be rough, but this is just software, and I won't let this non-deterministic system getting on my nerves."

This, combining with removing any sharp objects away from your desk, can make your life (and your team's life) much more peaceful.

{% img center /images/posts/css/css1.gif 300 %}

## 3. Don’t refresh your page. Ever.

When working with CSS, you're getting used to working straight on the browser, in that way you can easily play with your elements properties and get immediate feedback.

But while a non-experienced developer will lose all his changes when accidentally refresh the page, a CSS master will know that refresh button is forbidden. Especially not before showing the result to the product manager.

I have a theory that that's how SPA was invented.

{% img center /images/posts/css/css3.jpg 300 %}

## 4. Subscribe to some newsletters.

Web development is a rapid pace changing environment. Frameworks change quickly, every week there's a new shiny library and new concepts introduced on a weekly basis.

The best way to be on top of new tools and ideas is to subscribe to one or more newsletters.

In that way, you’ll able to say things like: "Oh you're still using Flexbox? I just use to work with CSS grid now; it's the new shit” when your PR completely messed up the page layout, and you don't know why.

{% img center /images/posts/css/css4.png 300 %}

## 5. Work on your persuasion skills.

One day your designer will come to you with a crazy UX concept that you absolutely have no idea how to implement. But you're a CSS master, and masters can't admit they don't know how to do something.

So what can you do? You drive him out of this:
{% blockquote %}
"Oh, we can't animate it because it will break our site accessibility."
{% endblockquote %}
{% blockquote %}
"Floating views are just looking bad on mobile, believe me."
{% endblockquote %}
{% blockquote %}
"Material cards? Are we still in 2015?!"
{% endblockquote %}
{% blockquote %}
"Pffff, like Facebook?! They're putting their CSS in their JS! Those guys are crazy!!"
{% endblockquote %}
Continue with this until he is ok with your standard Bootstrap starter template website.

{% img center /images/posts/css/css2.gif 300 %}

---

*Afterword: this post is sarcastic, and I admire each one and one of you out there that can align a text properly right next to the thumbnail just like the designer meant it to be.*

---

**If you enjoyed this post, please hit the “recommend” button below and share this story. I’ll also love hearing your comments. Thank you!**
