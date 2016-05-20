---
author: smagnezi8
comments: true
date: 2015-10-02 09:03:17+00:00
layout: post
link: https://shem8.wordpress.com/2015/10/02/pimp-up-your-splash-screen/
slug: pimp-up-your-splash-screen
title: Pimp-up your splash screen
wordpress_id: 186
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- animation
- customview
- guides
- ripples
---

In the past, splash screen in Android was a dirty word, It was usually a bad sign to an app that was converted from iPhone. But lately- Google added [launch screens](https://www.google.com/design/spec/patterns/launch-screens.html) to the design guidelines, and maybe they changed the name, [but the concept is still the same](http://www.androiduipatterns.com/2015/08/splash-screen-with-any-other-name-is.html?m=1).

Splash screen- Good or Bad debate aside, in [Ripples](https://play.google.com/store/apps/details?id=shem.getit&hl=en) I decided to go with the Google guidelines and do my own splash screen, but no just a simple one with the app logo, I wanted to do something different.

A couple of words about Ripples to the ones who don't know- It's a very simple app that all about little circles that slowly reveals and getting bigger. So what I thought is revealing the Ripples logo in the splash screen with some ripples animations in some masking-like way:

[![crop](https://shem8.files.wordpress.com/2015/09/crop.gif)](https://shem8.files.wordpress.com/2015/09/crop.gif)The easiest way to do it is just taking this gif and put it in the splash screen, but I'm not gonna do it because:



	
  1. It'll make this blog post to a pretty short and pointless

	
  2. It will add a lot of resources to the app and make it bigger with no reason

	
  3. We won't learn anything new


So how we gonna do it? With some basic and easy Android drawing methods!

First lets build the splash view with the image, It's a simple view that just load the bitmap and give the view the same size as the bitmap, pay attention that we not displaying anything yet:

[code language="java"]
public class SplashView extends View {
    private Bitmap bitmap;

    public SplashView(Context context) {
        super(context);
        init();
    }

    private void init() {
        bitmap = BitmapFactory.decodeResource(getResources(), R.drawable.logo);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int w = MeasureSpec.makeMeasureSpec(bitmap.getWidth(), MeasureSpec.EXACTLY);
        int h = MeasureSpec.makeMeasureSpec(bitmap.getHeight(), MeasureSpec.EXACTLY);
        super.onMeasure(w, h);
    }
}
[/code]

Now lets start drawing our graphic- We'll draw some masking over the logo bitmap:

[code language="java"]
@Override
protected void onDraw(Canvas canvas) {
    float d = 1 / 0.4f;
    float v = sizeAnimator.getAnimatedFraction();

    Path path = new Path();
    float rad = 0.56f * bitmap.getHeight();
    path.addCircle((int)(0.08 * bitmap.getWidth()), (int)(0.32 * bitmap.getHeight()), rad * Math.min(d * v, 1), Path.Direction.CW);
    path.addCircle((int)(0.2 * bitmap.getWidth()), (int)(0.47 * bitmap.getHeight()), rad * Math.min(d * (v - 0.1f), 1), Path.Direction.CW);
    path.addCircle((int)(0.33 * bitmap.getWidth()), (int)(0.49 * bitmap.getHeight()), rad * Math.min(d * (v - 0.2f), 1), Path.Direction.CW);
    path.addCircle((int)(0.5 * bitmap.getWidth()), (int)(0.49 * bitmap.getHeight()), rad * Math.min(d * (v - 0.3f), 1), Path.Direction.CW);
    path.addCircle((int)(0.63 * bitmap.getWidth()), (int)(0.35 * bitmap.getHeight()), rad * Math.min(d * (v - 0.4f), 1), Path.Direction.CW);
    path.addCircle((int)(0.76 * bitmap.getWidth()), (int)(0.49 * bitmap.getHeight()), rad * Math.min(d * (v - 0.5f), 1), Path.Direction.CW);
    path.addCircle((int)(0.93 * bitmap.getWidth()), (int)(0.49 * bitmap.getHeight()), rad * Math.min(d * (v - 0.6f), 1), Path.Direction.CW);
    canvas.clipPath(path);
    canvas.drawBitmap(bitmap, 0, 0, null);
}
[/code]

Please ignore the constants value all over the place, those are parameter that I've played with (things that you can't do if you chose to implement it with gif!) while making the animation. The important things are how we creating a new path (that built from circles) and clipping the canvas to this path so this what will gonna be visible eventually. After setting to mask for the canvas we just need to draw the bitmap.

Now we just need to put the animation:

[code language="java"]
private void init() {
    ...
    sizeAnimator = ValueAnimator.ofFloat(0, 0.8f);
    sizeAnimator.setDuration(2500);
    sizeAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
        @Override
        public void onAnimationUpdate(ValueAnimator animation) {
            invalidate();
        }
    });
}

public void start() {
    sizeAnimator.start();
}
[/code]

And that's it:

[![output](https://shem8.files.wordpress.com/2015/09/output.gif)](https://shem8.files.wordpress.com/2015/09/output.gif)
