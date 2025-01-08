//Setting Game Name 
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Nada`;

// setting game options 
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 3;

// words 
let wordGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Letter", "School"];
wordGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message")
 // manage Hints 

 document.querySelector(".hint span").innerHTML = numberOfHints;
 const HintBtn = document.querySelector(".hint");
 HintBtn.addEventListener("click", getHint);


function generateInputs(){
    const inputsContainer = document.querySelector(".inputs");
    for( let i = 1; i<= numberOfTries; i++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;
           
        if (i!==1){
            tryDiv.classList.add("disabled-inputs");
        }
        // create inputs
       for(let j = 1; j <= numberOfLetters; j++){
        const input = document.createElement("input");
        input.type = "text";
        input.id = `guess-${i}-letter-${j}`;
        input.setAttribute("maxlength" , 1)
        tryDiv.appendChild(input);

       }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    const inputsIndisbaledDiv = document.querySelectorAll(".disabled-inputs input")
    inputsIndisbaledDiv.forEach((input) => (input.disabled = true));
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index) =>{
        input.addEventListener("input" , function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) {
                nextInput.focus()
                
            }
        });
        input.addEventListener("keydown" , function(e){
         const currentIndex = Array.from(inputs).indexOf(e.target)
         if (e.key === "ArrowRight") {
            const nextInput = currentIndex + 1 ;
            if(nextInput < inputs.length) inputs[nextInput].focus();
         }
         if (e.key === "ArrowLeft") {
            const previousInput = currentIndex - 1 ;
            if(previousInput >= 0) inputs[previousInput].focus();
         }
        });
        
    })
}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);
console.log(wordGuess)

 function handleGuesses(){
    let successGuess = true;
    for(let i = 1 ; i<= numberOfLetters ; i++){
     const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
     const letter = inputField.value.toLowerCase();
     const actualLetter = wordGuess [i - 1];
      if (letter === actualLetter){
        inputField.classList.add("yes-in-place");
      }else if(wordGuess.includes(letter) && letter !==""){
        inputField.classList.add("not-in-place");
         successGuess = false;
      }else{
        inputField.classList.add("no");
        successGuess = false;
      }
    }
    // check if user passed 
    if(successGuess){
       messageArea.innerHTML = `Congrats !  You Win The Word Is <span>${wordGuess}</span>`;
       if (numberOfHints === 3 ){
        messageArea.innerHTML = `<p> Congrats You Didn't Use Hints</p>`

       }
       let allTries = document.querySelectorAll(".inputs > div");
       allTries.forEach((tryDiv) =>tryDiv.classList.add("disabled-inputs") )
       
       guessButton.disabled = true;
       HintBtn.disabled = true;
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
       
        currentTryInput.forEach((input) => (input.disabled = true)) 
       
        currentTry++;
        // document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");

        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
      
        nextTryInputs.forEach((input) => (input.disabled = false));
     
        let el = document.querySelector(`.try-${currentTry}`);
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
        el.children[1].focus();
        }else{
            guessButton.disabled = true;
            HintBtn.disabled=true;
            messageArea.innerHTML = `GameOver The Word Is <span>${wordGuess}</span>`
        }
    
    }

}
function getHint(){
    if (numberOfHints > 0){
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints
    }
    if (numberOfHints === 0){
      HintBtn.disabled = true;
    }
    const enableInputs = document.querySelectorAll("input:not([disabled])")
    const emptyEnableInput = Array.from(enableInputs).filter((input)=> input.value ==="")
    if (emptyEnableInput.length> 0){
        const randomIndex = Math.floor(Math.random() * emptyEnableInput.length);
        const randomInput = emptyEnableInput[randomIndex];
        const indextToFill = Array.from(enableInputs).indexOf(randomInput);
        // console.log(randomIndex)
        // console.log(randomInput)
        // console.log(indextToFill)
      if (indextToFill != -1){
         randomInput.value = wordGuess[indextToFill].toUpperCase();
         
      }
    }
}

// handle backspace
function handleBackspace(e){
   if(e.key === "Backspace"){
    const inputs = document.querySelectorAll("input:not([disabled])");
   const currentIndex = Array.from(inputs).indexOf(document.activeElement);
   if(currentIndex > 0){
   const currentInput = inputs[currentIndex];
   const prevInput = inputs[currentIndex - 1];
  currentInput.value = "";
   prevInput.value="";
   prevInput.focus()
}

   }

}

document.addEventListener("keydown" , handleBackspace)



window.onload = function (){
    generateInputs();
}
