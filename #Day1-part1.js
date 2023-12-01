function getFirstDigit(number) {
  const absoluteNumber = Math.abs(number)
  const stringNumber = absoluteNumber.toString()
  const firstDigit = parseInt(stringNumber.charAt(0), 10)

  return firstDigit;
}

function getLastDigit(number) {
  const absoluteNumber = Math.abs(number)
  const stringNumber = absoluteNumber.toString()
  const lastDigit = parseInt(stringNumber.charAt(stringNumber.length - 1), 10)

  return lastDigit;
}

let sum = 0;
const input = fetch('https://adventofcode.com/2023/day/1/input').then(response => response.text())
  .then(data => {
    const dataArray = data.split('\n');
    const calibrationArray = [];
    dataArray.forEach(line => {
      lineToArray = line.split('')
      const allNumbers = [];
      lineToArray.forEach(character => {
        if (!isNaN(character)) {
          allNumbers.push(character)
        }
      })
      const calNumber = `${getFirstDigit(allNumbers[0])}${getLastDigit(allNumbers[allNumbers.length - 1])}`;
      if (!isNaN(calNumber)) {
        calibrationArray.push(calNumber)
        sum += parseInt(calNumber);
      }
    })
    console.log(sum);
  })
  .catch(error => console.error('Error fetching the file:', error));
