const spelledNumbers = { 'one': 'one1one', 'two': 'two2two', 'three': 'three3three', 'four': 'four4four', 'five': 'five5five', 'six': 'six6six', 'seven': 'seven7seven', 'eight': 'eight8eight', 'nine': 'nine9nine' };

const fetchData = async () => {
  try {
    const response = await fetch('https://adventofcode.com/2023/day/1/input');
    const data = await response.text();
    return data.split('\n');
  } catch (error) {
    console.error(error);
  }
};

const replaceWordsWithNumbers = (input) => {
  for (const [word, replacement] of Object.entries(spelledNumbers)) {
    const regex = new RegExp(word, 'gi');
    input = input.replace(regex, replacement);
  }
  return input;
};

const extractNumbers = (line) => {
  return line.replace(/[^0-9]/g, '');
};

const parseAndSumNumbers = (numbersArray) => {
  let sum = 0;
  numbersArray.forEach((number) => {
    const parsedStr = number.split('');
    try {
      const finalNumber = parseInt(`${parsedStr[0]}${parsedStr[parsedStr.length - 1]}`);
      if (!isNaN(finalNumber)) sum += finalNumber;
    } catch (e) {
      console.log(number);
    }
  });
  console.log(sum);
};

const processInput = async () => {
  let sum = 0;
  const dataArray = await fetchData();
  const replacedArray = dataArray.map(replaceWordsWithNumbers);
  const numbersArray = replacedArray.map(extractNumbers);
  parseAndSumNumbers(numbersArray);
};

processInput();
