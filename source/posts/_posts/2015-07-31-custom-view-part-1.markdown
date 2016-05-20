---
author: smagnezi8
comments: true
date: 2015-07-31 12:40:17+00:00
layout: post
link: https://shem8.wordpress.com/2015/07/31/custom-view-part-1/
slug: custom-view-part-1
title: Custom view- Part 1
wordpress_id: 43
categories:
- android
post_format:
- Aside
tags:
- android
- androiddev
- customview
- guides
---

Until couple of months ago I've been a bit afraid writing custom views. I thought it's too complicated and had a lot of overhead with handling all layouting and interactions, I felt there is not enough documentation out there, not mention the edge cases and performance. I had my default Android view component in my toolbox and thought that everything I needed can be composed from those.

The last part is true for most cases. Most of Android apps can be built only with the basic layouts and views out there, so why do we still need to build custom views sometimes?



	
  1. Performance- especially for very complicated views in a list. For this I would recommend you to read the great post by the legendary Lucas Rocha: [Custom Layouts on Android](http://lucasr.org/2014/05/12/custom-layouts-on-android/)

	
  2. Unique looking views with some specific ui, drawing, interactions or animation.


This post (and the later one) will focus on the 2nd point, we'll try to build some custom tab indicator that eventually look will like this:![step3](https://shem8.files.wordpress.com/2015/07/step35.gif)

So ennough talking, lets get into code


# 0. Setup


We'll create a simple application with pager and our pager indicator (that for now just will be an empty view):

activity_main.xml:

[code language="xml"]
&lt;LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"&gt;

    &lt;android.support.v4.view.ViewPager
        android:id="@+id/pager"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"/&gt;

    &lt;shem.customviewpager.PagerIndicatorView
        android:id="@+id/indicator"
        android:layout_width="match_parent"
        android:layout_height="50dp" /&gt;
&lt;/LinearLayout&gt;
[/code]

MainActivity.java:

[code language="java"]
public class MainActivity extends AppCompatActivity {

	private ViewPager mPager;
	private PagerAdapter mPagerAdapter;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		final PagerIndicatorView indicator = (PagerIndicatorView) findViewById(R.id.indicator);
		mPager = (ViewPager) findViewById(R.id.pager);
		mPagerAdapter = new ScreenSlidePagerAdapter(getSupportFragmentManager());
		mPager.setAdapter(mPagerAdapter);
	}

	private class ScreenSlidePagerAdapter extends FragmentStatePagerAdapter {
		public ScreenSlidePagerAdapter(FragmentManager fm) {
			super(fm);
		}

		@Override
		public Fragment getItem(int position) {
			return TextFragment.newInstance(position + "");
		}

		@Override
		public int getCount() {
			return 4;
		}
	}
}
[/code]

TextFragment.java:

[code language="java"]
public class TextFragment extends Fragment {
        private static final String TEXT_KEY = "TEXT";

    public static TextFragment newInstance(String text) {
        TextFragment f = new TextFragment();
        Bundle arg = new Bundle();
        arg.putString(TEXT_KEY, text);
        f.setArguments(arg);
        return f;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.text_fragment, container, false);
        String text = getArguments().getString(TEXT_KEY);
        ((TextView)view.findViewById(R.id.textView)).setText(text);
        return view;
    }
}
[/code]

PagerIndicatorView.java:

[code language="java"]
public class PagerIndicatorView extends View {

    public PagerIndicatorView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public void init() {
        //Gonna init things for view here soon
    }
}
[/code]



# 1. Simple indicator


Lets start with putting some indication in the view about where we are in the pager.

So first we gonna create the Paint object that gonna be used for drawing, we'll use a simple solid color for now. We pre create it in the init method because it prefer no to allocate object in the onDraw method, because it gonna be called a lot.

[code language="java"]
    public void init() {
        paint = new Paint();
        paint.setColor(Color.LTGRAY);
    }
[/code]

Now we about to draw the indicator in the right place in the view, remember that we're using a 4 items in the pager- so the width should be 1/4 of the canvas width:

[code language="java"]
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawRect((index) * canvas.getWidth() / 4, 0, (1 + index) * canvas.getWidth() / 4, canvas.getHeight(), paint);
    }
[/code]

Now we just need to update the view index and redraw it every time pager is changing:

In PagerIndicatorView:

[code language="java"]
    public void setProgress(int index) {
        this.index = index;
        invalidate();
    }
[/code]

In MainActivity:

[code language="java"]
    mPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
                indicator.setProgress(position);
            }
        });
[/code]

![step1](https://shem8.files.wordpress.com/2015/07/step15.gif)


# 2. Make it smooth


So the indication works great but it just jump when we move from page to page, we would like it to be more smooth and indicate the real position when we move.
For this we need to pass the position offset when the page scrolled and change a bit the calculation when drawing:

[code language="java"]
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.drawRect((index + prec) * canvas.getWidth() / 4, 0, (1 + index + prec) * canvas.getWidth() / 4, canvas.getHeight(), paint);
    }

    public void setProgress(int index, float prec) {
        this.index = index;
        this.prec = prec;
        invalidate();
    }
[/code]



# ![step2](https://shem8.files.wordpress.com/2015/07/step25.gif)




# 3. Bring it to life


So now the view works well but it looks a bit boring, how about making it a bit more colorful?
Let start by setting 4 colors- one for each tab:

[code language="java"]
        colors = new int[] {Color.parseColor("#FFD600"),
                Color.parseColor("#FF6D00"),
                Color.parseColor("#0091EA"),
                Color.parseColor("#64DD17")};
[/code]

Now we need to get the right color to set when moving from color to color, for this we have a utiliy method that can calculate the right color while moving:

[code language="java"]

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        paint.setColor(evaluateColor(prec, colors[index], colors[Math.min(index + 1, colors.length - 1)]));
        canvas.drawRect((index + prec) * canvas.getWidth() / 4, 0, (1 + index + prec) * canvas.getWidth() / 4, canvas.getHeight(), paint);
    }

    public static int evaluateColor(float fraction, int startInt, int endInt) {
        int startA = (startInt &gt;&gt; 24) & 0xff;
        int startR = (startInt &gt;&gt; 16) & 0xff;
        int startG = (startInt &gt;&gt; 8) & 0xff;
        int startB = startInt & 0xff;

        int endA = (endInt &gt;&gt; 24) & 0xff;
        int endR = (endInt &gt;&gt; 16) & 0xff;
        int endG = (endInt &gt;&gt; 8) & 0xff;
        int endB = endInt & 0xff;

        return (int)((startA + (int)(fraction * (endA - startA))) && 24) |
                (int)((startR + (int)(fraction * (endR - startR))) && 16) |
                (int)((startG + (int)(fraction * (endG - startG))) && 8) |
                (int)((startB + (int)(fraction * (endB - startB))));
    }
[/code]

![step3](https://shem8.files.wordpress.com/2015/07/step35.gif)

That's it, look like we have some nice looking indicator, in the [next post](https://shem8.wordpress.com/2015/08/06/custom-view-part-2/) we'll add some sub views with tab titles, so stay tuned =)
