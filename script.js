//Using Forismatic Rest API: https://forismatic.com/en/api/
//Does not require key to use

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

//Show Loading
function showLoadingSpinner(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}
//Hide Loading
function showLoadingSpinner(){
    if (!loader.hidden)
    {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}
//Get Quote From API
async function getQuote()
{
    showLoadingSpinner();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    //This is where the quote for the app is coming from
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try
    {
        //Getting the quote from the API
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //Assigning API text to html
        //Checking that there is a text
        authorText.innerText = (data.quoteAuthor !== '')?data.quoteAuthor:"Unknown";

        //Reduce font size for long quotes
        (data.quoteText.length>120)?quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');

        quoteText.innerText = data.quoteText;

        //Stop Loader Show Quote
        showLoadingSpinner();

    } catch (error)
    {
        //This kind of sucks. We can get in a infinite loop and never actually load a quote
        //TODO:Worth adding a counter possibly to not continue getting quote on errors
        await getQuote();
    }
}

//Tweet Quote
function tweetQuote() {
    const quoteElement = quoteText.innerText;
    const authorElement = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteElement} -${authorElement}`;
    //opens a new tab using the url we created above
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote)
//On Load
getQuote();
