//REFACTORED VERSION

const resultArray = [];
const ratioArray = [];

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.text();
    return data.split('\n').map(parseLine);
}

function parseLine(line) {
    const regex = /(\d+)|([^.\d])/g;
    const charactersWithPositions = [];

    while ((match = regex.exec(line)) !== null) {
        if (match[1]) {
            charactersWithPositions.push({
                type: 'number',
                value: Number(match[1]),
                position: match.index,
                isPushed: false,
            });
        } else if (match[2]) {
            charactersWithPositions.push({
                type: 'special',
                value: match[2],
                position: match.index,
                isPushed: false,
                associatedNumbers: [],
            });
        }
    }

    return charactersWithPositions;
}

function processLines(parsedLinesArray) {
    parsedLinesArray.forEach((line, i) => {
        const hasSpecialType = line.some(item => item.type === 'special');

        line.forEach(character => {
            if (character.type === 'number') {
                const startPosition = character.position;
                const endPosition = startPosition + (character.value + '').length - 1;

                if (hasSpecialType) {
                    processSpecialTypes(parsedLinesArray[i], character, startPosition, endPosition);
                }

                if (!character.isPushed) {
                    checkAdjacentLines(parsedLinesArray, i, character, startPosition, endPosition);
                }
            }
        });
    });
}

function processSpecialTypes(line, character, startPosition, endPosition) {
    line.forEach(char => {
        if (char.type === 'special' && (char.position === startPosition - 1 || char.position === endPosition + 1)) {
            pushToResultArray(character, char);
        }
    });
}

function checkAdjacentLines(parsedLinesArray, index, character, startPosition, endPosition) {
    function processAdjacentLine(adjacentLine) {
        adjacentLine.forEach(char => {
            if (char.type === 'special' && isBetween(char.position, startPosition, endPosition)) {
                pushToResultArray(character, char);
            }
        });
    }

    if (index > 0) {
        const previousHasSpecialType = parsedLinesArray[index - 1].some(item => item.type === 'special');
        if (previousHasSpecialType) {
            processAdjacentLine(parsedLinesArray[index - 1]);
        }
    }

    if (index < parsedLinesArray.length - 1) {
        const nextHasSpecialType = parsedLinesArray[index + 1].some(item => item.type === 'special');
        if (nextHasSpecialType) {
            processAdjacentLine(parsedLinesArray[index + 1]);
        }
    }
}

function pushToResultArray(character, char) {
    if (!character.isPushed) {
        resultArray.push(character.value);
        character.isPushed = true;

        if (char.value === '*') {
            char.associatedNumbers.push(character.value);
        }
    }
}

function calculateRatio(parsedLinesArray) {
    parsedLinesArray.forEach(line => {
        let lineRatio = 0;
        line.forEach(character => {
            if (character.type === 'special' && character.associatedNumbers.length === 2) {
                lineRatio += character.associatedNumbers[0] * character.associatedNumbers[1];
            }
        });
        ratioArray.push(lineRatio);
    });

    console.log(ratioArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
}

function isBetween(value, lowerBound, upperBound) {
    return value >= lowerBound - 1 && value <= upperBound + 1;
}

async function main() {
    const parsedLinesArray = await fetchData('https://adventofcode.com/2023/day/3/input');
    processLines(parsedLinesArray);
    console.log(resultArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    calculateRatio(parsedLinesArray);
}

main();
