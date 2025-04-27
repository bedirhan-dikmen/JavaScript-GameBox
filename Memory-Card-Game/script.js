const fruits = ['🍎', '🍋', '🍊', '🍓', '🍐', '🍇', '🍒', '🍉'];
let cards = [...fruits, ...fruits]; // Çift yapıyoruz

// Kartları karıştır
cards.sort(() => 0.5 - Math.random());

const board = document.getElementById('game-board');
let firstCard, secondCard;
let lockBoard = false;

// Kartları oluştur
cards.forEach(fruit => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front"></div>
        <div class="back">${fruit}</div>
    `;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
});

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.querySelector('.back').innerHTML === secondCard.querySelector('.back').innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
