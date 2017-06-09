---
layout: post
title: "Is there Room for one more?"
date: 2017-06-02 15:26:09 +0300
comments: true
categories: android
---
In the last Google I/O, Google announced a new [architecture components](https://developer.android.com/topic/libraries/architecture/index.html). One of them is Room.
Room is an (another) ORM solution for the Android developers. Combining with some other elements Google released (like LiveData, ViewModel, and Lifecycle Listeners)- basic app flows should be much simpler.
<!-- more -->
Indeed- Google did some nice work here. Straightforward tasks like displaying items from DB and update them was a pain, and you had to write a lot of code over and over. [Now you can just use those out-of-the-box components](https://medium.com/proandroiddev/clean-easy-new-how-to-architect-your-app-part-1-e439668a523d). This will save time for developers: you will write less code, and you will have fewer bugs.

When examine those components, I feel most of them bringing new things to the table. But about [Room](https://developer.android.com/topic/libraries/architecture/room.html)- is there a need for another ORM library?

## ORM?
Let's start from the beginning. For the ones that not familiar with, ORM stands for "Object Relational Mapping". That's a prettier way to let the developers works with persistent objects instead or tables rows.

That's mean that if I want to save all my users data in a database- I will work with the User object and the ORM layer will handle all the persistency stuff for me. Fun.

## Current solutions
This concept is not new, developers used that technique for a long time, and it was natural that Android developers will need this kind of thing too.

Soon enough we got a couple of 3rd libraries to handle it, just look on [AndroidArsenal page](https://android-arsenal.com/tag/69) and understand we're getting into crowded space here. The most popular ones are probably [ORMLite](http://ormlite.com/), [GreenDAO](http://greenrobot.org/greendao/) and [DbFlow](https://github.com/Raizlabs/DBFlow).

## Creating a Model
There are two main ways to define the mapping between your objects and the tables in Java: some DSL + code generator (like what GreenDAO is using), or using annotation (like ORMLite, DBFlow and most of the libraries). Although I'm not a big fan of annotations, I must say the later is an easier solution.

These why it's no surprise that the Android team chose to go with this approach, so simple data model looks like this:
```java
@Entity
public class User {
    @PrimaryKey
    private int uid;

    @ColumnInfo(name = "first_name")
    private String firstName;

    @ColumnInfo(name = "last_name")
    private String lastName;

    // Getters and setters are ignored for brevity,
    // but they're required for Room to work.
    // (So please go and switch to Kotlin)
}
```
As in any other library- you can set a custom name for the table or the columns, you can choose to index some stuff and specify relationships between models.

## The API
To interact with the data models, we use DAO- data access object. So nothing new from Google here also. For each model, we need to declare a DAO with CRUD operations. Every library covers the main functionality and offers kind of the same sets of features.

BUT while most of the ORM libraries using some in-code query builder, Room doing something nice and let you declare your queries in slick SQL formatting.

For example, here is how you'll do a simple query for specific users in each one of the platforms:
```java
    //Room:
    @Query("SELECT * FROM user WHERE age > :minAge")
    public User[] loadAllUsersOlderThan(int minAge);

    //DbFlow:
    List<User> users = SQLite.select()
                             .from(User.class)
                             .where(User_Table.age.greaterThan(minAge)
                             .queryList();

    //ORMLite:
    List<User> users = userDao.queryBuilder()
                              .where()
                              .gt("age", minAge)
                              .query();
    //GreenDAO:
    List<User> users = userDao.queryBuilder()
                              .where(Properties.Age.gt(minAge))
                              .list();
```
On the one hand- it's cleaner and most of us familiar with SQL syntax, but on the contrary, you're losing some of the power of your object mapping (no autocomplete, and you need to remember the object's table).

## Performance
Reading and writing to the database is an expensive IO operation. If you're working with lots of entities in your app, it might be a bottleneck.
That's why GreenDAO and DbFlow are heavily investing in performance ([it might even get ugly some times](https://github.com/Raizlabs/AndroidDatabaseLibraryComparison/issues/16)).

I decided to check how Room performs in relation to the others, so I take the GreenDAO benchmark (I looked on [Raizlabs benchmark](https://github.com/Raizlabs/AndroidDatabaseLibraryComparison) too, but I felt it's too biased), and added Room. You can see the source code [here](https://github.com/greenrobot/android-database-performance/pull/19).

I compared the results to the libraries discussed in the post. I ran all tests on an emulator and took the average of each library results (I'll attach the full results of each library, so you'll able to take a closer look).

{% img center /images/posts/room/chart_1.png %}
{% img center /images/posts/room/chart_2.png %}
{% img center /images/posts/room/chart_3.png %}
{% img center /images/posts/room/chart_4.png %}

It is a simple, fast setup benchmark, and I didn't analyze the results too much. From first looking at the results- you can see that Room has no advantage in any aspect of performance over the other libs. While making small operations one by one- ORMLite has it's own advantages, when moving the bigger scales- DBFlow and GreenDAO obviously win (because the caching they use).

## Summary
Google did a fantastic job by taking a step forward to help developers architect their apps better. The last components that Google introduced are right in place and should help each one of us write better code in less time.

BUT, choosing to deliver _another_ ORM solution, with no added value (unless I'm missing something here), is something that I do not understand. I would expect that the team will take an existing solution that works, or even just recommend one ([like what they are doing with Retrofit](https://developer.android.com/topic/libraries/architecture/guide.html#fetching_data)).

---

*If you liked this post click the ♡ bellow and share this story. As a writer it means the world.*

---
_Full reports:_<br>
_[PerfTestDbFlow-1by1.tsv](/files/posts/room/PerfTestDbFlow-1by1.tsv)_<br>
_[PerfTestDbFlow-batch.tsv](/files/posts/room/PerfTestDbFlow-batch.tsv)_<br>
_[PerfTestNotNull-1by1.tsv (GreenDAO)](/files/posts/room/PerfTestNotNull-1by1.tsv)_<br>
_[PerfTestNotNull-batch.tsv (GreenDAO)](/files/posts/room/PerfTestNotNull-batch.tsv)_<br>
_[PerfTestOrmLite-1by1.tsv](/files/posts/room/PerfTestOrmLite-1by1.tsv)_<br>
_[PerfTestOrmLite-batch.tsv](/files/posts/room/PerfTestOrmLite-batch.tsv)_<br>
_[PerfTestRoom-1by1.tsv](/files/posts/room/PerfTestRoom-1by1.tsv)_<br>
_[PerfTestRoom-batch.tsv](/files/posts/room/PerfTestRoom-batch.tsv)_<br>
