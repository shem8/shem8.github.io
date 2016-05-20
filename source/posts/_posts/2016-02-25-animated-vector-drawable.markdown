---
author: smagnezi8
comments: true
date: 2016-02-25 19:43:46+00:00
layout: post
link: https://shem8.wordpress.com/2016/02/25/animated-vector-drawable/
slug: animated-vector-drawable
title: Animated Vector Drawable
wordpress_id: 980
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- animation
- guides
- vectordrawable
---

In API 21 the Android team released bunch of very cool things for material design, most of the things focus around the design specs like colors or transition animation, other were for the new widgets like FAB, card view or recycle view, but within all those things there were also two things that barely discussed- [VectorDrawable](http://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html) and [AnimatedVectorDrawable](http://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable.html).
<!--more-->

_Edit: looks like those classes became so popular that the Android team decided to add them to the [latest support library](http://android-developers.blogspot.co.il/2016/02/android-support-library-232.html), yay!_


## Android resources


In Android, recourses took lots of space in the final APK, tools like Proguard or loading modules dynamically helped the developers very much decreasing their app size, but when it came to assets, we were very limited. You had to choose between create asset for each density or paying with cpu time and let android doing the resizing and risk by not perfect asset.

I saw couple of apps that choose to download their assets from the internet but that's might be problematic for first run (intro) or cases you don't have a connection.

That's why I was so happy hearing about the new VectorDrawable introduced in API 21, that was let us the ability to create vector shapes and scale them easily for all screen sizes. This was really great for icons or small buttons.

Of course, developers were able to do it before with a custom view and just draw the icon them self with Path, but the VectorDrawable save us the unnecessary view and it also use the SVG Path syntax that it much easier and much more popular. Moreover- Android Studio were able to show you a vector drawable preview, what that make it much more connivance!


## Animations


Animations were a pain too. You basically had 3 options:




  1. For a simple animations (like scaling, fading or moving) using the build-in view property animation, that was the case for 90% of the time.


  2. If you had more complex animation on complex view you could create a custom animation, but for this you had to write lots of code


  3. Use AnimationDrawable and put drawable for each frame.


So again- for not trivial cases, you had to choose between writing lots of code or putting lots of assets.

That's when AnimatedVectorDrawable introduced and let developers use basic animations with their VectorDrawables with few lines of code and much lower space.


## Live example


Let's start- assume we have some search component and we want to move to and from search state. So we need to animate between search icon and cancel icon:



[gallery ids="1025,1024" columns="2" link="none"]

And the animation between those 2 icons (Added guides and slow motion to better understand the transition):

![gif](https://shem8.files.wordpress.com/2016/02/gif.gif)

As you can see we actually have 3 shapes that moves: 2 half circles that moves to lines (green and blue) and the line of the magnifying glass that just getting bigger and reaching to the end.

First we need to create the shapes for the search icon:

https://gist.github.com/shem8/b2e237d74a3d1dabbf5f

The syntax for creating SVG paths is not that complicated and you can learn about it [here](https://www.w3.org/TR/SVG/paths.html), Android Studio is also very handy here because you can see a preview and also import existent material app icons and see their paths as described [here](http://developer.android.com/tools/help/vector-asset-studio.html).

Now lets create the animation, we'll focus on the animation from the search icon to cancel, the opposite is pretty the same just with reverse values. We going to create 3 different animations:

https://gist.github.com/shem8/4898f047caa80151bca8

https://gist.github.com/shem8/e78f674a02796e8ebca8

https://gist.github.com/shem8/9183be2e0759cff9d7a7

The animations are pretty basics and what we're doing here is just changing the start or the end of the path. Now we need to bring all animation together:

https://gist.github.com/shem8/b6c4709617bb20394627

And now you can easily use the  search_to_cancel drawable in code, just don't forget to call **start()**:

![final](https://shem8.files.wordpress.com/2016/02/final.gif)

A few notes regarding to this process:




  1. Without [Nick Butcher](//twitter.com/crafty) and his great resources (like the [plaid](https://github.com/nickbutcher/plaid) app) I wouldn't know anything about AnimatedVectorDrawable, so a lot of credit from this blog post should go to him.


  2. Most of the paths are not that easy to build and you'll need to play with this pretty much, you can use tools like Photoshop to export SVG data, but still, some manually work be will here.


  3. The preview in Android Studio for the drawables is a bit buggy (especially around trimmed paths) so you need to test some things on device sometimes.


  4. From what I saw- on the first times the animation can stuck, so it better to set the final asset state after some delay to make sure the icon looks good in the end of the animation.


That's for this time, hopes this will help you in the next time you want to build a great UX. =)



* * *



Liked this post? Please share it with your friends!
