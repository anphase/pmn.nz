---
layout: post
post_class: post-illustrated
title: "The Long Game: Old Ideas, New Capabilities"
date: 2026-09-20 09:00:00 +1200
categories: projects
description: "Twelve years after the first notes for Selfime, AI helped me turn an old idea into something useful. There was still plenty of work in between."
excerpt: "About 12 years ago, I registered selfime.com. It finally became something quite different from the notes app I had in mind: a meditation app built around your own voice."
image: /assets/images/posts/selfime/phone-experience.png
---

About 12 years ago now, I registered the domain [selfime.com](https://selfime.com/) and secured the Twitter handle, [@selfime](https://x.com/selfime), and all. My idea was to create an app for my notes: self - I - me. It even earned [a place on my fails page]({{ '/fails/#selfime' | relative_url }}).

<div class="post-figure-pair">
  <figure class="post-figure">
    <a href="{{ '/assets/images/posts/selfime/twitter-2014.png' | relative_url }}">
      <img src="{{ '/assets/images/posts/selfime/twitter-2014.png' | relative_url }}" alt="Selfime's X profile showing a join date of January 2014." width="669" height="462" decoding="async">
    </a>
    <figcaption>The name has been waiting a while. Joined January 2014.</figcaption>
  </figure>
  <figure class="post-figure">
    <a href="{{ '/assets/images/posts/selfime/notes-2014.png' | relative_url }}">
      <img src="{{ '/assets/images/posts/selfime/notes-2014.png' | relative_url }}" alt="Apple Notes entry titled Selfime development notes, dated 10 February 2014, describing short, focused notes." width="597" height="304" decoding="async">
    </a>
    <figcaption>My original development notes, dated 10 February 2014.</figcaption>
  </figure>
</div>

My Apple Notes describe a lot of ideas that have ended up in other, more focused projects I've worked on: [annet.ai](https://annet.ai/), [poreover.xyz](https://poreover.xyz/) and [writingread.com](https://writingread.com/), and the like. Unsurprisingly, these too were old ideas that have recently come to life through the power of - you guessed it - AI.

The biggest constraint for me, and for a lot of people working on side projects, is time. Time to make the thing in your head *be*.

There's a saying in filmmaking about the movie you write, the one you shoot and the one you cut. They can turn out quite differently! I find something similar with projects, pre- and post-AI. There's the idea, the work of building the thing, and then the final product that people get to experience. As creators - and I think everyone is a creator in one way or another - we always want to close that gap. Make the idea in your head the thing that's out there.

Reality, of course, is messy. There are heaps of considerations: the capability of people and systems, the cost to build and run the thing, time constraints, the competitive environment, and, even with all that, feedback from actually using it. Your own feedback and other people's.

AI has certainly bridged *some* of that, but not all. There are always trade-offs to be made. AI itself can cost a lot to run; there's no free lunch. Some things still need to be hosted somewhere. Support may still need a person in the loop, and someone still has to be accountable for what happens. AI doesn't always get it right. At times, it's way off.

I built Selfime this time around to solve another problem I had. I wanted to record my own guided meditations from a few books I was reading. The specific requirement - the core of the thing - was to record meditations in your own voice. For you, by you. I figured Selfime would be ideal for this.

Part of that is sitting through the discomfort of it all. The feedback I got from places I posted ([r/IMadeThis](https://www.reddit.com/r/IMadeThis/comments/1wcdaga/i_made_a_cassettestyle_app_for_recording/), [r/ProductHunters](https://www.reddit.com/r/ProductHunters/comments/1wcdu17/selfime_is_on_product_hunt_guided_practices/), etc.) and IRL was that people don't like hearing their own voice. So the core of the product is something people might struggle to do, and, if they do it, something they might not want to hear.

I understood this going in, so I made a few decisions to make it more inviting. The first thing you'll see is the look and feel: a retro cassette recorder with colourful tapes you can customise, spinning reels and buttons that behave like the real thing.

AI gave me the time to work on the finer details that make the user experience better. With the boilerplate things taken care of - recording audio from the microphone, playing it back, etc. - I could spend more time on the design. Working from measured cassette dimensions, refining the animations, getting the slack on the tape right when it isn't playing. Writing and refining meditations, tuning performance, and hundreds of other decisions and refinements.

<figure class="post-figure">
  <a href="{{ '/assets/images/posts/selfime/phone-experience.png' | relative_url }}">
    <img src="{{ '/assets/images/posts/selfime/phone-experience.png' | relative_url }}" alt="Five Selfime phone screens showing a colourful cassette, the app lock, segmented recording, read-along playback and a breathing exercise." width="1132" height="465" loading="lazy" decoding="async">
  </a>
  <figcaption>Selfime on a phone: record a tape, listen back, or just breathe. Select an image to see it at full size.</figcaption>
</figure>

Not everyone will have something ready to record, so I added more than 50 scripts. You can record them, or your own, in short segments with pauses in between. If you'd prefer to listen or read along, there are recordings of the built-in meditations too. Recording in your own voice is still at the heart of it, but there are other ways in.

Another neat thing I added is the ability to share a recording with someone close, as a gift, complete with its script and tape design. Making a recording takes deliberate effort. I like the thought that hearing a familiar voice might feel grounding too, perhaps even more than hearing your own.

Your recordings and scripts stay on your device unless you choose to back them up, export or share them. I don't receive a copy. The [privacy policy](https://selfime.com/privacy/) has the details. I also spent a good amount of time making the experience work well across Android, iOS, phones and tablets.

<figure class="post-figure">
  <a href="{{ '/assets/images/posts/selfime/tablet-experience.png' | relative_url }}">
    <img src="{{ '/assets/images/posts/selfime/tablet-experience.png' | relative_url }}" alt="Three Selfime tablet screens showing the tape library, recording workspace, and tape editor with colours, scripts and pauses." width="1128" height="499" loading="lazy" decoding="async">
  </a>
  <figcaption>The tablet experience gives the tape library, recorder and editor more room.</figcaption>
</figure>

So I had fun building it. It took way longer than I expected, but I find it useful. And I think other people will find it useful too. I'll keep getting and accepting feedback.

I think there are several bars here. The first should be whether it's useful for you. Right off the bat, Selfime is useful to me, so if it goes nowhere, that's perfectly fine. It's good enough for me.

Then there's expanding that to be good enough, or at least useful, for other people. That's nice too. Maybe it saves someone time, so they can build something else that's different.

I love that so many niche ideas are coming to life, mine and so many others. I'm also finding that making something good and worthwhile *still* takes a good amount of time and effort.

I'm drawn to Wolfram's idea of [computational irreducibility](https://www.stephenwolfram.com/publications/introduction-to-a-new-kind-of-science/): some computational processes can't be shortcut; you have to work through them to find out what happens. By analogy, I wonder if there's something like an irreducibility of taste. Some decisions only become clear through building, using and refining the thing. Things just take time, and perhaps AI can't - or we won't let it - close the gap every time for certain things we care about.

With Selfime and the feedback I've received, I still have everything I wanted, but better and more useful for me and other people.
