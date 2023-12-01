let sum = 0;
const regex = new RegExp(/[^0-9]|(one|two|three|four|five|six|seven|eight|nine)/g, '')

const spelledNumbers = { 'one': 'one1one', 'two': 'two2two', 'three': 'three3three', 'four': 'four4four', 'five': 'five5five', 'six': 'six6six', 'seven': 'seven7seven', 'eight': 'eight8eight', 'nine': 'nine9nine' };
const testInput = [
  'two1nine'
  , 'eightwothree'
  , 'abcone2threexyz'
  , 'xtwone3four'
  , '4nineeightseven2'
  , 'zoneight234'
  , '7pqrstsixteen']

const input = fetch('https://adventofcode.com/2023/day/1/input').then(response => response.text())
  .then(data => {
    const dataArray = data.split('\n');
    const numbersArray = [];
    const replacedArray = dataArray.map(input => {
      for (const [word, replacement] of Object.entries(spelledNumbers)) {
        const regex = new RegExp(word, 'gi');
        input = input.replace(regex, replacement);
        // input = input.replace((/[^0-9]/g, ''))
      }
      return input;
    });

    replacedArray.forEach(line => {
      numbersArray.push(line.replace(/[^0-9]/g, ''));
    })

    for (const number of numbersArray) {
      const parsedStr = number.split('');
      try {

        const finalNumber = parseInt(`${parsedStr[0]}${parsedStr[parsedStr.length - 1]}`)
        if (!isNaN(finalNumber))
          sum += finalNumber;

      } catch (e) {
        console.log(number);
      }
    }
    console.log(sum);
  })
  .catch(error => console.error(error));

