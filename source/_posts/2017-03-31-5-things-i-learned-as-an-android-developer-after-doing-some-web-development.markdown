---
layout: post
title: "5 things I learned as an Android developer after doing some Web development"
date: 2017-03-31 13:32:32 +0300
comments: true
categories:
- android
- web
---
In the last couple of months, I started my new journey, leaving my Android position behind and started doing some web development. Working on those 2 platforms has many differences, I can’t say the one is better than the other, but there are many things that those 2 worlds can learn from each other.
<!-- more -->
In this post, I’ll focus on the things that I saw while working on our front-end React app. Things that I learned about Android and the way that we’re building apps.

## 1. We write too much code

Creating a custom view, even the simplest one, will probably going to take 1 too long View subclass. This class should contain a couple of constructors, getters/ setters, reading and parsing attributes and inflate an XML, and that’s without even mentioning the layout file. While on react you should only implement the render method (and maybe also CSS/SCSS file for customizations).

For example, here is a simple user info widget, written in Android and React:

{% gist e6e3f36ce7df9a4c3a2306377708c883 %}
{% gist 35aa8f80662f6f0f03d044cd6d9dedc4 %}

I don’t event talk about things like JSON parsing, network calls or saving state.

This is mainly because of the use of language like Java on Android vs JavaScript. You can eliminate some of the boilerplate if you’re using Kotlin, or use [Data Binding](https://developer.android.com/topic/libraries/data-binding/index.html) to get more done in the layout file but still.

## 2. The development feedback cycle is too long
How long it takes to see code changes on the device (virtual or physical) in Android studio? If you change small things like text or color, Google says it should take only a couple of seconds (when Instant run is enabled), most of the time it will take a couple dozen of seconds, and it even can get to a minute or two. Also- changes will be effected only when you click “Run”.

How long it take with React when using Webpack (a module bundler, or a “complier” if you want)? Immediately. Like second or two. And that’s happening right when you save the file. Changed the wrong element? Boom! you see it right away.

Don’t think that 5 or 10 seconds are really that different? When developing- every second count (and soon enough all those seconds will accumulate). Especially when those changes are shown passively (when the file is saved) and to actively (when you run the app). I really recommend you to see this [talk](https://vimeo.com/36579366) and see how it can affect your development (warning: the speaker will blow your mind).

## 3. Using Flux architecture
[Flux](http://facebook.github.io/flux/) is the application architecture that Facebook uses for building client-side web applications. It complements React’s composable view components by utilizing a unidirectional data flow. It’s more of a pattern rather than a formal framework, and when combining React Router with Redux we can get some pretty close data flow to Flux pattern.

Flux making writing client side much cleaner and easier to debug and predict. Although there are some [examples](https://github.com/lgvalle/android-flux-todo-app) and [libraries](https://github.com/frostymarvelous/Fluxxan) for Android it’s still not widely used.
On Android apps we’re still passing data around in all kind of ways (intents, DB, message bus, etc…), keeping it mutable that every component can change it and by this- making our life really hard.

## 4. Separate the content from how it looks
When building a page on Android I must also build its layout. I need to arrange the the page and it’s component and somehow put them together in the view. Even if I just want to focus on behavior- I must somehow play with Linear Layouts, Scroll Layouts and things like that.

Then when I need to design the view I again need to return to the layout file and add all the magic. However, when I need to add animations- I’ll need to put it in the code.
The View class and the View layout are not that separate, it’s hard to focus only on the behavior without handling the look and feel. In Android, it’s too coupled.

But with React- you can extract all the UI-related code to the stylesheet file. for example, if I wanted to create a simple widget that changes the view state by clicking- I would do something like that ([JSFddle](https://jsfiddle.net/reactjs/69z2wepo/)):

{% gist d120440fe48defa1b7cbfe1edc59b943 %}



And in the SCSS file, I would decide what does a disabled item looks like (hidden? gray out? I don’t care right now).
But if I wanted to do it in Android I would need to change it in the View class (or it’s parent, or in the OnClick listener).

## 5. We can get better developer tools
Do you remember the last time you select “Debug” in Android studio (I bet it was probably by mistake)? Do you remember those 1–2 minutes you waited until the app opened and the debugger was connected? Or that you attach the debugger to a running app and suddenly everything was slow as hell?

Do you remember that time there was a weird spacing between your views and you had to turn on some flags in the developer options settings and hope you’ll understand each view bounds from some random rectangles on the screen?
Do you remember trying to figure out what is going on with your database so you had to dump the database and pull it from the device?

Do you remember that you wanted to try out some things in your view on the device but needed to change the code and re-run it every time?

Chrome (and Firefox) developer tools make debugging and playing with your app so much easier that it is not fair. You can change views on the fly, inspect your elements easily and run some code in the console whenever you want.

---

Web development is really nice (and much harder that I thought it will be actually), but I still have a much warmer place in my heart for Android. Although it’s no fair to compare the two (Android need to work on remote devices or on emulators, it’s much “younger” than the web) I think that the two communities can learn one from each other.

As for what web development can take from Android development- in the next post (hopefully).
