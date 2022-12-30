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

function playRound(playerSelection, computerSelection) {
    const playerNum = REVERSED[playerSelection]
    const computerNum = REVERSED[computerSelection] 
    let result = (computerNum - playerNum + 3) % 3;

    if (result === 2) {
        // return  `You win! ${playerSelection.toUpperCase()} beats ${computerSelection}`;
        return PLAYER
    } else if (result === 1) {
        // return `You lose! ${computerSelection.toUpperCase()} beats ${playerSelection}`;
        return COMPUTER
    } else {
        // return "Draw!";
        return 0
    }
}

function playGame(numRounds) {

    let playerScore = 0;
    let computerScore = 0;
    let scoreString;

    for (let i = 0; i < numRounds; i++) {

        // Make moves section
        let playerSelection = getPlayerChoice();
        let computerSelection = getComputerChoice();
        console.log("computerSelection:", computerSelection)
    
        // play round
        let result = playRound(playerSelection, computerSelection)
        
        // update overall score (playRound returns -1, 0, or 1)

        // Share results of round
        if (result === 1) {
            playerScore += 1;
            scoreString =  `${playerScore}-${computerScore}`;
            alert(`You WIN that round! ${playerSelection.toUpperCase()} beats ${computerSelection}\nScore: ${scoreString}`);
            scoreString =  `${playerScore}-${computerScore}`;
        } else if (result === -1) {
            computerScore += 1;
            scoreString =  `${playerScore}-${computerScore}`;
            alert(`You LOSE that round! ${computerSelection.toUpperCase()} beats ${playerSelection}\nScore: ${scoreString}`);
        } else {
            scoreString =  `${playerScore}-${computerScore}`;
            alert(`That round was a DRAW!\nScore: ${scoreString}`);
        }
    }
    
    // Share results of game
    if (playerScore > computerScore) {
        alert(`You WIN ${scoreString}`);
    } else if (playerScore < computerScore) {
        alert(`You LOSE ${scoreString}`);
    } else {
        alert(`DRAW ${scoreString}`);
    }
}

playGame(5)