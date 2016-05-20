---
author: smagnezi8
comments: true
date: 2015-07-10 11:47:10+00:00
layout: post
link: https://shem8.wordpress.com/2015/07/10/dont-touch-my-child-view/
slug: dont-touch-my-child-view
title: Don't touch my child (view)!
wordpress_id: 2
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- ripples
---
A few days ago I’ve struggling with some bug someone reported about one my apps- [ripples](https://play.google.com/store/apps/details?id=shem.getit).
<!--more-->

A little background about the app- it’s an interactive game where ripples appear randomly on the screen and the user need to pop them out by touching them for couple of seconds.


![](https://d262ilb51hltx0.cloudfront.net/max/800/1*jxjAMG3FfKvvnb4KY5r14w.gif)The bug was happen when we touch first the parent view and then the ripple view. As you can see in the example above, the user touch the background and then when the ripple appear and the user try to touch it- touch events on the ripple view are disabled.




In a game like this, where interactions are critical part of the game, it’s a must-fix bug.




BTW- multi-touch is supported in the game, if you touch in the same view or touch 2 ripples views, it works fine. Problem start happen only when the parent view is getting on the touches.
















* * *














#### So let’s start diving into the problem




First- let’s get to know the views we’re handling with and the key methods we need to know when handling with touch events.




The parent view is just simple RelativeLayout that wasn’t changed in any way:





    public class <strong class="markup--strong markup--pre-strong">MyRelativeLayout</strong> extends <strong class="markup--strong markup--pre-strong">RelativeLayout</strong> {<em class="markup--em markup--pre-em">
      //Nothing here for now.
    </em>}




The ripple view is a little more complicated but for simplicity I stripped out all the unrelated code:





    public class <strong class="markup--strong markup--pre-strong">RippleGameView</strong> extends <strong class="markup--strong markup--pre-strong">FrameLayout</strong> {
      @Override
      public boolean <strong class="markup--strong markup--pre-strong">onTouchEvent</strong>(MotionEvent event) {
    <em class="markup--em markup--pre-em">    //Handle the user touches according to the game state</em>
      }
    }




The problem is that the **onTouchEvent **in the child view not called when touches happen in the parent view, the one that responsible for calling **onTouchEvent **is **dispatchTouchEvent **in the parent view.




A quick look on the dispatchTouchEvent method in the RelativeLayout source code (the implementation is actually in the GroupView) gonna show us a really-terrifying-long-and-generic-code-for-all-states (But we can still learn from it a lot, and I recommend you to read as much code of the android platform as possible). The code actually contains handling touch in sub-views and check their states and visibility, it contains some listeners and handling sequences of touches, it checking again list of touches it has and update them.





#### Bottom line- this code doing a lots of things that we ***know*** that is unnecessary in our case.




That’s why we can implement our own version that’s gonna act like we wanted, it’s suppose to be something like this:





    @Override
    public boolean <strong class="markup--strong markup--pre-strong">dispatchTouchEvent</strong>(MotionEvent ev) {
    <em class="markup--em markup--pre-em">    //Get the touch position</em>
        int actionIndex = ev.getActionIndex();
        final float x = ev.getX(actionIndex);
        final float y = ev.getY(actionIndex);

    <em class="markup--em markup--pre-em">    //Iterate over child view and search for the right child that should handle this touch event</em>
        for (int i = getChildCount() - 1; i >= 0; i--) {
            View child = getChildAt(i);
            if (!<em class="markup--em markup--pre-em">canViewReceivePointerEvents</em>(child) ||
                !isTransformedTouchPointInView(x, y, child, null)) {
                continue;
            }<em class="markup--em markup--pre-em">        
            //Set the right position for the touch, related to child position, and let it handle the touch event.</em>
            dispatchTransformedTouchEvent(ev, false, child);
        }
        return true;
    }




As you can guess, this code and the helper methods are brutally copied, with some simplifications, from ViewGroup source code (WHY doesn’t it protected dear android devs?!).




And the result:








![](https://d262ilb51hltx0.cloudfront.net/max/800/1*hkSUnobyZD3cC01mGTzh7w.gif)
