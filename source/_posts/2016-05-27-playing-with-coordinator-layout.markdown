---
layout: post
title: Playing with Coordinator Layout
date: 2016-05-27 15:02:52 +0300
comments: true
author: smagnezi8
categories:
- android
tags:
- android
- androiddev
- turorial
---

Lately I needed to build some kind of overlay screen that looks like the one that shows when you open the phone when you don't have a lock screen. This is a simple overlay screen that should be dismissable when the user swipe it out from the lower part of the screen<!-- more -->, something like this:

{% img center /images/posts/get-feature-packed-iphone-like-lock-screen-for-your-galaxy-s6-other-android-device-w654.jpg 211 * %}

When coming to implement it, I thought about building a _LinearLayout_ with 2 views- the content view and the swipe view, than put some touch listener on the swipe view and implement swiping mechanism, than syncing both view to act the same. But when I thought about it more and more I decided that it's too much work. Searching this kind of code or library out there always bring me to _RecycleView_ swipe to dismiss items, and in one of those search results I saw how to implement this swipe to dismiss item in _RecycleView_ with _CoordinatorLayout_, so I decided to give it a chance.

_[CoordinatorLayout](http://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.html)_ is a really great addition in the design support library. Most of you probably already used it with a [floating action buttons](https://guides.codepath.com/android/floating-action-buttons) or [snackbars](http://www.androidhive.info/2015/09/android-material-design-snackbar-example/) but if you like me- you just put it there, assuming views will move properly, without really diving into how the layout is syncing between them.

So it turns out that _CordinatorLayout_ is pretty powerful, it let you easily define interactions on child views and even between them, those interactions are called [behaviors](http://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.Behavior.html) so that each child can behave differently according to things that are happening in the layout. You can do a really cool things with those behaviors, here is one example for a [great blog post](http://saulmm.github.io/mastering-coordinator) that I stumble upon my searches about coordinate layout usages.

In our case it suppose to be pretty easy, there is already a [swipe to dismiss behavior](http://developer.android.com/reference/android/support/design/widget/SwipeDismissBehavior.html) ready to be used on the lower view, so we just need to attach it to the relevant view. First lets build our layout:

{% codeblock lang:xml %}
<android.support.design.widget.CoordinatorLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout android:layout_width="match_parent"
         android:layout_height="match_parent"
         android:id="@+id/container"
         android:background="#06ff87"/>

    <TextView
        android:id="@+id/dismiss"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="> Swipe to dismiss > > >"
        android:padding="30dp"
        android:gravity="center"
        android:layout_gravity="center_horizontal|bottom"
        android:background="#3bb0ff"/>

</android.support.design.widget.CoordinatorLayout>
{% endcodeblock %}

As said, it’s a simple layout with 2 view- one for the content (the green one) and one for the swiping (the blue one).

Now, lets attach the relevant behavior to the relevant view:

{% codeblock lang:java %}
View dismiss = findViewById(R.id.dismiss);
CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) dismiss.getLayoutParams();
SwipeDismissBehavior<View> behavior = new SwipeDismissBehavior<>();
behavior.setSwipeDirection(SwipeDismissBehavior.SWIPE_DIRECTION_START_TO_END);
behavior.setListener(new SwipeDismissBehavior.OnDismissListener() {
    @Override
    public void onDismiss(final View view) {
        finish();
    }

    @Override
    public void onDragStateChanged(int i) {}
});
params.setBehavior(behavior);
{% endcodeblock %}

That's pretty self explained- we declare a new swipe to dismiss behavior, set it's direction only to right, and finish the activity on dismiss. But there's on problem- somehow, although we declare this behavior only on the dismiss view, it working on all the view, so also the content view is swipeable as you can see here:

{% img center /images/posts/ezgif-4244700794.gif 280 498 %}

I'm not sure if this is by design or just a bug (after digging in the code I'm afraid this behavior is not intended) but we can easily fix this by creating our own behavior. Of course that we not going to write this whole code from beginning, we'll use the _SwipeDismissBehavior_ class and just fix the relevant code. I really recommend doing a little investigation and reading the Android code, that's way you're fully understand how things really works and get to read an high quality code written by the Android developers, in that case the fix is pretty easy to spot- the _SwipeDismissBehavior_ handle touch events also if those touches not in the view (although there is a check in the _onInterceptTouchEvent_ method and those events should be ignore) so I created a new behavior class just for this fix:

{% codeblock lang:java %}
/**
 * Handle only touches on this current view
 */
@Override
public boolean onTouchEvent(CoordinatorLayout parent, V child, MotionEvent event) {
    if (parent.isPointInChildBounds(child, (int) event.getX(), (int) event.getY())) {
        return super.onTouchEvent(parent, child, event);
    }
    return false;
}
{% endcodeblock %}

Changing the activity to use _SwipeDismissOnlyOnViewBehavior_ instead of _SwipeDismissBehavior_ is doing the work:

{% img center /images/posts/ezgif-2527994552.gif 280 498 %}

Now we need to sync between the content view to the dismiss view when swiping, so we creating a new behavior just for this. Because this is really simple behavior all we need to implement are 2 functions, in which view this content view depended (_layoutDependsOn_) and what to do when the dependent view changed (_onDependentViewChanged_):

{% codeblock lang:java %}=
CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) container.getLayoutParams();
final CoordinatorLayout.Behavior<View> behavior = new CoordinatorLayout.Behavior<View>() {
    @Override
    public boolean layoutDependsOn(CoordinatorLayout parent, View child, View dependency) {
        return dependency.getId() == R.id.dismiss;
    }

    @Override
    public boolean onDependentViewChanged(CoordinatorLayout parent, View child, View dependency) {
        child.setX(dependency.getX());
        child.setAlpha(dependency.getAlpha());
        return true;
    }
};
params.setBehavior(behavior);
{% endcodeblock %}

And voila:

{% img center /images/posts/ezgif-2484339332.gif 280 498 %}

[{% img center https://media.giphy.com/media/xT77XRp55yPwHkd5Nm/giphy.gif 480 270 %}](http://giphy.com/gifs/honda-honda-valueofx-civicx-xT77XRp55yPwHkd5Nm)
