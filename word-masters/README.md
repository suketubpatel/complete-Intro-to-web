You and I are going to recreate the well known word game Wordle. If you're not familiar with Wordle (which we'll call Word Masters), here's how you play

![plot](../word-masters/images/demo.png)

There is a secret five letter word chosen

Players have six guesses to figure out the secret word. After six guesses, they lose

If the player guesses a letter that is in the right place, it is shown as green

If the player guesses a letter that is in the word but not in the right place, it is shown as yellow

It does account for however many of the letter exist in the word. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not.

If the player guesses the right word, the player wins and the game is over.