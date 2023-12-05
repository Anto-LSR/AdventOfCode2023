

const pouet = fetch('https://adventofcode.com/2023/day/4/input').then(response => response.text()).then(data => {
    const input = data.split('\n')
    let sum = 0;

    for (const card of input) {
        //Parse string
        try {
            const processedString = parseCardString(card)
            const cardPoints = processCard(processedString)
            if (!isNaN(cardPoints)) {
                sum += cardPoints;
            }

        } catch (error) {

        }
    }

    console.log(sum);
})

let i = 0;

function parseCardString(card) {
    try {
        const match = card.match(/Card\s+(\d{1,3}):/);
        const winningNumbers = card.split(': ')[1].split(' | ')[0].split(' ').filter(Boolean);
        const poolNumbers = card.split(' | ')[1].split(' ').filter(Boolean);
        const cardObj = {
            id: match ? match[1] : null,
            winningNumbers: winningNumbers,
            poolNumbers: poolNumbers
        }
        return cardObj
    } catch (error) {
        return null;
    }

}


function processCard(card) {
    if (card) {
        let points = 0;
        card.winningNumbers.forEach(winNumber => {
            if (card.poolNumbers.includes(winNumber)) {
                if (points == 0)
                    points = 1;
                else points *= 2
            }
        });
        return points
    }

}
