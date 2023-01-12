const CHOICES = {
    0: "rock",
    1: "paper",
    2: "scissor"
}

const REVERSED = reverseKeyValues(CHOICES);
const numRounds = 5;
const PLAYER = 1;
const COMPUTER = -1;
const DRAW = 0
const interval = 400;

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

// Add event listeners
let tools = document.querySelectorAll('.tool-box');
console.log(tools);

tools.forEach(tool => {
    tool.addEventListener('mousedown', e => {
        e.target.classList.add('selected');
        let playerSelection = e.target.id;
        let result = playRound(playerSelection)
    });
});

tools.forEach(tool => {
    tool.addEventListener('mouseup', e => {
        setTimeout(function() {
            e.target.classList.remove('selected')
        }, 800);
    });
});

// Set scoreboard
setScore(playerScore, computerScore, drawScore);


/* FUNCTIONS */
function reverseKeyValues(obj) {
    const reversed = {};
    for (const key in obj) {
        reversed[obj[key]] = key;
      }
      return reversed;
}

function getComputerChoice() {
    let choice =  Math.floor(Math.random() * 3);
    return CHOICES[choice]
}

function getPlayerChoice() {
    let choice = prompt("What's your move?")
    return choice.toLowerCase();
}   

async function playRound(playerSelection) {

    flashText();
    await sleep(interval * 3);

    // Place player's choice in box
    let playerBox = document.getElementById('player-choice');
    playerBox.innerHTML = textToEmoji(playerSelection);

    // Randomly select computer's choice and place in box
    let computerBox = document.getElementById('computer-choice');
    let computerSelection = getComputerChoice();
    computerBox.innerHTML = textToEmoji(computerSelection);
    console.log("computerSelection:", computerSelection)

    // Conversion for equation
    const playerNum = REVERSED[playerSelection]
    const computerNum = REVERSED[computerSelection] 
    let result = (computerNum - playerNum + 3) % 3;

    if (result === 2) {
        playerScore += 1;
        playerBox.style.borderColor = "green";
        computerBox.style.borderColor = "red";
    } else if (result === 1) {
        computerScore += 1;
        playerBox.style.borderColor = "red";
        computerBox.style.borderColor = "green";
    } else {
        drawScore += 1;
    }

    setScore(playerScore, computerScore, drawScore);
}

function flashText() {
    const announcement = document.querySelector('.announcement');
    // const words = {1: 'Rock!', 2:'Paper!', 3:'Scissors', 4:'Shoot!'};
    const words = ['Rock!', 'Paper!', 'Scissors!', 'Shoot!'];
    
    let promise = Promise.resolve();
    words.forEach(word => {
        promise = promise.then(() => {
            announcement.innerHTML = word;
            return new Promise((resolve) => {
                setTimeout(resolve, interval);
            });
        });
    });
}

function textToEmoji(tool) {
    if (tool == "rock") {
        return "🪨";
    } else if (tool == "paper") {
        return "📃";
    } else {
        return "✂️" 
    }
}

function setScore(playerScore, computerScore, drawScore) {
    const scoreboard = document.querySelector('.scoreboard');
    console.log(scoreboard);
    scoreboard.innerHTML = playerScore + '-' + computerScore + '-' + drawScore;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}