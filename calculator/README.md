Project time!

We are going to rebuild the calculator on iOS! If you've never seen that before, here it is:

![plot](../calculator/imges/calculator-img.png)

My implementation of it is embedded here on the page so feel free to play with it.

Let's going over the requirements:

The calculator should look like the above image.

The calculator should function like a normal calculator.

Do not implement % or .. You can assume everything will be an integer.

C means clear. When a user clicks it, it should clear everything and go back to the first state it was in when the page loaded.

Doing the back arrow is extra credit. It's like pressing backspace; it'll delete the last character typed. If it's clicked when there's only one digit, it sets the current number to be 0.

Don't worry about if the number is too long for the screen.

Calculators tend to have some special behavior when you hit equals: if you type another number it erases the results and starts over. Feel free to do that but also free free (like me) to just treat it normally and make the user hit C if they want to clear it. Let's keep it simple.