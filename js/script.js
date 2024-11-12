const RANDOM_QUOTE_API_URL = "https://quotes-api-self.vercel.app/quote";
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
let timerInterval; // To clear the interval later

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    // Compare the input with the quote
    arrayQuote.forEach((characterSpan, idx) => {
        const character = arrayValue[idx];
        if (character == null) {
            characterSpan.classList.remove('correct', 'incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });

    // If the entire quote is typed correctly, load a new quote
    if (correct) renderNewQuote();
});

async function getRandomQuote() {
    const response = await fetch(RANDOM_QUOTE_API_URL);
    const data = await response.json();
    console.log(typeof(data))
    const parsedData = data.quote;
    return parsedData;  // Access the quote text
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = ''; // Clear previous quote
    quote.split('').forEach(letter => {
        const letterSpan = document.createElement('span');
        letterSpan.innerText = letter;
        quoteDisplayElement.appendChild(letterSpan);
    });
    quoteInputElement.value = null; // Reset input field
    startTimer();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval); // Clear any previous interval
    timerElement.innerText = 0;
    startTime = new Date();
    timerInterval = setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote(); // Initialize the first quote