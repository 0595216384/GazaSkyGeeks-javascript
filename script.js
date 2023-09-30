const symbols = ['🌟', '🍎', '🍉', '🌸', '🎈', '🍒', '🚀', '🌈']; // Add more symbols as needed
const totalPairs = symbols.length;

const gameGrid = document.querySelector('.game-grid');
const restartButton = document.getElementById('restart-button');
let flippedCards = [];
let matchedPairs = 0;

// Shuffle the symbols array
const shuffledSymbols = symbols.concat(symbols).sort(() => Math.random() - 0.5);

// Create the game grid
for (let i = 0; i < totalPairs * 2; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = shuffledSymbols[i];
  card.textContent = '?';
  gameGrid.appendChild(card);

  // Add click event listener to each card
  card.addEventListener('click', flipCard);
}

// Function to handle card flipping
function flipCard() {
  const card = this;

  // Do nothing if the card is already flipped or two cards are already flipped
  if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

  card.textContent = card.dataset.symbol;
  card.classList.add('flipped');

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    // Check for a match
    if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
      matchedPairs++;
      flippedCards = [];

      // Check if all pairs are matched
      if (matchedPairs === totalPairs) {
        alert('You won!');
        restartGame();
      }
    } else {
      // If no match, flip cards back face-down after a delay
      setTimeout(() => {
        flippedCards.forEach((flippedCard) => {
          flippedCard.textContent = '?';
          flippedCard.classList.remove('flipped');
        });
        flippedCards = [];
      }, 1000);
    }
  }
}

// Function to restart the game
function restartGame() {
  flippedCards = [];
  matchedPairs = 0;

  // Flip all cards face-down and shuffle them
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.textContent = '?';
    card.classList.remove('flipped');
  });

  // Shuffle the symbols array and update card data
  shuffledSymbols.sort(() => Math.random() - 0.5);
  cards.forEach((card, index) => {
    card.dataset.symbol = shuffledSymbols[index];
  });
}

// Add event listener to restart button
restartButton.addEventListener('click', restartGame);
