---
author: smagnezi8
comments: true
date: 2016-01-01 13:52:32+00:00
layout: post
link: https://shem8.wordpress.com/2016/01/01/kotlin-a-better-java-for-android/
slug: kotlin-a-better-java-for-android
title: Kotlin- a better Java for Android?
wordpress_id: 402
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- guides
- kotlin
---

A couple of weeks ago, when going over some Android DevSummit videos, I encountered in some question about alternative language for Android during one of the [fireside chats](https://youtu.be/-VNfWh5UkfY?list=PLWz5rJ2EKKc_Tt7q77qwyKRgytF1RzRx8&t=1461) session with the Android team. It was really interesting that there was another way to develop an Android apps but unfortunately I didn't fully catch the name of the language ("What what? was it Kotin? Tolkin? What he was saying???") so I give up.
<!--more-->

Next, I stumble upon [this twitter conversation](https://twitter.com/donnfelker/status/675020357158477825) and finally found Kotlin.


## What's wrong with Java?


Nothing special, really. Yes, ruby python and JS are really sexy with all those duck typing and lambdas and much less boilerplate code, but Java has really good IDE's that saves you a lot of time and don't bother you with all those declarations.

Moreover, Oracle is trying to keeping up the pace and add some cool things like lambda expressions, but still- Java is a bit "heavy" and fall in the small things (like arrays and lists, NPE, iterations, Generics and more...).


## So what's wrong with Java on Android?


OK, that's a different question. First- Java 8 (and even some things from Java 7) [not supported on Android platform](https://www.reddit.com/r/androiddev/comments/22mh0r/does_android_have_any_plans_for_java_8/) (yet, there was some changes in the last week and [Google announce that the next version of Android will be targeting OpnJDK](http://venturebeat.com/2015/12/29/google-confirms-next-android-version-wont-use-oracles-proprietary-java-apis/)). So it still sucks to handle with stream, dates and we can't use things like lambdas or switch on strings.

Second- Android considered as front end platform and as frond end developer I would like the code will be as lightweight as possible. That's mean things like:




  * Easily add helper methods to all kinds of types (and not using static utils classes everywhere).


  * Lambda/ function pointers/ on the fly code execution.


  * Easily run things in background and async task, without the [callback hell.](http://stackoverflow.com/questions/29341582/how-to-avoid-callback-hell-in-java)


  * I would be glad to extends from my own classes by most of the time I must extends from Android classes (or other 3rd libraries) what make the code reuse and abstraction a bit hard.




# Kotlin to the rescue


{% blockquote Kotlin official site http://kotlinlang.org %}
Statically typed programming language for the JVM, Android and the browser


{% endblockquote %}


JetBrains, the company behind Kotlin, understand the potential of Android build system and integrated the language compiled byte code straight into the Android gradle mechanism.

Unlike other JVM languages, like Clojure or Scala, JetBrains understand the power of JVM-like platforms and made some specific adaptation for those. That's mean that Kotlin can be compile even to JavaScript!


## Language basics


I won't go over the language syntax, there is a very good documentation in the [Kotlin site](https://kotlinlang.org/docs/reference/). I would just say that for Java devs among you it suppose to be pretty straight forward, and for you who familiar with C# it should be even easier.


## Starting with android


So lets start by creating an Android project. JetBrains are also the creator of InteliJ, the editor Android Studio based on, so it easily integrated for working also with Kotlin, you just need to install the [Kotlin plugin](http://blog.jetbrains.com/kotlin/2013/08/working-with-kotlin-in-android-studio/).

Creating a new Android app with Kotlin it just like a regular app, follow [this instructions](https://kotlinlang.org/docs/tutorials/kotlin-android.html) and make the first "Hello World" app. You might still gonna need to do some changes in code (like changing from _savedInstanceState: Bundle_ to _savedInstanceState: Bundle?_ for null safety) but it suppose to compile quickly.

Now we're able to see how we can use the language for faster development:


### Kotlin Android Extensions


[The Android Extensions plugin](https://kotlinlang.org/docs/tutorials/android-plugin.html) allows us to get rid from all the _findViewById_ boilerplate code without having to add any extra code or shipping any additional runtime:

``` kotlin
// Using R.layout.activity_main from the main source set
import kotlinx.android.synthetic.main.activity_main.*

public class MyActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textView.setText("Hello, world!") // Instead of findView(R.id.textView) as TextView
    }
}
```


### Code shrinking


Code in Java:

``` java
view.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        //click handling
    }
});
```

Comes to:

``` kotlin
view.setOnClickListener({//click handling})
```
And:

``` java
if (s != null) ? s.length() : 0
```
Comes to:

``` kotlin
s?.length ?: -1
```

Isn't it wonderful?


### Extensions methods


Here is the real power of the language in my opinion, we can easily add utility function to our components from outside and use them seamlessly in our classes, here are some examples that I've used in my extension class:

``` kotlin
fun AppCompatActivity.navigate(frag: Fragment) {
    val fragmentTransaction =  supportFragmentManager.beginTransaction()
    fragmentTransaction.replace(content.id, frag);
    fragmentTransaction.commit();
}

fun Fragment.userError(msg: String?) {
    Snackbar.make(view, msg, Snackbar.LENGTH_LONG).show()
}

fun SharedPreferences.edit(func:SharedPreferences.Editor. () -&amp;amp;amp;gt; Unit) {
    val editor = edit()
    editor.func()
    editor.apply()
}

fun SharedPreferences.Editor.set(pair: Pair<String, String>)  = putString(pair.first, pair.second)
```

There are also some libraries out there that add you many more extentions like: [KAndroid](https://github.com/pawegio/KAndroid) and [androidKotlin](https://github.com/yoavst/androidKotlin), or even examples from others Android devs like [Jake Wharton](https://speakerdeck.com/jakewharton/android-development-with-kotlin-androidkw-number-001).


## Last words


Java in general, and Android in particular, has not so few problems, and although Oracle and Google adding features and trying to keep up the pace- it's too slow and too heavy handed.

Kotlin is some experiment from JetBrains to bring the latest design patterns paradigms to Java, Android and JS platforms that was quickly take Android community attention (and even inside Google).

As you can see it look pretty good for start, it can save much redundant code and speed up development, and it will be interesting what will be next moves from Google and JetBrains and if it gonna get to the mainstream.
