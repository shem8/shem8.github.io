---
author: smagnezi8
comments: true
date: 2015-11-15 10:24:22+00:00
layout: post
link: https://shem8.wordpress.com/2015/11/15/run-fast-fall-frequently-get-up-faster-and-go-drink-beer-at-the-beach-what-its-like-to-work-at-a-startup/
slug: run-fast-fall-frequently-get-up-faster-and-go-drink-beer-at-the-beach-what-its-like-to-work-at-a-startup
title: 'Run fast, fall frequently, get up faster and go drink beer at the beach: What
  it''s like to work at a StartUp'
wordpress_id: 9
categories:
- life
post_format:
- Aside
tags:
- life
- startup
---

_Over the past 3 years I've been working at [MyRoll](http://myroll.com/) (previously called Flayvr, the startup that loves you photos as much as you do). I joined right after the seed stage and I was the first employee of the company. This was my first time working at a startup and it's hands-down one of the best experiences I've had in my not-so-long life. Lately, more and more of my friends have asked me: "Should I join a startup, or just go corporate - something that's financially stable?"._
<!--more-->

__First- I want to clear the water and say that I don't really have an answer for that.  It really depends on the type of person you are. However, these is my 2 cents about all the _*_GOOD_*_ of working in a small startup (Don't worry, there's plenty of bad as well - coming soon):__


## 1. You learn fast (because you don't have a choice)


On my very first day at MyRoll I was given the task of writing a feature in our iOS app. It was my first time writing code for Mobile, first time working on objectiveC, first time working on a Mac, first time working with git, AND first time reading our code. There was no one-month boot camp, no onboarding powerpoints, no tutorials, and ZERO team members to pair program or review my code. Just the internet and the CTO that wrote the MVP for demo. A week later I had to add some app analytics to write to the DB so I had, in turn, to learn rails (from zero). A year later I was the one that started developing our Android app.

Jumping on the horse and learning how to ride, time after time, over and over again, each time with a different type of horse (or ride? I lost myself in the analogy), makes you develop a real capability for learning new things (no matter what they are). You learn to predict the pitfalls, you know where things are going be more tricky and you develop some sense about what’s right and wrong in what you're doing.


## 2. You go for the impossible, because the possible things are already there


Before we started working on Flayvr, people treated photos as isolated items. Our first goal was therefore  to find the context of the user's media and create a full meaningful story from it. So we took Ron’s, our CEO, endless photos stream and started to analyze it (I know this guy for 3 years but through his photos I also know how his trip to Barcelona in 2005 was...). We analyzed it manually and understood how 2 photos are connected to the same scene or event, we went over on different end cases and built some pretty solid algorithms to cluster his photos and videos.

Than we asked some friends to test our algorithm on their stream. It was pretty bad... Ron had 2 kids and he literally records every second in their life - my friends, on the other hand, are party people that have tons of Whatsapp photos that are unrelated to one another. It looked like every person has his own unique stream, and it felt too complicated for a computer to just magically understand it.

Back to the drawing board - we categorized our main users. We understood that we have different kinds of people and they are all different, but that we can easily adapt our algorithm to each one: Android or iPhone users? Are they taking a lot of photos or just getting sent 4-5 photos in Whatsapp? is she a professional photographer or a 13 years old selfie taker? etc..

We then tweaked our algorithm (and are still making it better and better, there is no magic solution here) and actually arrived at some pretty solid results.

**Why? Because he had no alternatives** - it was either about delivering a good damn product or giving back our investors their money.


## 3. You break things. A lot!


When moving fast you sometimes fall, just like a new baby born child. In the beginning you are going to  fall a lot, but slowly you learn how to put one leg in front of the other, you learn to keep your balance and in the end you are running smoothly.

{% img center http://c2.thejournal.ie/media/2013/04/falling-off-catwalk.gif 352 * 'Pushing to production on 1AM on Friday.' 'Pushing to production on 1AM on Friday.' %}

At first, releasing a new version was a big deal. We had a release doc with a couple of stages that you had to be checked: making sure you're working with the production env, testing it on a couple of devices, checking for updates and fresh install, etc... That took some time, and as we gained confidence the release cycle got shorter and we started  pushing a new version to our users 2-3 times a week (and sometimes even more).

But even the adults fall sometimes, and we did have some bad deploys. Shit happens, you must accept that. If Facebook is uploads a new version of the app that crashes for 10% of the users right on start,  the result will be a twitter storm. Or if [google computer vision miserably fails ](http://mashable.com/2015/07/01/google-photos-black-people-gorillas/)- you will see it all over the net. But in our case we realized we have the time to fix, and users are more tolerant towards our mistake.


## 4. You aren’t afraid from failures


Further to my last point - because of the uncertainty and the risk- taking nature of startups, you will fail often. From time to time, you learn to live with all those failures and instead of being upset after each one you learn to embrace it. You understand that each failure makes you a bit smarter: your estimation should be done more carefully, you now know your users don't like the red color, etc...


<blockquote>“When we give ourselves permission to fail, we, at the same time, give ourselves permission to excel.”
<br>
<i>- Eloise Ristad</i></blockquote>


With that in mind - you think more about the process and less about the results.


## 5. You understand the power of UX, marketing, etc...


In my previous job I was one of 6 developers in 3 dev teams in our department. There were two outsourced designers that I never talked with, 3 product managers that I saw only during planning sessions, and a sales team, somewhere, maybe in the US or maybe one floor above, I'm not really sure.

As a server side programmer I never took UX too seriously. I was sure that if the feature is important enough, users are going to use it. I was sure that if we, the devs guys, are going to kick a hell good full product - users will love it. I was sure that there was some secret way that they are going to find it and magically understand how to use all features right off the bat.

I was stupid. UX guys made our users understand our flows, product guys taught us [what not to build](https://shem8.wordpress.com/2015/08/24/know-what-not-to-build-droidcon-2015/) and saved us tons of time, our super hero marketing guy brought us to the first place on [producthunt](http://www.producthunt.com/tech/gallery-doctor-2-0) and let a huge crowd discover our app right on the first day on launch. A tech product is just like other product, the tech part is just a small piece of the puzzle, so don't feel too special.


## 6. You embrace competition


On the day iOS 7 was released we got many messages from friends. They were all like  "oh not cool, apple just implemented your app in the default photos app, sorry for you guys". We were a bit afraid, and at first we thought "ok, we have no chance here". But it turned out to be a good move for us. First - we got some nice free [PR](http://m.blog.laptopmag.com/obsolete-ios-apps?slide=2) during the first few days. Second, users started to understand how much this feature was important when browsing their photos and started to look for a dedicated app for that, and we indeed got more downloads over the following months.

Same happened when Dropbox Carousel launched and with Google photos. When the big companies enter the arena you should start to worry, but you should also be flattered, because that means that there is something worth fighting about, and in today’s world - there is plenty of room for you too there.


<blockquote>Remember: if the Gorilla is blowing down your neck - that means you're on the right track, just run faster =)</blockquote>




## 7. You forget about your comfort zone


Here is some very small taste of the things that I had the privilege to do over the last 3 years. All are things  that I've never done before:





  * I gave 2 talks on 2 different DroidCon conferences (The biggest Android conference around)


  * I delivered tens of pitches in English as part of our startup booth in conferences


  * I went over couple to absolute strangers in the middle of the street and asked them to play with our app, just to gather some feedback


  * I emailed hundreds of users, closed support tickets and solved their issues


  * I went over to the home of one of our investors and worked with her on fixing an issue she had with the app


  * I interviewed candidates applying for the company


  * I started writing my blog :)



  {% img center http://cosmic-fitness.com/wp-content/uploads/2015/03/comfort-zone-300x206.jpg %}

## 8. Nobody is going tell you not to come with flip flops or that the CEO is coming tomorrow so you have to look like you’re working at 8AM

<br>
{% img center https://shem8.files.wordpress.com/2015/10/edit.jpg?w=660 %}

<br>
Yup, you're able to start every Thursday with yoga on the beach and swimming in the sea, and we actually did it.

<br>



* * *



Looks like start-up life is all fun and games , but it's not. It's more like a roller coaster. The ride will take you to some new heights but you are also going to get lots of downs and falls (and I hope I'll write a blog post about it soon). But for all those who want my advice about which one is better - it's more about what kind of person you are and what do you want to achieve. Those small companies that are moving fast are great for learning new things and gaining experience on stuff you probably wouldn't do in a bigger company, but it's also very stressful and chaotic, and you have to be ready for this ride.

As said, I’ve been in these ride over the past 3 years, I can’t say I’ve enjoy every second of it but when looking back, I can’t imagine how far I got and how much I gained from this adventure.
