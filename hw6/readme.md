# AI Reflection

I used AI to create an alternative version of this assignment. It made a super efficient script and completed the assignment in a more concise manner. I will say that I learned about "bogosort logic" which I had never heard of, but I 100% have in my code. haha.

I also ran into a bug that I could not figure out for the life of me. I had an infinite loop that crashed my browser and I didn't know why it was executing endlessly. It returned this:

~~~
The infinite loop in your code is caused by a "ghost" value in your used_random_numbers array.
The Culprit: "" (Empty Strings)

At the very beginning of your function, you fill used_random_numbers with empty strings:
JavaScript

used_random_numbers.push("")

In JavaScript, when you compare a number to an empty string using == (loose equality), it evaluates to 0.

    0 == "" is true.

    0 == 0 is true.
~~~

Because I was populating one of my arrays with empty strings I assumed that the 0 == "" would be false, as it is in most programming languages. I was wrong... Thankfully, it recommended I change my "" to null value which would correctly compare.