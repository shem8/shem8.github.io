---
author: smagnezi8
comments: true
date: 2016-02-12 07:30:38+00:00
layout: post
link: https://shem8.wordpress.com/2016/02/12/my-first-open-source-lib/
slug: my-first-open-source-lib
title: My first open source lib
wordpress_id: 845
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- devs
- library
- opensource
---

As part of my last [Friday project](https://medium.com/life-learning/the-one-side-project-per-year-challenge-fa3c64a48da6#.3vp2es9hh) I created a new Android app (releasing it soon!). In this project I decided to focus on 2 new things I want to learn:
<!--more-->



  1. How to write Android apps with [Kotlin](https://shem8.wordpress.com/2016/01/01/kotlin-a-better-java-for-android/)


  2. Create an awesome UI and animations


The first one was pretty straight forward, because I am a technical guy- learning (another) programming language wasn't so difficult, and sure enough, I quickly pulled a simple Kotlin app that worked.

The second part was a littler trickier, I'm lucky enough to work with a [great designer](https://medium.com/@etgalim) so I'm not used to create an amazing UI (although I have a pretty solid background with photoshop). That's when [MaterialUp](http://www.materialup.com/), the home for a great material designs inspirations, came to the rescue.

My first screen was a login screen, so I searched for this kind of view and found a [great one](http://www.materialup.com/posts/compact-login) that I wanted to use. After couple of hours of hacking I manage to implement it in code. I was so satisfy from the result so in the following week I showed many of my colleges in my work place what I was doing, this thing spread out quickly and couple of days later one of the product guys from another team was asking me if he can use it in their app.


<blockquote>I was happy! The best thing that can happen to you when building something is that someone, on his own will, want to use what you created.</blockquote>


"But" and if you know product guys, you surely know there is always a but "We need you to change some of the fields names, and we probably going to use another icon". I was familiar with the code, those things was pretty easy to handle and I agreed.

Now I had two options:




  1. Copy the code, working with him in house and customise the hell out of the view for him.


  2. Create a real library with a real API for customise everything in the view and get away from endless features requests.


So library it is.


## Creating the library


First I decided to rewrite the view in Java for it to be more Android-developers-friendly, that was a great (great, great) showcase of how Kotlin is much quicker to hack and how much boilerplate Java has.

Next I extracted all relevant code to external library and then to external project for exporting.

I decided to push the view as is (without any option to change anything) just to check how's all the uploading thing is going. Lucky enough I found [this article](http://inthecheesefactory.com/blog/how-to-upload-library-to-jcenter-maven-central-as-dependency/en) that helped me with this mess (not that trivial at all) and unlucky enough I didn't see [this video](https://www.youtube.com/watch?v=NFfNiO3CR6w) at the time.

After couple of hours of struggling with gradle and jcenter I manage to create [my own real library](https://github.com/shem8/MaterialLogin) and pull it from gradle.


## What happened next


Then I was comment to the author of the original design that his design was so elegant that I had to implement it in Android with a link to the my library. Shortly after, one of the site founders submit [my lib to the site as a new resource](http://www.materialup.com/posts/materiallogin) and that's when I started to get a lot of traction, couple of days later and the library was trending on Github, pull requests and issues were opened and I suddenly had a real users to support, and even better, some users were contribute and helped me adding some features!


## Conclusions






  * If you have some cool piece of code that you feel that others will want to use it- release it to an open source library.


  * Do the simple things first- the first version can be very basic, wait to see what the users want.


  * Spread the word and let others know you build a great thing.


My code came from running only on my testing app to be viewing by hundreds of people! And what about those product guy you ask? He might use it or no, but I got my users already =)
