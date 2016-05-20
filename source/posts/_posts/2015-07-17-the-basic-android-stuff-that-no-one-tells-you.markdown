---
author: smagnezi8
comments: true
date: 2015-07-17 13:30:52+00:00
layout: post
link: https://shem8.wordpress.com/2015/07/17/the-basic-android-stuff-that-no-one-tells-you/
slug: the-basic-android-stuff-that-no-one-tells-you
title: The basic Android stuff that nobody talks about
wordpress_id: 15
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
---

I started developing for Android 3 years ago. I was never really formally taught - no ‘real’ classes, no online courses. I did what I usually doing when I’m trying to learn a new thing - figure things out through trial and error. I downloaded the SDK and started tweaking and playing with things around while reading the Android developer guide.

It seemed pretty straight forward and I was able to publish a real app after couple of days of playing with things. The app, [Bill Splitter](https://play.google.com/store/apps/details?id=org.bill.splitter), was super simple - it helped you split your bill while you were out dining with friends at a restaurant. Looked terrible, but hey, it worked! That was 3 years ago and since then I’ve gotten much better in Android and learnt tons of new of things (but I definitely still have a lot more to learn).

A couple of weeks ago I got a mail from someone about Bill Splitter. He wanted to request a new feature and report some bugs that he experienced. I was a little surprised that someone still uses the app, but I was so happy that he actually contacted me that I wanted to solve the issues right away. I figured that that given how far I’ve come in my Android skillz, this should be quick.

So, I pulled the code and I immediately gasped in horror when I saw the atrocity of a code the lay out in front of me. It wasn’t your classic n00b mistakes, it seemed even worse, I was severly lacking in the understanding and implementation of some basic Android concepts. Not the usual things like activity, fragment, or how to write basic layouts - all of these are covered in the API guide. It’s more like how to write smart code and design patterns that I needed to discover myself (and looks like many others, like me, needed to discover on by their own).

So, this blog post is dedicated to me, but 5 years ago. We’ll talk about patterns from the Android platform that nobody talks about:


# 1. API from the fragment to the activity


The API from the activity to the fragment is pretty easy because the activity can hold the fragment reference (after adding it within transaction or getting it from layout). But what about the  exact opposite? Here is how every fragment I create looks like:

[code language="java"]
public class MyFragment extends Fragment {

    public interface MyFragmentListener {
        //your api here
    }

    private MyFragmentListener listener;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        listener = (MyFragmentListener) activity;
    }
}
[/code]



# 2. Context


Context can be described as the app environment or state.The context is needed quite often to do all kinds of things in your code, starting from creating views or getting system services. Context is also the easiest way to leak memory, so you should really be careful with it! Now, If we have a couple of different contexts - which one should I use?

Dave Smith publish a great [post](https://possiblemobile.com/2013/06/context/) about it, but let me summarize it for you:



	
  * If you need to save the reference for a latter use, probably for some background not-ui-related task (for example, update the shared preference)- you should use the **App** context.

	
  * For all other cases- use the **Activity** context.


That's it.


# 3. Creating new fragment


If I want to create a new fragment, how should I pass argument to it? Create helper method to create an instance:

[code language="java"]
public class MyFragment extends Fragment {
    private static final String INT_KEY = "INT";
    private static final String STRING_KEY = "STRING";

    public static MyFragment newInstance(int intArg, String stringArg) {
        MyFragment f = new MyFragment();
        Bundle arg = new Bundle();
        arg.putInt(INT_KEY, intArg);
        arg.putString(STRING_KEY, stringArg);
        f.setArguments(arg);
        return f;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        int arg1 = getArguments().getInt(INT_KEY);
        String arg2 = getArguments().getString(STRING_KEY);
    }
}
[/code]



# 4. Saved instance


Lots of Android developers ignore the saved instance on the activity (or fragment). Saved instance is super important to the user experience (How bad would it be if all of your form was reset just because you checked your Whatsapp message?).

First, lets start with the good news- Android would do most of the work for you. If you want to save the view state, just put **android:id** attribute to the view. Other than that, your activity (or fragment) should be look something like that:

[code language="java"]
@Override
public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
    super.onViewCreated(view, savedInstanceState);

    if (savedInstanceState == null) {
        //first time this showing, do your animation/ default values here
    } else {
        //restore state
    }
}
[/code]



# 5. Debug mode


When developing your app you want to work on a separate version of your app. Off the top of my head I can quickly think of 2 reasons why:



	
  1. You don't want to dirty your real app data.

	
  2. If you're like me, most of your apps are independent, small, utilities or games, that probably won't be a big hit at first. Thats means that your analytics will contain a lot of session from your side and few from real users, what make it very hard to measure.


Android and gradle make it really easy to create a new app when developing, using _buildTypes, _so just put a suffix to your debug build type and it won't override the real app:

[code]
buildTypes {
    release {
    }

    debug {
        applicationIdSuffix ".debug"
    }
}
[/code]

Please note that it will create 2 instances of your app that you won't able to detect which on is the debug in which one is the real (the latter one in the applications list is the debug btw), so you can create a separate strings.xml file in debug with app_name for debug.



* * *



That’s it. Hope the past-me (aka youngin’ Shem) was able to learn some good tricks. Hopefully I was able to save you some time as well with some of these tricks.

Question to you: Do you have other design patterns or tricks that are worth mentioning here? I would love to read them in comments. Let me know!
