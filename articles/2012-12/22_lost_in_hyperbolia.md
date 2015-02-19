---
layout: article
title: Lost in Hyperbolia
caption: ''
date: -1356196784

---

<p>Before I studied physics in college, I was captivated by two of the things physicists talk about: quantum indeterminacy and curved space-time.  I spent a lot of time thinking about what it might mean for a particle to be both here and there, and how something as insubstantial as space could be bent up and stitched together.  Even as I learned about these things rigorously, it irked me that I couldn't visualize them.

<p>Eventually, I came up with ways of visualizing these things that made sense of them without doing too much violence to the underlying formalism.  When I talk about curved space now, for instance, I'm imagining the contorted fabric of a pair of pants I once sewed, and how they couldn't lay flat.  I presented this explanation in <a href="../../../articles/2011-08/13_a_stitch_in_time/">a previous article on this website</a>, but the ``space-time as a sheet'' metaphor is an old one that might only be helpful after a course in Riemannian geometry and another in sewing.

<p>Computers have no trouble imagining curved spaces, and multitouch devices such as iPads let the user engage the computer's abstractions in a palpable way.  So I got to thinking, what if I write a program to directly interact with curved space?  This article presents the result of that tinkering: a hyperbolic portal that runs in your browser (no need to download anything), intended to give you a direct experience of spatial curvature.  <a href="https://github.com/jpivarski/hyperbolic-storage-space">The code is on GitHub</a>, and I'd love to see (and link to) anything that you might do with it.

<!-- more -->

<p><b>Stitching spaces</b>

<p>Every class I took to learn about curved spaces or general relativity gave me the impression that it's a super-advanced form of calculus, with lots of ``delta-epsilon'' proofs.  The key realization for me was that most of that complexity is just to deal with smoothness, the fact that even a simple straight line is an infinitude of infinitesimal points.  It's possible to think about curvature in a useful if mathematically imprecise way by sweeping all of the infinities under a very big rug.

<p>Imagine that space is a grid of pixels like the dots on a computer screen.  Space can contain matter in the same way that computer pixels contain color, or a part of the screen contains a button, a window, or a video game sprite.  We'll ignore the fact that pixels are not infinitely small and also the implications that would come from taking this discreteness too seriously.

<div class="figure right"><div class="figurerow">
<div><img src="pixels2.png"></div></div></div>

<p>All pixels, other than those along the edges of the screen, have four direct neighbors: north, west, south, and east.  Suppose we make a new computer screen that has five neighbors for each pixel: replace north with two new directions, ``ronth'' and ``ornth.''  If we made all pixels the same size, then the screen couldn't possibly be flat.  It would have to curl up to have some place to put all those extra pixels.  This is easier to see in <a href="http://www.theiff.org/oexhibits/05b.html">knitted fabrics,</a> since that's exactly how one knits a curved hat--- by adding a few extra stitches in each row.  But on a computer screen, things can <i>live</i> in the curved surface.

<p>Here is the connection between curved objects and curved spaces: the knitted hat has a shape determined by the way that equal-sized stitches are connected to each other, and a curved space is defined solely by the way that its pixels are connected to each other.  The phrase ``curved space'' does not imply that space is somehow rounded or can be viewed as round from some place outside of it.  A hat, however, needs to be inside the universe to be viewed.  You could argue that the word ``curvature'' shouldn't be applied to space for this reason: you could say that nineteenth century mathematicians took the concept of curvature from only one aspect of hats--- the way their stitches connect--- and applied it to something that has only this one aspect.  It wouldn't be an unreasonable argument.  But ``curvature'' is just a word, and we can define words however we like.  To make the distinction, mathematicians refer to the shape of an object in space as its <i>extrinsic curvature</i> and the pattern of stitched or pixel connections as its <i>intrinsic curvature.</i>  Hats have both kinds; spaces may have only intrinsic curvature.

<div class="figure right"><div class="figurerow">
<div><img src="map.png"></div>
</div><div class="caption"><p>A video game character living in tiles of cloth with the logical connections between them indicated by blue lines.</p></div>
</div>

<p>The consequences of replacing north with two new directions can be hard to visualize.  To see things better, let's zoom into the pixels and make them rooms of a vast video game dungeon.  The game character can go through the ronth door to get to a new room, then go east, then go south, and end up where he started.  In a traditional north-west-south-east arrangement, there's no way he could end up where he started by going through three doors.  Imagine playing a game like that: your hand-drawn map would probably be full of scribbles and corrections as you come to realize that space is not what you thought it was.

<p><b>Hyperbolic space</b>

<p>A video game with this arrangement of rooms is called a hyperbolic space.  We could connect the rooms in more complicated patterns to get more complicated spaces (``warp zones'' connect arbitrarily distant points in space, for instance), but let's not.  Hyperbolic, Euclidean, and spherical spaces are the three simplest ones.  Euclidean is the space you know intuitively, and spherical space is like the surface of a sphere.  The two-dimensional surface of the Earth could be considered a spherical space, as long as you don't include the dirt inside and the everything else outside.

<div class="figure inline"><div class="figurerow">
<div><img src="curly_dungeons.png" style="margin-right: 5px;"><img src="linktiles.png" style="margin-left: 5px;"></div>
</div><div class="caption"><p><b>Left:</b> the video game character's hyperbolic world in four rows of tiles, quilted together.  <b>Right:</b> what it would look like with infinitely many rows.</p></div>
</div>

<p>Now here's the live version, the one you can interact with.  You should see a large image below: click and drag it with the mouse, or drag it with your finger if you have a touchscreen device (iPad, smartphone, etc.).

<div style="margin: 10px;">
<iframe src="http://50.17.185.199:8080/HyperbolicStorage/dungeon.html" width="640" height="640" scrolling="no" seamless="yes" style="margin-left: auto; margin-right: auto; display: block;">Your browser doesn't support iframes, but you can view the demo <a href="http://50.17.185.199:8080/HyperbolicStorage/dungeon.html">here</a>.</iframe>
</div>

<p>This web application has the same kind of interactivity as <a href="http://earth.google.com/">Google Earth</a>: dragging scrolls, two-finger twists rotate, the mouse-wheel and two-finger pinches zoom.  Our hero lives in the room numbered zero-zero.  The others are labeled by row and column, and rows are necessarily curved to fit in all the extra rooms.

<p>The space is vast--- ``more infinite'' in a sense than an infinite Euclidean plane.  It's easy to get lost, even with the numbered rooms.  To keep your browser from overloading, the web server only sends a little data at a time, an idea borrowed from online maps.  The difference here is that maps present a large spherical space, and this presents a hyperbolic one.

<p>If you zoom all the way out, you'll see that the whole world appears as a circular disk.  This is because your computer screen is flat, and the hyperbolic plane needs to be projected to fit on it, just as a map of the world needs to project a sphere onto a flat piece of paper.  I chose the <a href="http://en.wikipedia.org/wiki/Poincare_disk">Poincar&eacute; disk</a> projection, which fits the hyper-infinite plane within a small circle.  As you scroll, pictures get increasingly distorted as they approach the edge of the circle.

<iframe src="http://50.17.185.199:8080/HyperbolicStorage/escher.html" width="420" height="420" scrolling="no" seamless="yes" style="float: right; margin: 20px; margin-right: 0px;">Your browser doesn't support iframes, but you can view the demo <a href="http://50.17.185.199:8080/HyperbolicStorage/escher.html">here</a>.</iframe>

<p>You may already be familiar with this projection, since it was one of <a href="http://en.wikipedia.org/wiki/M._C._Escher">M. C. Escher</a>'s favorites.  On the right is a browseable version of <i>Circle Limit III,</i> Escher's woodcut of hyperbolically interlocking fishes.

<p><i>Circle Limit</i> is a <a href="http://en.wikipedia.org/wiki/Uniform_tilings_in_hyperbolic_plane">uniform tiling of the hyperbolic plane</a>, more beautiful and intricate than my ronth-west-south-east-ornth squares.  In drawing this, I found that the pattern of fish is surprisingly complex: fitting them together was like trying to solve a Rubik's cube.  (I made some mistakes and gave up adding fishes a few layers from the center.)  I now have a more profound respect for Mr. Escher, who not only worked out the hyperbolic projection, but designed a non-trivial tessellation symmetry and carved it in wood.

<p><b>Size, distance, and straightness</b>

<p>Everything in the hyperbolic portal is distorted by a fish-eye lens, so objects are constantly changing their apparent sizes as they move.  This artifact of the projection might hide the fact that strange things are happening to the real sizes of objects in the hyperbolic world, independent of how they are presented on your screen.

<p>I have said that a hyperbolic plane is larger than a Euclidean plane, in spite of the fact that they're both infinite.  To be more precise, I could say that a one-inch diameter circle in hyperbolic space contains more area than a one-inch diameter circle in Euclidean space.  Instead of the usual ``area equals pi times radius squared'' relationship (<img alt="tex:A = \pi r^2">), the areas of circles in hyperbolic space grow exponentially with radius (<img alt="tex:A = 2\pi (\cosh r - 1)">).  Circumferences grow exponentially with radius, too.

<iframe src="http://50.17.185.199:8080/HyperbolicStorage/clock.html" width="420" height="420" scrolling="no" seamless="yes" style="float: right; margin: 20px; margin-right: 0px;">Your browser doesn't support iframes, but you can view the demo <a href="http://50.17.185.199:8080/HyperbolicStorage/clock.html">here</a>.</iframe>

<p>The hyperbolic clock on the right puts this feature to use.  The space is so large that it can comfortably number all of the hours, minutes, <i>and seconds</i> with only one hand.  Try scrolling to the end of the red clock hand to reveal the minutes and the seconds.

<p>The tick-marks and numbers labeling the minutes are all equidistant from the center of the clock, arranged to have enough space for all of the two-digit numbers--- there are 12 times 60 (720) of them.  The seconds are also equidistant from the center of the clock, and there are 43,200 seconds in the 12-hour cycle, individually labeled.

<p>In our normal Euclidean clocks, we have to use special tricks to convey minutes and seconds: we need additional hands that cycle around the face of the clock more quickly than the hour hand, and we must interpret the numbers differently for those hands.  This clock is simpler, though it is unfamiliar.

<p>We could make a clock like this in Euclidean space, with one hand representing hours, minutes, and seconds, but the seconds would have to be 60 times as far from the center as the minutes, or we'd have to draw them in a very small font.  (There's 60 times as many seconds as minutes, so the circumference of their circle must be 60 times longer to show them all.)  On the hyperbolic clock, the seconds are only a bit more than twice as far from the center as the minutes, and they're quite legible with the same-sized font.

<div class="figure right"><div class="figurerow">
<div><img src="earth-earth-earth-earth.jpg"></div></div></div>

<p>As you scroll along the hand of the clock, it appears to bend, especially if it gets off-center.  That is an artifact of the projection: the clock hand is straight in hyperbolic space.

<p>A straight line in a curved space requires a little explanation.  By ``straight,'' I mean that it is the shortest distance between its endpoints.  In a spherical space like the surface of the Earth, the shortest distance between two points is a great arc, the path that an airplane would take to get between two cities.  The screenshot on the right from Google Earth shows that the shortest flight between Fermilab and CERN goes over Quebec and Ireland, which is non-intuitive on a flat map.

<p><b>Curved space-time</b>

<div class="figure right"><div class="figurerow">
<div><img src="timedimension.png"></div>
</div><div class="caption"><p>Time as a dimension: on the left is a movie of a planet orbiting a sun and a moon orbiting the planet; on the right is a space-time representation of it.</p></div>
</div>

<p>Curved spaces are strange enough, but general relativity adds one more ingredient to the mix: space<i>-time</i> is curved.  That is, time is considered a dimension like space, and the whole four-dimensional array of space and time points is wired up like the ronth-west-south-east-ornth pixels.

<p>The figure on the right shows how a two-dimensional moving picture can be seen as a motionless three-dimensional block of space-time.  When you make time a direction, things don't move--- motion is just an angle, a direction.  This is not just a matter of presentation, either.  A duration of time has a physical length: one nanosecond is approximately equal to one foot (a third of a meter).  Since we perceive a nanosecond as a very short time and a foot as a reasonably large distance, we have a lopsided view of space-time, making it hard to realize that we're such long, stringy beings--- only six feet high but three quintillion nanoseconds (95 years) long.

<p>I'm committing a mathematical sin by suggesting that space and time are exactly interchangeable.  There's a minus sign in the relationship between them that affects the ways that they can be rotated, prohibiting faster-than-light travel and time travel (which are the same thing, because of this relationship).  I covered this topic a little better in <a href="../../../articles/2011-09/23_we_can_get_there_from_here/">an article on faster-than-light neutrinos</a>, but I've never found a way to describe both the effect of the minus sign and curvature in the same context, so I'll just focus on the curvature here.

<p>My favorite physics prop is the ``space-time cone'' shown below.  It's made of tiles stitched together like the hyperbolic dungeon, but now we're interpreting one direction as altitude and the other as time.  A video game character who likes to jump takes a shortcut through space-time by increasing his altitude for a little while.  This shortest path, or great arc, intersects the ground at a future point--- whenever you jump, curvature has the effect of putting you back on the ground, though it's the ground that swerves to meet you, not the other way around.  That's the whole idea of general relativity, that gravity is an illusion produced by the fact that space-time is curved.

<div class="figure inline"><div class="figurerow">
<div><img src="leap2.png"></div>
</div></div>

<p>Since this is such a great demo, I made a browsable version of it.  The hyperbolic portal below presents a leap through space-time that you can drag and rotate.  Just like the hand of the hyperbolic clock, the jumper's trajectory through the air is straight, <i>but only when he's in the air.</i>  On the ground, his trajectory is not straight, not the shortest distance between two points.  That's why gravity feels like a force: it is the ground rushing up at us, forcing us to take a rounded path through space-time, like a car turning abruptly at high speeds.

<div style="margin: 10px;">
<iframe src="http://50.17.185.199:8080/HyperbolicStorage/relativity.html" width="640" height="640" scrolling="no" seamless="yes" style="margin-left: auto; margin-right: auto; display: block;">Your browser doesn't support iframes, but you can view the demo <a href="http://50.17.185.199:8080/HyperbolicStorage/relativity.html">here</a>.</iframe>
</div>

<p><b>What kind of space do we live in?</b>

<p>Most of this article has been about math, rather than physics, because I've been talking about modifications to space that are conceivable, but may not be real.  The space we live in appears to be Euclidean--- that's why Euclidean geometry is so intuitive.  When nineteenth century mathematicians started thinking about the implications of curved spaces, Gauss attempted to measure the curvature of real space by triangulating three mountaintops in Germany.  The result was consistent with zero curvature, Euclidean space.

<p>But curvature is a relative thing: one space may be more curved than another, and curvature can be too small to measure with limited instruments.  If the dungeon man were so small that he could never walk to a neighboring room, he would never know that his space is curved.  If he were so large that the rooms are like pixels to him, the curvature would be very apparent.  What matters is the scale of curvature compared to our scale.

<div class="figure right"><div class="figurerow">
<div><img src="curvature_plot.png"></div>
</div><div class="caption"><p>Curvature of space (red) and space-time (blue) as a function of distance from a <a href="http://en.wikipedia.org/wiki/Black_hole">black hole</a>.  The switch from negative curvature (hyperbolic space) to positive curvature (spherical space) is the <a href="http://en.wikipedia.org/wiki/Event_horizon">event horizon</a>, from whose bourn no traveler returns.</p></div>
</div>

<p>Moreover, the amount of spatial curvature may be different in different places.  Real space can be hyperbolic in some places, flatten out to Euclidean in others, and be spherical in others.  General relativity claims that space-time is very slightly hyperbolic near massive bodies like the Earth, and more Euclidean far from them.  Close to extremely dense objects, such as black holes, the space gets very hyperbolic, then switches to spherical when you cross the point of no return.

<p>At sea level on Earth, the curvature is &minus;3.07&times;10<sup>&minus;31</sup> inverse meters-squared, which means that we lose 2.17&times;<sup>&minus;16</sup> meters of space (a stitch) for every meter we climb above sea level (row of stitches, knitting from the ground up).  Satellites in orbit lose a microsecond every 10 minutes compared to satellite dishes on the ground, and that difference is large enough to require corrections in the electronics.  The curvature of the space-time that we live in manifests itself as gravity, which we notice because we have such a foreshortened view of space-time, and in very distant, very precise electronics.  It's a hyperbolic world after all.

<p><b>Hyperbolic art and software</b>

<p>Although I made this hyperbolic portal to demonstrate the mathematics and physics of curved spaces, it may be useful in other projects.  Rather than hacking it together as a one-off demo, I developed the core functionality with readable, reusable code and put it on GitHub.  The project is called <a href="https://github.com/jpivarski/hyperbolic-storage-space">hyperbolic-storage-space</a> because of the expansive real estate that hyperbolic space provides.  Wouldn't it be cool if a file browser were rendered in hyperbolic space, so that the convenience of leaving all your files on the desktop wouldn't make you run out of places to put them?

<p>As I worked on it, I looked around for other projects like this one.  The idea of displaying data in a hyperbolic space (in the Poincar&eacute; disk projection, no less) goes back to a <a href="http://www.youtube.com/watch?v=pwpze3RF55o">1995 demo</a> and <a href="http://www.sigchi.org/chi95/Electronic/documnts/papers/jl_bdy.htm">paper</a> by Xerox.  They even described a server-client version to put in a webpage (``subject to the glacial interaction typical of the web...'').  However, all implementations that I could find, including modern ones, display only trees: words or pictures in boxes, connected by lines.  Computers are now capable of rendering rich hyperbolic graphics in real time.

<p>The GitHub repository has Javascript code for displaying vector-based graphics in a hyperbolic portal that you can pan, rotate, and zoom with a mouse or two-finger multitouch.  The graphics may be a static file (in a JSON-based format) or it may be served by a Java servlet (e.g. with <a href="http://tomcat.apache.org/">Tomcat</a>).  The servlet stores graphical elements in an embedded no-SQL database (<a href="http://code.google.com/p/babudb/">BabuDB</a>) so it can be scaled up to very large datasets, in the same way that online maps show the whole world a little at a time.

<p>I spent some effort optimizing for speed and numerical precision.  Although the images are vector-based, SVG was about ten times slower than an HTML5 canvas in several browsers, so I opted for the latter.  Coordinates in the hyperbolic plane are very sensitive to numerical error due to the rapid scaling with distance that I described above.  Instead of representing coordinates directly in the Poincar&eacute; disk, I found a new coordinate system in which the largest terms algebraically cancel in the transformations.  I tested infinite precision arithmetic (both on the Javascript side and the Java side), but there weren't enough gains in precision to justify the slower computations.  (Square roots are involved, so an approximation needs to be made at some level.)

<p>If you're an artist, a programmer, or you have some neat idea that you'd like to try, take a look at the code and let me know how it goes.  Merry Christmas and have a great holiday!
