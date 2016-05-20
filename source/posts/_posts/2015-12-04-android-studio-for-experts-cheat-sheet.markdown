---
author: smagnezi8
comments: true
date: 2015-12-04 10:49:30+00:00
layout: post
link: https://shem8.wordpress.com/2015/12/04/android-studio-for-experts-cheat-sheet/
slug: android-studio-for-experts-cheat-sheet
title: Android Studio for Experts- Cheat Sheet
wordpress_id: 217
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- androidstudio
---

So last week there was the great Android Dev Summit, that in my opinion was one the greatest summit by Google, because unlike Goolge I/O or others Google big events- these event was very technical and was especially for devs, so if you didn't [watched the videos](https://www.youtube.com/playlist?list=PLWz5rJ2EKKc_Tt7q77qwyKRgytF1RzRx8) already I very recommend to go over it and pick the ones interested you the most.
<!--more-->

One of the useful talks there was about some tricks and new cool things that you can do with Android studio (some of them old and some of them new and experimental), It's a bit long and cover a lot of things- so I decided to summarize it so I can go over it from time to time, I also add so time indication to each subject covered so you can just skip to this specific part.

https://www.youtube.com/watch?v=Y2GC6P5hPeA


## Editor tricks by Tor Norbye [0:30-19:50]:






  * Use Tab (instead of Enter) to auto complete


  * Ctrl+Shift+Space for smarted auto complete (or twice to even smarter)


  * Intention actions (Alt+Enter) for context actions like: creating constructor, add fields, auto cast etc...


  * Builtin templates:


    * lists- "fori" or "list.fori"


    * Log- logi, logm (for logging method), logr (for log return), logt (for tag)





  * Auto filter when start typing in every actions list


  * tools:showIn for show you layout preview withing the parent layout


  * tools namespace are ignored while build, so use them for preview (like src for ImageView or listItem for GridView)


  * Add shrinkResources=true with MinifyEnabled to strip out unused resources.


    * tools:strictMode, tools:keep, tools:discrad for customize it.





  * Ctrl+Shift+A for finding action by name




## Debugger tricks by Siva Velusamy [20:00-29:30]:






  * "Analyze stacktrace" command for analyzing traces that came out of android studio (even scramble traces with Proguard)


  * "View as" for resources references while debugging.


  * An option for debug printing in each break point, even without stopping in this breakpoint (click on the break point -> more -> log evaluate expression).




## Gradle integration by Alex Ruiz [29:35-37:20]:






  * Android studio has an option to create a module from jar/ aar library


  * Switch build variant while working with the "Build Variants" view.


  * On Android Studio 2.0- Enable all artifcats together (so things like refactoring will work also for you Android tests and your unit tests) from settings: Build, Execution, Deployment -> Experimental -> Enable all test artifacts.




## Test code by Michal Bendwoski [37:20-41:40]:






  * Alt+Enter on your class-> create Android Test on this class.


  * Ctrl+N (Generate command) to create test method.


  * Intention action for moving some code to setUp method.


  * Ctrl+Shift+T to navigate between Test and Test Subject (+ you can add new test case from there).




## C++ Support by Kathryn Shih [41:40-51:20]:






  * Doxygen is now supported so F1 is working also for C++ code.


  * Enable native debugging (from Run->Edit configurations) so you will be able to debug your native code too.


    * But that make the compilation / linking time longer, so be aware.





  * On Android Studio 2.0- Awesome [GPU debugging](https://sites.google.com/a/android.com/tools/tech-docs/gpu-profiler) option.




## Performance tools by Esteban de la Canal [51:20-1:08:55]:






  * New network monitor- x axis is the request time, y is the request speed, the area of the graph is the request size.


  * In the allocator tracker- you can switch to "Group by allocator" view so the allocation will be grouped by package name, that way you can easily find your classes that response to allocations.


  * When opening a heap dump you have some builtin tasks for memory leak analyzing, one of them is Leaked activities- very useful!


  * GPU monitor (Experimental) is disabled by default because it might affect other monitors. It's much like the on device GPU monitor.





* * *





That's it, the talk covers some more things that not included here, I tried to put the ones I think I would use the most, feel free to comment and add if you thing I forgot something.
