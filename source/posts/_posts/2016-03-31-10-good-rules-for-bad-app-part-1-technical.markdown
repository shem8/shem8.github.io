---
author: smagnezi8
comments: true
date: 2016-03-31 18:00:52+00:00
layout: post
link: https://shem8.wordpress.com/2016/03/31/10-good-rules-for-bad-app-part-1-technical/
slug: 10-good-rules-for-bad-app-part-1-technical
title: 10 good rules for bad App, Part 1- Technical
wordpress_id: 1125
categories:
- android
- humor
post_format:
- Aside
tags:
- android
- androiddev
- devs
- tips
---

We were all been there, you got a great idea for an app, you gather some feedback and even managed to build a team and you going full power to conquer the app store. So a second before starting working on your genius [egg timer app](https://play.google.com/store/apps/details?id=com.mobication.EggTimerPro&hl=en), it is worth taking a moment and think about how you're going to do it.
<!--more-->

Following the hilarious post by Chet Haase about [10 good rules for bad API](https://medium.com/pointer-io/this-article-is-exclusive-to-pointer-a-reading-club-for-developers-9b03f3df060c), I decided to put together my list about how to build a bad app. but a few notes first:

  * There are so many bad apps out there, each one is bad in it own way so it's really hard to set only 10. I tried to do my best for taking the top bad patterns, but I trust you to keep fucking it up much more than what I'm talking about here.


  * The beauty of the apps world that you can go wrong in many aspects of the product, that makes enough room for each team member to ruin your business, that is why I divided this blog post into 3 parts- technically, UI/UX and product.


  * Even good apps can adopt one or two bad things to their app, so it's not all or nothing.


  * Those bad habits are bad habits right now, because Google already proved that they can change that any time (like [bottom navigation](https://www.google.com/design/spec/components/bottom-navigation.html) is a thing now? WTF?!)


  * Who am I to say about apps if they are doing a bad things or not? That's because I've done most of the things here and then realised how bad it is, that's why.


  * The list not sorted by priority, because it's hard to compare what buried your app in the store listing.


  * I'm not [Chet Haase](https://medium.com/@chethaase) so this post can't be half good or funny as his, so sorry for that.

<br>

*Enough said, lets start with the list:*


## #1: Ask as many permission as possible


You know what your app worth, don't let minor things like user privacy get down your way. The user is begging for this crucial analytics sending on boot, so go and ask that BOOT_COMPLETED permission! If you need to share this wonderful url to your user's friends- pull the fucking contact list from his phone, and while you doing so why not sending it to your server and spam them all? Remember- data is power, and other's data is money!

**Bonus point:** when implement Android M permissions, don't let the user do anything until he or she accept your permission, even if he accepted some, don't let him win!


## #2: Lock UI thread while loading


Hey dude, we're loading, we'll really appreciate if you let us do our thing and don't interrupt us with some stupid ui events, just sit quietly and wait us to finish processing all this 3.4M config xml file ok?!

{% img center https://shem8.files.wordpress.com/2016/03/loading_time.jpg 400 * %}


## #3: Retry endlessly


Yes we're still waiting for this config file, it's your fault for living in this shitty connectivity area, don't blame us for sucking all you data plan and battery alright?!


## #4: Don't save activity or fragment state


You snooze you lose, you rotated the screen? Boom- your form was lost. This is the best way to teach your users never leave your app, even if them just got a phone call.


## #5: Use setExact + RTC_WAKEUP for for your AlarmManager


Alarm manager is get tool by Android to execute code in some time in the future. The thing is timing is everything and the Alarm Manager has some options for firing the code smartly and rescheduling it depending on phone state, battery, network or other tasks that can piggy bag. But you probably don't need those fancy features, there's nothing like putting your "Please update our app" notification waking you app 6AM.

**Bonus points:** combine setExact + RTC_WAKEUP to the same time for all your users for your network request to your servers for taking your load balancer to the edge.


## #6: Use Application context everywhere


Because why not? Save your application context as a static member in your Application class on _onStart_ and use it everywhere- so easy, so simple, so not modular, make it horribly when you want to debug theming errors and make your tests a nightmare. Win Win!


## #7: Put errors strings technical as possible


That's make it much easier when something goes wrong on the users side, so they'll just forward you the message. That's also make your app a developer-friendly so people like me can easily understand that they missing a certificate to the https connection and that's why the app keep crashing when sharing a photo.


## #8: Implement all by yourself


Android has a very strict limit of 65k methods limit, after importing google play and support libraries that's barely leaves you with room for 3rd libraries. Anyway, how hard is it to handle Json parsing? you don't really need this Gson library. It's also a great opportunity for your junior dev to practice his poor implementation of string pattern matching from his [job interview](https://twitter.com/holman/status/681922317958524928).


## #9: Premature optimization


Great, you just implemented the sorting by yourself, probably with bucket sort, because you know the data going to be evenly distributed, probably, you think so... You also saw [the talk by Romain Guy and Chet Haase](https://www.parleys.com/tutorial/part-1-android-performance-workshop) (him again?) and switched all you enums with constants ints and use objects pull everywhere even if this just one time function because who know what can happen.

You know what they say- Premature optimization is the root of all evil, but a greater [women also said](http://www.goodreads.com/quotes/30725-there-is-no-good-and-evil-there-is-only-power): "There is no good and evil, there is only power and those too weak to seek it." and I hope you see the power on N when implementing those graph algorithms.

{% img center https://shem8.files.wordpress.com/2016/03/the_general_problem.png 550 * %}


## #10: Extract everything to static Util class


Move it all- Android specific functionality, networking calls, permissions checks, input checking, not-object-oriented-never-going-to-be-able-to-test code it all goes here.

**Bonus points:** have a Util and Utils classes, because one is not enough and confusing is a plus!

<br><br>
***

*That's all until the next time when we're going to talk a bit about UI and UX, Got some more suggestions for ways to make your code worse? Would love to hear your thoughts in the comments!*
