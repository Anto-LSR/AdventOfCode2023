let inputTest = ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green']


const maximumCubes = {
    red: 12,
    green: 13,
    blue: 14
}
const gameIdArray = [];
let sum = 0;



const input = fetch('https://adventofcode.com/2023/day/2/input').then(response => response.text()).then(data => {
    const dataArray = data.split('\n')
    console.log(dataArray);
    for (const line of dataArray) {
        if (line) {
            console.log('======NEW LINE=========');

            let blueCount = 0;
            let greenCount = 0;
            let redCount = 0;
            const gameObj = {
                gameId: line.split(': ')[0].match(/\d+/g)[0],
                colors: {
                    green: '',
                    blue: '',
                    red: ''
                }
            }
            console.log('ID : ', gameObj.gameId);
            const gameRolls = [];
            line.split(':')[1].split('; ').forEach(roll => gameRolls.push(roll))
            gameRolls.forEach(roll => {
                rollDices = [];
                roll.split(', ').forEach(dice => rollDices.push(dice))
                rollDices.forEach(dice => {
                    const quantity = parseInt(dice.match(/\d+/g)[0]);
                    if (dice.includes('green'))
                        greenCount < quantity ? greenCount = quantity : '';
                    if (dice.includes('blue'))
                        blueCount < quantity ? blueCount = quantity : '';
                    if (dice.includes('red'))
                        redCount < quantity ? redCount = quantity : '';
                })
            })
            gameObj.colors.blue = blueCount
            gameObj.colors.red = redCount
            gameObj.colors.green = greenCount

            if (checkDiceNumber(gameObj.colors)) {
                console.log(gameObj);
                sum += parseInt(gameObj.gameId)
                gameIdArray.push(gameObj.gameId)
            }
        }

    }
    console.log(sum, gameIdArray);
})





function checkDiceNumber(colors) {
    let isPossible = true;
    if (colors.blue > maximumCubes.blue)
        return false
    if (colors.red > maximumCubes.red)
        return false
    if (colors.green > maximumCubes.green)
        return false

    return isPossible;
}
