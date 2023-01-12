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
let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

// Add event listeners
let tools = document.querySelectorAll('.tool');
console.log(tools);

tools.forEach(tool => {
    tool.addEventListener('mousedown', e => {
        e.target.classList.add('selected');
    });
});

tools.forEach(tool => {
    tool.addEventListener('mouseup', e => {
        setTimeout(function() {
            e.target.classList.remove('selected')
        }, 800);
    });
});


playGame();

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

function playRound(playerSelection) {
    // randomly select computer's choice
    let computerSelection = getComputerChoice();
    console.log("computerSelection:", computerSelection)

    // conversion for equation
    const playerNum = REVERSED[playerSelection]
    const computerNum = REVERSED[computerSelection] 
    let result = (computerNum - playerNum + 3) % 3;

    if (result === 2) {
        playerScore += 1;
    } else if (result === 1) {
        computerScore += 1;
    } else {
        drawScore += 1;
    }

    setScore(playerScore, computerScore, drawScore);
}

function setScore(playerScore, computerScore, drawScore) {
    const scoreboard = document.querySelector('.scoreboard');
    console.log(scoreboard);
    scoreboard.innerHTML = playerScore + '-' + computerScore + '-' + drawScore;

}

function playGame() {

    const tools = document.querySelectorAll('.tools');

    // set score
    setScore(playerScore, computerScore, drawScore);

    tools.forEach((tool) => {
        tool.addEventListener('click', (e) => {
            let playerSelection = e.target.id;
            // play round
            let result = playRound(playerSelection)
        });
    });
}
