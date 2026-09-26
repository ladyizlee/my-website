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
    "Someone says 'bias wrecker'",
    "Chat spams an emote train",
    "A member's name gets mispronounced",
    "Someone brings up a comeback teaser",
    "A dance break happens mid-conversation",
    "Someone mentions a concert memory",
    "A pet walks on screen",
    "Someone forgets what they were saying",
    "Chat asks 'when is the next video'",
    "A group photo gets shown",
    "Someone laughs so hard they can't talk",
    "A member's birthday gets mentioned",
    "Someone says 'let's box that'",
    "A tech issue happens (audio/video glitch)",
    "Someone references a fan theory",
    "A snack appears on stream",
    "Chat asks about Patreon",
    "Someone mentions a fancam",
    "A lightstick or merch item shows up",
    "Someone quotes a lyric",
    "A stream shoutout to another fan account",
    "Someone says 'I wasn't ready for that'",
    "A member's solo era gets discussed",
    "Someone loses their train of thought completely",
    "Chat floods with the same reaction gif/emote",
    "Someone mentions rewatching an old episode",
    "A 'plot twist' moment in the discussion",
    "Someone says 'don't @ me but...'"
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
