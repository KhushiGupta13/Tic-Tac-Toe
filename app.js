let boxes = document.querySelectorAll(".box");
let resetGameButton = document.querySelector("#resetGame-button");
let newGameButton = document.querySelector("#newGame-button");
let messsage = document.querySelector("#msg");
let messageContainer = document.querySelector(".msg-container");

let count = 0;
let winnerFound = false;

let turnO = true;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){ // player O turn 
            box.innerText = "O"; // print player O
            box.classList.add("o");
            turnO = false; // then now player X turn so that we set the player O turn = dlase 
        }
        else 
        {
            box.innerText = "X"; // now player X will play
            box.classList.add("x");
            turnO = true; // then set player O turn as true
        }
        box.disabled = true;

        count++;

        checkWinner();
    })
});


const winningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Check winner and draw condition
const checkWinner = () => {

    let win = false; 

    // Loop through all winning patterns
    for(let pattern of winningPattern){

        // Get values from 3 positions of current pattern
        let position1value = boxes[pattern[0]].innerText;
        let position2value = boxes[pattern[1]].innerText;
        let position3value = boxes[pattern[2]].innerText;

        // Check if all positions are filled (not empty)
        if (position1value !== "" && position2value !== "" && position3value !== ""){
            // Check if all 3 values are same (winning condition)
            if(position1value === position2value && position2value === position3value){ 
                win = true;
                winnerFound = true; // it shows that we have a winner
                showWinner(position1value,pattern); // now it show winner on screen and pass winning pattern
                return; // Stop further execution
            }
        }
    }

    // If all boxes are filled AND no winner is found it means that the match is Draw
    if (count === 9 && !win) {
        messsage.innerText = "Match Draw!";
        messageContainer.classList.remove("hide");
        resetGameButton.classList.add("hide");
    }
    
};

//Let's show the winner
const showWinner = (winner, pattern) => {
    console.log("Winner:", winner);
    console.log(pattern);
    messsage.innerText = `Congratulation, Winner is ${winner}`;
    messageContainer.classList.remove("hide");
    resetGameButton.classList.add("hide");

    // Highlight winning boxes
    for (let index of pattern) {
        boxes[index].classList.add("win-glow");
    }

    disabledBoxes(); 
};

//After getting winner we have to disabled all the boxes 
const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

//To reset or start a new game we have to again enable all the buttons
const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false; // Enable box again
        box.innerText = ""; // Clear text
        box.classList.remove("win-glow");
    }
};

//Reset button 
const resetButton = () => {
    turnO = true; // Reset turn
    count = 0; // Reset count
    winnerFound = false; 
    enabledBoxes(); // Enable all boxes
    messageContainer.classList.add("hide"); // Hide message
    messsage.innerText = ""; // Clear message text
    resetGameButton.classList.remove("hide");
    for (let box of boxes) {
        box.classList.remove("x", "o"); // Remove X/O colors
        box.style.backgroundColor = "";
    }
};

newGameButton.addEventListener("click", resetButton);
resetGameButton.addEventListener("click", resetButton);
