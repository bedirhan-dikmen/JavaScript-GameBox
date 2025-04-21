// Oyun değişkenleri
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;
const maxAttempts = 10;
let gameOver = false;

// DOM elementleri
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attempts = document.getElementById('attempts');
const previousGuesses = document.getElementById('previousGuesses');
const restartButton = document.getElementById('restartButton');

// Tahmin butonu click eventi
guessButton.addEventListener('click', checkGuess);

// Enter tuşu ile tahmin gönderme
guessInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

// Yeniden başlat butonu
restartButton.addEventListener('click', restartGame);

// Tahmin kontrol fonksiyonu
function checkGuess() {
    if (gameOver) return;

    const userGuess = Number(guessInput.value);

    // Geçerli bir sayı girilmiş mi kontrolü
    if (isNaN(userGuess)) {
        message.textContent = 'Lütfen geçerli bir sayı girin!';
        message.className = 'high';
        return;
    }

    if (userGuess < 1 || userGuess > 100) {
        message.textContent = 'Lütfen 1 ile 100 arasında bir sayı girin!';
        message.className = 'high';
        return;
    }

    guessCount++;
    attempts.textContent = `Deneme: ${guessCount}/${maxAttempts}`;

    // Önceki tahminleri güncelle
    previousGuesses.textContent += `${userGuess} `;

    // Tahmini kontrol et
    if (userGuess === randomNumber) {
        endGame(true);
    } else if (guessCount >= maxAttempts) {
        endGame(false);
    } else {
        giveHint(userGuess);
    }

    // Input'u temizle
    guessInput.value = '';
    guessInput.focus();
}

// İpucu verme fonksiyonu
function giveHint(guess) {
    if (guess > randomNumber) {
        message.textContent = 'Çok yüksek! Daha küçük bir sayı dene.';
        message.className = 'high';
    } else {
        message.textContent = 'Çok düşük! Daha büyük bir sayı dene.';
        message.className = 'low';
    }
}

// Oyunu bitirme fonksiyonu
function endGame(isWin) {
    gameOver = true;
    guessInput.disabled = true;
    guessButton.disabled = true;

    if (isWin) {
        message.textContent = `Tebrikler! ${randomNumber} sayısını ${guessCount} denemede buldunuz!`;
        message.className = 'correct';
    } else {
        message.textContent = `Üzgünüm, hakkınız bitti. Doğru sayı ${randomNumber} idi.`;
        message.className = 'high';
    }

    restartButton.style.display = 'block';
}

// Oyunu yeniden başlatma fonksiyonu
function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    gameOver = false;

    guessInput.disabled = false;
    guessButton.disabled = false;
    guessInput.value = '';
    guessInput.focus();

    message.textContent = '';
    message.className = '';
    attempts.textContent = 'Deneme: 0';
    previousGuesses.textContent = 'Önceki Tahminler: ';

    restartButton.style.display = 'none';
}

