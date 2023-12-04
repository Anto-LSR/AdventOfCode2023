

///////////////////////////////////////////////////
const inputTest = [
    '467..114..',
    '...*......',
    '..35..633.',
    '......#...',
    '617*......',
    '.....+.58.',
    '..592.....',
    '......755.',
    '...$.*....',
    '.664.598..']


const resultArray = [];


const pouet = fetch('https://adventofcode.com/2023/day/3/input').then(response => response.text()).then(data => {
    const input = data.split('\n')
    let firstLine = true;
    const parsedLinesArray = []
    for (const line of input) {
        const regex = /(\d+)|([^.\d])/g;
        let match;
        const charactersWithPositions = [];

        while ((match = regex.exec(line)) !== null) {
            if (match[1]) {
                // C'est un nombre
                charactersWithPositions.push({
                    type: 'number',
                    value: Number(match[1]),
                    position: match.index,
                    isPushed: false,
                });
            } else if (match[2]) {
                // C'est un caractère spécial
                charactersWithPositions.push({
                    type: 'special',
                    value: match[2],
                    position: match.index,
                    isPushed: false,
                    associatedNumbers: [],
                });
            }
        }

        parsedLinesArray.push(charactersWithPositions)
    }
    /////////////////////////LIGNE////////////////////////////

    for (let i = 0; i < parsedLinesArray.length; i++) {
        //Vérifie si la ligne comprend au moins un caractère spécial
        const hasSpecialType = parsedLinesArray[i].some(item => item.type === 'special');
        for (const character of parsedLinesArray[i]) {
            //////////////VALEURS//////////////

            //Récupère la position du number
            let startPosition
            let endPosition
            if (character.type == 'number') {
                if (character.value == 860) {
                    console.log('pouet');
                }
                startPosition = character.position;
                endPosition = startPosition + (character.value + '').length - 1
                //Si un nombre est trouvé et qu'il y a un type spécial sur la ligne
                if (hasSpecialType) {
                    parsedLinesArray[i].forEach(char => {
                        //Pour chaque type spécial
                        if (char.type == 'special') {
                            if (char.position === startPosition - 1 || char.position === endPosition + 1) {
                                if (!character.isPushed) {
                                    resultArray.push(character.value)
                                    character.isPushed = true;
                                    if (char.value === '*') {
                                        char.associatedNumbers.push(character.value)
                                    }
                                }
                            }
                        }
                    })
                } if (!character.isPushed) {

                    //Vérifier ligne précédente et suivante
                    //Précédente
                    if (i > 0) {
                        const previousHasSpecialType = parsedLinesArray[i - 1].some(item => item.type === 'special');
                        if (previousHasSpecialType) {
                            parsedLinesArray[i - 1].forEach(char => {
                                if (char.type == 'special') {
                                    if (isBetween(char.position, startPosition, endPosition)) {
                                        if (!character.isPushed) {
                                            resultArray.push(character.value)
                                            if (char.value === '*') {
                                                char.associatedNumbers.push(character.value)
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    //Suivante
                    if (i < parsedLinesArray.length - 1) {
                        const nextHasSpecialType = parsedLinesArray[i + 1].some(item => item.type === 'special');
                        if (nextHasSpecialType) {
                            parsedLinesArray[i + 1].forEach(char => {
                                if (char.type == 'special') {
                                    if (isBetween(char.position, startPosition, endPosition)) {
                                        if (!character.isPushed) {
                                            resultArray.push(character.value)
                                            if (char.value === '*') {
                                                char.associatedNumbers.push(character.value)
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }



                }
            }
        }
    }
    console.log(resultArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    console.log(resultArray);

    const ratioArray = [];

    parsedLinesArray.forEach(line => {
        let lineRatio = 0;
        line.forEach(character => {
            if (character.type == 'special') {
                if (character.associatedNumbers.length === 2)
                    lineRatio += character.associatedNumbers[0] * character.associatedNumbers[1]

            }
        })

        ratioArray.push(lineRatio)
    })

    console.log(ratioArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
})



function isBetween(value, lowerBound, upperBound) {
    //  console.log('Position : ', value, 'min : ', lowerBound, ' max : ', upperBound);
    return value >= lowerBound - 1 && value <= upperBound + 1;
}



