const validSelections = {
    "rock" : "rock",
    "paper" : "paper",
    "scissors" : "scissors"
}

const computerSelections = {
    0 : "rock",
    1 : "paper",
    2 : "scissors"
}

const gameResults = {
    0 : "Tie",
    1 : "Win",
    2 : "Lose"
}

let playerScore = 0;
let matchesPlayed = 0;

function getPlayerInput() {
    isNotValid = true
    while(isNotValid){
        playerSelection = prompt("What's your selection?: Rock/Paper/Scissors")
        isNotValid = checkIfValid(playerSelection.toLowerCase())
    }
    return playerSelection.toLowerCase()
}

function checkIfValid(playerSelection) {
    if (playerSelection in validSelections) {
        return false
    }
    console.log("Please enter a valid selection of: Rock/Paper/Scissors")
    return true
}

function computerPlay() {
    let randomComputerSelection = Math.floor(Math.random() * 3)
    computerSelection = computerSelections[randomComputerSelection]
    return computerSelection

}

function checkForWinner(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return returnGameResults(playerSelection, computerSelection, 0)
    }

    else if 
    ((playerSelection == "paper" && computerSelection == "rock") || 
    (playerSelection == "rock" && computerSelection == "scissors") ||
    (playerSelection == "scissors" && computerSelection == "paper")) {
        return returnGameResults(playerSelection, computerSelection, 1)
    }

    else {
        return returnGameResults(playerSelection, computerSelection, 2)
    }

}

function returnGameResults(playerSelection, computerSelection, result) {
    switch (result) {
        case 0:
            //console.log(gameResults[result] + " " + playerSelection + " and " + computerSelection + " are the same")
            return {
                value: 0,
                text: gameResults[result] + " " + playerSelection + " and " + computerSelection + " are the same"
            }

        case 1:
            //console.log("You " + gameResults[result] + " " + playerSelection +" beats " + computerSelection)
            return {
                value: 1,
                text: "You " + gameResults[result] + " " + playerSelection +" beats " + computerSelection
            }
    
        case 2: 
            //console.log("You " + gameResults[result] + " " + computerSelection +" beats " + playerSelection)
            return {
                value: 0,
                text: "You " + gameResults[result] + " " + computerSelection +" beats " + playerSelection
            }
    }
}

function playRound(playerSelection, computerSelection) {
    //return checkForWinner(playerSelection, computerSelection)
    displayRunningScore(playerSelection, computerSelection);

}

function game() {
    let keegGoing = true
    let matches = 0
    let playerWins = 0
    while(keegGoing) {
        if(matches > 3) {
            keegGoing = false
        }
        playerWins += playRound(getPlayerInput(), computerPlay()).value
        matches+=1
    }
    gamesToWin = Math.floor((matches+1)/2)
    console.log(playerWins >= gamesToWin ? ("Congrats you won the majority of games: " + 
    playerWins + "|" + (matches-playerWins)) : 
    ("Sorry you didn't win the majority of games " + 
    playerWins + "|" + (matches-playerWins)))
}
//playRound(getPlayerInput(), computerPlay())
//game()

function clickButton(e) {
    console.log(playRound(e.target.id, computerPlay()));
}

function displayRunningScore(playerSelection, computerSelection, result) {
    const container = document.querySelector('#container')
    const content = document.createElement('div');
    const runScore = document.createElement('p');

    let gameResults = checkForWinner(playerSelection, computerSelection, result);

    matchesPlayed++;
    playerScore += gameResults.value;
    runScore.textContent = "Points: " + playerScore + "\t" + gameResults.text;
    content.append(runScore);
    container.append(content);

    if(playerScore == 5) {
        displayFinalScore(playerScore, matchesPlayed);
        matchesPlayed = 0;
    }
}

function displayFinalScore(playerScore, matchesPlayed) {
    const  container = document.querySelector('#container');
    const content = document.querySelector('div');
    const finalScore = document.createElement('h1');
    fscore = matchesPlayed - playerScore;

    finalScore.textContent = "You won: " + playerScore + " of " + matchesPlayed +" games";
    content.append(finalScore);
    container.append(content);
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener('click', clickButton);
});