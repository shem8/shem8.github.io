---
author: smagnezi8
comments: true
date: 2015-08-06 12:15:11+00:00
layout: post
link: https://shem8.wordpress.com/2015/08/06/custom-view-part-2/
slug: custom-view-part-2
title: Custom view- Part 2
wordpress_id: 88
categories:
- android
post_format:
- Image
tags:
- android
- androiddev
- customview
- guides
---

##### _In [part 1](https://shem8.wordpress.com/2015/07/31/custom-view-part-1/) we learned how to build a simple custom view that's integrate nicely with our pager view and show some indication about the current page, in this post we'll take the view to the next level and add some subviews for page headers_
<!--more-->

* * *

So we have simple nice looking pager indicator that animate smoothly when moving between tabs, but it's still missing some info about the tabs- something like the pages titles. So we'll add some subviews as the page titles and make them a bit interactive to show the selected page.
Why I plan to use subviews instead of just drawing the text straight on the canvas?




  * When drawing text you need to handle the text position, text size line breaking etc... Lets focus on building the view and let Android save us time by using TextView.


  * When using subview we also save code on handling click events.


  * By adding subviews we make ourselves use ViewGroup and learn how to handle layout and measure parent and child views, and we're all here to learn right? =)




# 0. Setup


Let make our PagerIndicatorView to extends ViewGroup so we'll be able to add sub views:

[code language="java"]
public class PagerIndicatorView extends ViewGroup {
[/code]

Here is some tricky part that first I've been waste couple of good hours debugging: view groups are usually not showing real UI, it just contains sub views and responsible to arrange them in the right order and layout, So by default the onDraw is skipped for ViewGroup. That's not the case for our view, so we need to disable it:

[code language="java"]
public void init() {
    ...
    setWillNotDraw(false);
}
[/code]

That's it, our view is now officially became a ViewGroup and we're able to add it child views


# 1. Add the child views


Lets add the page titles, it will be a simple TextViews with the numbers:

[code language="java"]
public void init() {
    ...
    addView(getTextView("1"));
    addView(getTextView("2"));
    addView(getTextView("3"));
    addView(getTextView("4"));
}

private TextView getTextView(String text) {
    TextView v = new TextView(getContext());
    v.setText(text);
    v.setTextSize(30);
    v.setGravity(Gravity.CENTER);
    return v;
}
[/code]

Now it's the time for putting the text views in the right position and size inside the view.

First lets start by setting them the right size- each text view should be 1/4 from the view width and the same as the view height. The measurement mechanism in view is done in the [onMeasure](http://developer.android.com/reference/android/view/View.html#onMeasure(int, int)) method and it is a bit tricky- uses something called [measure spec](http://developer.android.com/reference/android/view/View.MeasureSpec.html). I would recommend you to read about it, but it basically define the size and the mode of the view. For easy handling it- the framework supply the developers couple of helper methods for reading and creating specs:

[code language="java"]
@Override
protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    final int width = getDefaultSize(getSuggestedMinimumWidth(), widthMeasureSpec);
    final int childWidth = width / 4;
    final int height = getDefaultSize(getSuggestedMinimumHeight(), heightMeasureSpec);
    for (int i = 0; i &amp;lt; getChildCount(); i++) {
        getChildAt(i).measure(View.MeasureSpec.makeMeasureSpec(childWidth, View.MeasureSpec.EXACTLY), View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));
    }
    setMeasuredDimension(width, height);
}
[/code]

Now for positioning the child views in the right places, this is done in the [onLayout](http://developer.android.com/reference/android/view/View.html#onLayout(boolean, int, int, int, int)) method, we'll just go over the child views and position each child in the right offset:

[code language="java"]
@Override
protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
    final int childW = (right - left) / 4;
    final int childH = (bottom - top);
    for (int i = 0; i &amp;lt; getChildCount(); i++) {
        getChildAt(i).layout(i * childW, 0, (i + 1) * childW, childH);
    }
}
[/code]

Now you should get something like this:

[![screen](https://shem8.files.wordpress.com/2015/08/screen-e1438861347399.png)](https://shem8.files.wordpress.com/2015/08/screen.png)


# 2. Interactive


So we have titles for all pages, but how about make it clear which page is selected (beside the background color I mean)? Lets make out view a little bit more interactive, cause you now what the say- god is in the details.

We want to make the texts enlarge and be for strong when scrolling to the page:

[code language="java"]
@Override
protected void onDraw(Canvas canvas) {
    ...
    for (int i = 0; i &amp;lt; getChildCount(); i++) {
        final View view = getChildAt(i);
        if (i == index) {
            view.setScaleX(1 - Math.abs(prec) * 0.3f);
            view.setScaleY(1 - Math.abs(prec) * 0.3f);
            view.setAlpha(1 - Math.abs(prec) * 0.5f);
        } else if (i == index + 1) {
            view.setScaleX(0.7f + Math.abs(prec) * 0.3f);
            view.setScaleY(0.7f + Math.abs(prec) * 0.3f);
            view.setAlpha(0.5f + Math.abs(prec) * 0.5f);
        } else {
            view.setScaleX(0.7f);
            view.setScaleY(0.7f);
            view.setAlpha(0.5f);
        }
    }
}
[/code]

And wallah:

[![final](https://shem8.files.wordpress.com/2015/08/final.gif)](https://shem8.files.wordpress.com/2015/08/final.gif)





* * *






### You can find the whole code in my [git repository](https://github.com/shem8/customviewpager), have fun!
