---
layout: post
title: "5 things React world can learn from Android"
date: 2017-07-02 21:52:47 +0300
comments: true
categories:
---
In my [previous post](http://shem8.github.io/blog/2017/03/31/5-things-i-learned-as-an-android-developer-after-doing-some-web-development/), I talked about a couple of things I notice after moving from my usual gig as an Android developer and doing some web development (especially React).

As promised, after naming some things that Android can learn from the web development world, I will now focus on the other side- what can web developers can borrow from the Android world.
<!-- more -->

So lets start *(Putting my helmet on)*:

## 1. A decent IDE
Oh yes, I'm touching a nerve right off the bat. But sorry, there is no way around it.

**Web developers have no decent IDE, and they should use one.**

We have excellent text editors, but it's not the same.

Why the hell should I write my imports manually? How can I refactor my code peacefully when I'm not sure I renamed ALL the instances of my method? Why can't I navigate easily in my source code?

As a one that came from a world with a great IDEs (Java with Eclipse and IntlliJ), this is the thing that bothers me the most when I develop.

Google took it to the next level, and they have a team that is working just on the developer tools for Android. I do not say we have to use a dedicated IDE like Android Studio, but at least give me something decent to work with.

## 2. Stop with those fucking to-do list apps
No really, WTF!? How many to-do list apps a man needs? Why is everyone writing the same thing over and over?

Yeah, we got it- you write your tasks, and it saves on Redux, and you can finish some tasks and then can see the ongoing ones and the ones that you finish. I swear I saw things kind of apps like 5 different times while learning React.

What about going to the next level- see how to sync data with the server, putting more than one type of data, handling user input, loading or any other edge case.

Google builds real apps and releases the source code. For example- [Plaid app](https://github.com/nickbutcher/plaid) that focus on design and animation, or [Muzei app](https://github.com/nickbutcher/plaid) for working with images, or even the [official Google I/O app](https://github.com/google/iosched).

Those are real apps with real users and real use cases. It is interesting how experienced developers handle apps with more than a couple of hundreds of lines of code.

## 3. Community Experts
[Google Developers Experts (GDEs)](https://developers.google.com/experts/about) are a global network of experienced developers (and others) actively supporting developers, startups and companies changing the world through web and mobile applications.

That's mean that Google is encouraging (and also compensating) individuals to help and educate the community about Android.

Think about yourself- what if you have a question, or something don't work, or need some kind of advice. Whom do you ask (or where)?

Helping the community working with the platform is an integral part of developing a new platform, and I feel that Facebook can do better here.

## 4. Talk about more than just code.
React is relatively straightforward. You can easily get an app up and running in a few hours. However, a real app is more than just a couple of screens and components- it is much more than that. It is deal with bizarre user inputs and handling connections errors. It is making the user understand the flow and making actions easy and intuitive.

I would love some bits of advice from the Facebook team about lessons learned after building React apps for such a long time and for so many users and use cases.

Just like Google sharing things like [material design](https://developer.android.com/design/index.html) guidelines, I would love to hear more about best practices when coming to build my single page app.

## 5. Work on architecture components (or adapt community solutions as best practices)
So we have the basic stuff, the bare bones of the app and soon enough we're going to write to high order components to handle the more high-level stuff.

And those components will probably move with us (as a shared lib or worse- as a copy & paste) to our next project.

And we're not alone- so I assume others are written this code on their own projects.

Because I'm not the only one that needs to write a component that handles the state when my component's data is currently loading. And I'm probably not the only one that sometimes wants to sync some values between the store and the local storage. Or animate components.

In Android, it's known that Retrofit is the library for HTTP calls, Google even uses it in their [official examples](https://developer.android.com/topic/libraries/architecture/guide.html#fetching_data). For other things, they came up with their own solutions like [architecture compoennts](https://developer.android.com/topic/libraries/architecture/index.html).

In react there is [React router](https://github.com/reacttraining/react-router), that is widely used. But beside of this- I'm not really aware of this kind of things.

---

I really like the web development world, and I feel that the community is much more involved (and bigger to be honest). But I feel this is the place where one should get up and lead the developers to more organized and structured environment.

---

If you enjoyed this post, please hit the “recommend” button below and share this story. I’ll also love hearing your comments. Thanks!
