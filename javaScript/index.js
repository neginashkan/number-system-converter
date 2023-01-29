const convertButton = document.getElementById("convert-button");
const values = document.getElementById("values");
const inputNumberEl = document.getElementById("input-number-el");
const answers = document.getElementsByClassName("answers");
const bases = { decimal: 10, binary: 2, octal: 8, hexadecimal: 16 };
const hexaValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
const hexadecimalValues = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
};
const massageError = document.getElementById("massage-error");
function decimal(inputNumber) {
  for ([key, val] of Object.entries(bases)) {
    let number = parseInt(inputNumber);
    document.getElementById(`${key}-el`).textContent = decimalTo(val, number);
  }
}
function decimalTo(val, number) {
  let remaining = [];
  while (number > 0) {
    remaining.unshift(number % val);
    number = Math.floor(number / val);
  }

  let temp = "";
  for (let i = 0; i < remaining.length; i++) {
    temp += hexaValues[remaining[i]];
  }
  return temp;
}
function toDecimal(base, inputNumber) {
  let startNumber = 0;
  let total = 0;
  for (let i = inputNumber.length - 1; i >= 0; i--) {
    let numberDigit = inputNumber[i];
    if (numberDigit in hexadecimalValues) {
      numberDigit = hexadecimalValues[numberDigit];
    }
    total += base ** startNumber * numberDigit;
    startNumber += 1;
  }
  return total;
}
function toBinary(binaryNumber, base) {
  let digits = [];
  let forLoopNumber = Math.ceil(binaryNumber.length / base);
  for (let i = 0; i < forLoopNumber; i++) {
    let last = binaryNumber.slice(-Math.abs(base));
    if (base === 3) {
      if (last.length === 1) {
        last = `00${last}`;
      }
      if (last.length === 2) {
        last = `0${last}`;
      }
    }
    if (base === 4) {
      if (last.length === 1) {
        last = `000${last}`;
      }
      if (last.length === 2) {
        last = `00${last}`;
      }
      if (last.length === 3) {
        last = `0${last}`;
      }
    }
    digits.unshift(last);
    binaryNumber = binaryNumber.slice(0, -Math.abs(base));
  }
  let finalResult = "";
  for (let i = 0; i < digits.length; i++) {
    finalResult += hexaValues[toDecimal(2, digits[i])];
  }
  return finalResult;
}
function octalOrHexadecimalToBinary(inputNumber) {
  let result = "";
  let digit = "";
  for (let i = 0; i < inputNumber.length; i++) {
    if (inputNumber[i] in hexadecimalValues) {
      digit = hexadecimalValues[inputNumber[i]];
    } else {
      digit = parseInt(inputNumber[i]);
    }
    result += decimalTo(2, digit);
  }
  return result;
}
function octalToHexadecimal(inputNumber) {
  let binaryNumber = "";
  for (let i = 0; i < inputNumber.length; i++) {
    let digit = parseInt(inputNumber[i]);
    let last3 = decimalTo(2, digit);
    if (last3.length === 1) {
      last3 = `00${last3}`;
    }
    if (last3.length === 2) {
      last3 = `0${last3}`;
    }
    binaryNumber += last3;
  }
  return toBinary(binaryNumber, 4).replace(/^0+/, "");
}
function hexadecimalToOctal(binaryNumber) {
  return toBinary(binaryNumber, 3);
}
function binary(inputNumber) {
  document.getElementById("binary-el").textContent = inputNumber;
  document.getElementById("decimal-el").textContent = toDecimal(2, inputNumber);
  document.getElementById("octal-el").textContent = toBinary(inputNumber, 3);
  document.getElementById("hexadecimal-el").textContent = toBinary(
    inputNumber,
    4
  );
}

function octal(inputNumber) {
  document.getElementById("octal-el").textContent = inputNumber;
  document.getElementById("decimal-el").textContent = toDecimal(8, inputNumber);
  document.getElementById("binary-el").textContent =
    octalOrHexadecimalToBinary(inputNumber);
  document.getElementById("hexadecimal-el").textContent =
    octalToHexadecimal(inputNumber);
}
function hexadecimal(inputNumber) {
  document.getElementById("hexadecimal-el").textContent = inputNumber;
  document.getElementById("decimal-el").textContent = toDecimal(
    16,
    inputNumber
  );
  document.getElementById("binary-el").textContent =
    octalOrHexadecimalToBinary(inputNumber);
  document.getElementById("octal-el").textContent = hexadecimalToOctal(
    octalOrHexadecimalToBinary(inputNumber)
  );
}
function clearErrorMassage() {
  massageError.textContent = "";
}
function clearValuesText() {
  for (let i = 0; i < answers.length; i++) {
    answers[i].textContent = "?";
  }
}
function calculate(choice) {
  clearValuesText();
  let userEnterNumber = inputNumberEl.value;
  if (userEnterNumber.trim() === "") {
    massageError.textContent = "Enter The Number";
  } else {
    if (choice === "decimal") {
      decimal(userEnterNumber);
    }
    if (choice === "binary") {
      binary(userEnterNumber);
    }
    if (choice === "octal") {
      octal(userEnterNumber);
    }
    if (choice === "hexadecimal") {
      hexadecimal(userEnterNumber);
    }
  }
}
function showResults(event) {
  event.preventDefault();
  let userChoice = values.options[values.selectedIndex].value.toLowerCase();
  calculate(userChoice);
}
convertButton.addEventListener("click", showResults);
