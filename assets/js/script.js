const inputEl = document.querySelector('#input'),
  infoTextEl = document.querySelector('#info-text'),
  meaningContainerEl = document.querySelector('#meaning-container'),
  titleEl = document.getElementById('title'),
  meaningEl = document.getElementById('meaning'),
  audioEl = document.getElementById('audio')

async function fetchAPI(word){

    try {


        meaningContainerEl.style.display = 'none'  
        infoTextEl.style.display = 'block'    
        infoTextEl.innerText = `Searching for the meaning of "${word}"`

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result = await fetch(url).then((res) => res.json())

    if(result.title){
        infoTextEl.style.display = 'none'  
        meaningContainerEl.style.display = 'block'
        titleEl.innerText = word
        meaningEl.innerText = 'N/A'
        audioEl.style.display = 'none'
        
    }else{
        infoTextEl.style.display = 'none'   
        meaningContainerEl.style.display = 'block' 
        audioEl.style.display = 'inline-flex'
        titleEl.innerText = result[0].word
        meaningEl.innerText = result[0].meanings[0].definitions[0].definition
        audioEl.src = result[0].phonetics[0].audio

    }
    
    } catch (error) {
        
        infoTextEl.innerText = 'Check your internet or an error happened try again later'

        
        
    }
    // console.log(word);
    
}

inputEl.addEventListener('keyup',(e)=>{
//    console.log(e.target.value)
if(e.target.value && e.key === 'Enter'){
  fetchAPI(e.target.value)
}
})