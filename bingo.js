/* =====================================================
   LBT LIVESTREAM BINGO GENERATOR
   =====================================================
   How this works, in plain terms:
   1. We keep a list ("array") of possible bingo squares below.
   2. When someone clicks the button, we shuffle that list randomly.
   3. We grab the first 24 squares from the shuffled list.
   4. We drop them into a 5x5 grid, with a FREE space dead center.
   5. We build that grid as HTML and stick it on the page.

   Nothing here talks to a server. Every click just re-shuffles
   this same list, right in the visitor's browser.
   ===================================================== */


/* -----------------------------------------------------
   1. EDIT THIS LIST before each stream.
   These are the possible bingo squares. You need AT LEAST 24
   (since one square is always the FREE space in the middle,
   24 + 1 free = 25 total squares in a 5x5 grid).

   Feel free to have more than 24 in this list — every time
   someone clicks "New Card," 24 are randomly picked from
   whatever is in here, so a bigger list = more variety
   between cards.
   ----------------------------------------------------- */
const bingoSquares = [
"Liz hiding in a box",
"Kelly hiding in a box",
"L&K stim sesh (Only counts if the other joins in)",
"Rewinding a part MORE than twice",
"Both mouth wide open for more than 5 seconds",
"Drink refill",
"“I need a breather”",
"Both lean in forwards towards the screen",
"L or K LOCKS IN instead of boxes",
"Panic pause",
"Liz gets up and paces the room",
"Liz telling Kelly to watch the screen",
"Stalling by looking at chat",
"Both girls off screen and zelda is the star of the show",
"Technology issues",
"Zelda digging in bed",
"Zelda getting mildly startled by the chaos",
"Liz spilling/ spitting out a drink",
"Full body nodding",
"Dominos On The Porch reference",
"Rewind during Tae ment because they were too busy looking at his face to listen to what he’s saying",
"Fall sideways laughing off camera",
"Getting teary eyed from overwhelm",
"Instead of forming coherent words, Kelly just makes a noise",
"Clenched fists, panicked scream",
"exiting to desktop screen",
"screen capture more than 3 times",
"Kelly putting her hands on her head",
"Pause + Rewind because they were looking at different members and both were too good to miss",
"Chat makes you rewind bc you missed something lol",
"Mods have to yell LIZ KELLY to get your attention",
"Someone makes up a new unit of time",
"Liz reminds you to get a blankey",
"Pause for Zelda break, chat gets tea",
"Liz complains about the length of the behind/extras",
"Impromptu therapy session"

];


/* -----------------------------------------------------
   2. SHUFFLE FUNCTION (Fisher-Yates shuffle)
   This is a standard, well-tested way to randomly shuffle
   an array. It works backwards through the list, and for
   each spot, swaps it with a random earlier (or same) spot.

   We copy the array first ([...array]) so we don't
   accidentally scramble the original bingoSquares list —
   we want that list to stay intact so we can shuffle it
   fresh every time someone clicks the button.
   ----------------------------------------------------- */
function shuffleArray(array) {
    const shuffled = [...array]; // copy, don't mutate the original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // swap shuffled[i] and shuffled[j]
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


/* -----------------------------------------------------
   3. BUILD ONE BINGO CARD
   - Shuffles the squares list
   - Takes the first 24
   - Inserts "FREE SPACE" at position 12 (dead center of a 5x5 grid,
     since a 5x5 grid has 25 cells, indexes 0-24, and the middle
     one is index 12)
   ----------------------------------------------------- */
function buildCardSquares() {
    if (bingoSquares.length < 24) {
        // Safety check: if you haven't added enough squares yet,
        // this tells you clearly in the console rather than just
        // breaking silently.
        console.warn(
            `bingoSquares only has ${bingoSquares.length} entries. ` +
            `You need at least 24 for a full card.`
        );
    }

    const shuffled = shuffleArray(bingoSquares);
    const chosen = shuffled.slice(0, 24); // grab first 24

    // Insert FREE SPACE at index 12 (the center of the grid)
    chosen.splice(12, 0, "FREE SPACE");

    return chosen; // now has 25 items total
}


/* -----------------------------------------------------
   4. RENDER THE CARD TO THE PAGE
   Clears out whatever card is currently showing, then
   builds 25 <div> squares and drops them into #bingoCard.
   ----------------------------------------------------- */
function renderCard() {
    const cardContainer = document.getElementById("bingoCard");
    const squares = buildCardSquares();

    // Clear any previous card
    cardContainer.innerHTML = "";

    squares.forEach((text, index) => {
        const square = document.createElement("div");
        square.classList.add("bingoSquare");

        if (text === "FREE SPACE") {
            square.classList.add("freeSpace");
        }

        square.textContent = text;
        cardContainer.appendChild(square);
    });
}


/* -----------------------------------------------------
   5. WIRE UP THE BUTTON
   When the page loads, find the button and tell it to
   call renderCard() every time it's clicked. Also render
   one card immediately so the page isn't empty on load.
   ----------------------------------------------------- */
document.getElementById("newCardBtn").addEventListener("click", renderCard);
renderCard();
