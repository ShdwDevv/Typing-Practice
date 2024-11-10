// const RANDOM_QUOTE_API_URL = "https://zenquotes.io/api/random"
const RANDOM_QUOTE_API_URL = "https://api.allorigins.win/get?url=https://zenquotes.io/api/random";
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
quoteInputElement.addEventListener('input',()=>{
    console.log("Changing");  
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((characterSpan,idx)=>{
        const character = arrayValue[idx];
        if(character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        }else if(character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else{
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false;
        }
    });
    if(correct) renderNewQuote();
});

async function getRandomQuote(){
    const word = await fetch(RANDOM_QUOTE_API_URL);
    const data = await word.json();
    const parsedData = JSON.parse(data.contents);
    return parsedData[0].q;
}
async function renderNewQuote (){
    quoteDisplayElement.innerText = '';
    const quote = await getRandomQuote();
    quote.split('').forEach((letter) => {
        const letterSpan = document.createElement('span');
        letterSpan.innerText = letter;
        quoteDisplayElement.appendChild(letterSpan);
    });
    quoteInputElement.value = null ; 
    startTimer();
}
renderNewQuote();
let startTime;
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000);
}
function getTimerTime(){
    return Math.floor((new Date - startTime) / 1000);
}