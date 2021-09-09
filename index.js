// We import the object from the data file. Inside that object there is a function to get players data
const data = require("./data");

const PLAYERS = data.getPlayers();

/**
 * Test 1
 * Write a function to log in the console the players data with this format:
 * PLAYER 1
 * NAME: Zinedine
 * LASTNAME: Zidane
 * POSITION: Midfielder
 * PLAYER 2...
 */

// Your code
const printPrettifiedData = () => {
    PLAYERS.map((player, index) => {
        const { name, lastname, position } = player;
        console.log(`PLAYER ${index+1}\nNAME: ${name}\nLASTNAME: ${lastname}\nPOSITION: ${position}\n`);
    });
}

console.log(`\n===== TEST 1 =====`)
printPrettifiedData();

/**
 * Test 2
 * Write a function to log in the console an array with only the names of the players, ordered by name length descending
 */

// Your code
// ==> Code written with an assumption that the problem requires only the 'name' of each player, and not the full name (i.e name and lastname)
const getPlayersNames = () => {
    const names = [];
    PLAYERS.map(player => names.push(player.name));
    return names;
}

const printOrderedNames = () => {
    console.log(getPlayersNames(PLAYERS).sort((a,b) => b.length - a.length))
}

console.log(`\n===== TEST 2 =====`)
printOrderedNames();

/**
 * Test 3
 * Write a function to log in the console the average number of goals there will be in a match if all the players in the data play on it
 * scoringChance means how many goals per 100 matches the player will score
 * Example: 10 players play in a match, all of them has 0.11 scoringChance, the result will be 1.1 average goals 
 * Output example -> Goals per match: 2.19
 */

// Your code
// ==> This task is not clear, but this is my interpretation of it from the idea I got from Test 5
const averageGoals = () => {
    const allScoringChances = []
    PLAYERS.map(player => allScoringChances.push(Math.abs(player.scoringChance)));
    const total = allScoringChances.reduce((a,b) => a + b);
    console.log(total/100);
}

console.log(`\n===== TEST 3 =====`)
averageGoals();

/**
 * Test 4
 * Write a function that accepts a name, and logs the position of the player with that name
 */

// Your code
const printPlayerPosition = name => {
    const matchedPlayer = PLAYERS.filter(player => player.name === name)[0];
    console.log(`${name} plays as a ${matchedPlayer.position}`)
}

console.log(`\n===== TEST 4 =====`)
printPlayerPosition('Pierre-Emerick');

/**
 * Test 5
 * Write a function that splits all the players randomly into 2 teams, Team A and Team B. Both teams should have same number of players.
 * The function should log the match score, using the average number of goals like the Test 3 and rounding to the closest integer
 * Example:
 *      Team A has 4 players, 2 with 50 scoringChance and 2 with 70 scoringChance. 
 *      The average score for the team would be 2.4 (50+50+70+70 / 100), and the closest integer is 2, so the Team A score is 2
 */

// Your code
const randomTeamGame = () => {
    // Get all player indices, needed for Team B filtering
    const allPos = [];
    for (let i=0; i<PLAYERS.length; i++) {
        allPos.push(i)
    }
    // Assign 5 random player indices to Team A
    const teamA = [];
    while(teamA.length < 5){
        var r = Math.floor(Math.random() * 9);
        if(teamA.indexOf(r) === -1) teamA.push(r);
    }
    // Assign the remaining player indices to Team B
    const teamB = allPos.filter(val => teamA.indexOf(val) < 0);
    // Get all scoring chances from all players in each team
    const teamAScoringChances = teamA.map(pos => Math.abs(PLAYERS[pos].scoringChance)).reduce((a,b) => a+b);
    const teamBScoringChances = teamB.map(pos => Math.abs(PLAYERS[pos].scoringChance)).reduce((a,b) => a+b);
    // Get the rounded average scores
    const teamAScore = Math.round(teamAScoringChances/100);
    const teamBScore = Math.round(teamBScoringChances/100);
    // Print the final score
    console.log(`FINAL SCORE\n[Team A] ${teamAScore} vs ${teamBScore} [Team B]`);
}

console.log(`\n===== TEST 5 =====`);
randomTeamGame();