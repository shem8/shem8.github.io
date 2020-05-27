---
layout: post
title: "Three great startups I could build if Google would give me access to their data."
date: 2019-05-03 17:06:12 +0300
comments: true
categories:
  - life
tags:
  - life
  - tips
---
_(It’s actually my data. Just saying.)_
<!-- more -->

I love Google; I use their products every day. Besides the search engine, I love Google Photos, I have an Android phone, and I use Gmail (RIP Inbox), Maps, Docs, Slides, Sheets, and many more.

On the other hand, I’m an engineer, and I love building products, especially ones that make my life easier. That’s why I created an [app to split the bill](https://play.google.com/store/apps/details?id=org.bill.splitter) between friends when sitting in a restaurant, or a [web app to track my expenses](https://expense.shem.dev/). In the past couple of years, I had many ideas about cool features that I could use in all those products I’m using. I could wait for the relevant product managers to build those features in the corresponding products, but you know what it’s like with Google’s product managers:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Google interviewer: what do you do when a product—<br>PM candidate: SHUT IT DOWN<br>GI: THAT IS CORRECT SOMEONE MAKE A JOB OFFER TO THIS MAN</p>&mdash; Florent Crivello (@Altimor) <a href="https://twitter.com/Altimor/status/1113641671353192449?ref_src=twsrc%5Etfw">April 4, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


So basically I was alone here, and I needed (and also wanted) to build those tools by myself.

But building a new product is hard. Not because you need to write the code from scratch — that’s usually the easy part. It’s hard because you need to find a user base, to teach them how to use your product, to build the right interface and make sure they won’t leave. That’s why it’s easier to write your thoughts on Medium and not open your own blog, or open a Facebook page for your business instead of maintaining a dedicated website with chat and notifications and all.

In my example, as an engineer who wants to build stuff, the equivalent for that is using other product’s data and user interface. For example, instead of using a dedicated app to back up my good photos — I use [IFTTT](https://ifttt.com/) to upload every photo that I post to Instagram directly to Dropbox.

As mentioned before, because I’m using many Google products in my day-to-day life, I thought I could leverage those apps to build some helpful products (for me) based on them.

Here’s a partial list of ideas I had lately and after some research, I understood pretty quickly that it’ll be hard to do with the current options I have in hand.

_A note: All these product names are WIP. I’m better at engineering than I’m at marketing._

## 1. Commute Optimizer
As someone who spends almost 2 hours commuting each day, this is a big aspect of my life that I would love to optimize. You might not know it, but if you have the Google Maps app on your phone, [it tracks every step you make during the day](https://www.apnews.com/828aefab64d4411bac257a07c1af0ecb), whether you drive to work or go to your supermarket on the next block to buy some milk.

You can like it or not, but this is the price you pay for using Google Maps (or Google in general). I for one, feel that it’s a reasonable price to pay, given the tremendous help I get from those apps and how much more comfortable my life is with Google.

So putting privacy concerns aside, the data is there, and [you can see it](https://www.google.com/maps/timeline). But what can you do with it (aside from getting tailor-made ads)?

What if I could take all this data, process it, see some patterns and understand what is the best time for me to leave home to catch the bus to work or when to leave home when there’s less traffic? The Google Maps app already has a couple of years of data and running a simple algorithm (that also learns and gets feedback) and can give me some good insights.

#### Why can’t I do it?

So the idea is pretty simple, right? The only problem is the data isn’t easily accessible. There’s no API for your timeline and the only way to get it is to [download a huge JSON file](https://takeout.google.com/settings/takeout/custom/location_history?pli=1). This is definitely not the optimal way for a third party app to pull this data, and also the data won’t update, so the app isn’t able to improve.

Moreover, the data Google exports for you is the raw locations. Right — the raw data gives you more options to do whatever you want, but Google already does the calculations and gives you great insights about when you walked and when you started driving —if Google gave you __this__ kind of data, this would be a much easier way to work with the data!

## 2. “On This Day” Wallpaper
I already talked about Google Photos and how much I love it. As someone who worked for a couple of years on a gallery app, I admire the people in Google that are working on this product. They are doing a fantastic job both on the product side and on the technical side, plus — the UI is slick, elegant and straightforward.

That’s why ALL my photos are in Google Photos (and on a physical hard drive, just in case). Same for my wife.

So how cool would it be if every day, I could have different wallpaper, remind me something great from the past? I could get a photo of my wife and I and our two children (or a subset of this group) that was taken on the same day a couple of years ago and have a nice small moment every day. The app would change the wallpaper every day (or a couple of times a day if there are a couple of photos).

#### Why can’t I do it?

This idea actually came to me when Google announced the new Photos API a few months ago. I immediately started building an app and playing with the API to see what I can do.

The plan was to get all the different people shown in your library’s photos, just like Google Photos has when you start searching, then let you pick a couple of people that you want to get their photos. From there I would run every day and select the pictures with those people on specific dates.

Sounds relatively simple right?

That was until I figured out the API might give you some interface to [query photos with people](https://developers.google.com/photos/library/reference/rest/v1/mediaItems/search#ContentCategory) but doesn't give you an option to play with the actual people that are in the picture (that’s the difference between [face detection](https://en.wikipedia.org/wiki/Face_detection) and [face recognition](https://en.wikipedia.org/wiki/Facial_recognition_system)). On top of that, the team even said that they [wouldn’t support it](https://issuetracker.google.com/issues/80089805) in the future.

## 3. Words practice
As you probably notice d— English is not my native language. Therefore I’m using Google Translate a lot when I’m reading and don’t understand a specific word or when I’m writing and don’t know what is the right word is.

Google Translate is great because it’s available on all platforms — whether I’m writing a document on my desktop, reading an email on my Android phone or reading an article on my iPad. It also has a simple UI and useful features like the word’s full definition, frequency of each translation, synonyms and listening.

What if I could use Google to build an [Anki](https://en.wikipedia.org/wiki/Anki_%28software%29) app that would use [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) to help me learn and memorize the words I constantly forget. It could also help me enrich my vocabulary by suggesting new words related to what I usually use.


#### Why can’t I do it?

The only API Google provides here is to translate words. This is great, but this is not what I’m looking for. I’m looking to get my own data and usage on the app. There’s an [“history”](https://support.google.com/translate/answer/6142479) option in the web version, but it’s only valid for the specific session and not accessible via any API call. Another solution is to use the [“phrasebook”](https://support.google.com/translate/answer/6142480) feature and export it, but this means I need to manually star every translation and manually export my phrasebook every couple of weeks, a very tedious process that I wish to automate.

Yes, there’s always the option to write a translator app on my own, Google helps me with the API, but again — I’ll need to build and maintain(!) a multiplatform app with all the important features I described above.

This is not a rant
I’m not blaming Google for anything here. This is their product, they invested tons of man-years, brain cycles and money to come up with those amazing products and I understand why they don’t want other people to easily use the company’s massive work for their own good. But at the same time, I think this is a great opportunity for them to grow and attract new users. Maybe this wallpaper thing will encourage more people to put all their photos in Google, or if this words app existed — I would use Google Translate and only Google Translate.

I also understand those product managers that want to keep the options open and maybe add those features on Google products in the future, and thus not open APIs to other developers. It's much better than the alternative — to pull a Twitter on other developers and deprecate APIs out of nowhere, but I genuinely think those features are so small and not really in the core of the business, so I can’t see why it would even get near those products.

These are not billion dollar company ideas; if there were — I wouldn't put them here out in the open. And for me — the best case here is that Google would just add it somehow, but since I don’t see this happening, I would love to see them offer some options on top of what they already have. It doesn’t need to be specified in the ways I described above, but generally — shift the state of mind and think:

> “we’re building great products, how can the community can leverage it?”
