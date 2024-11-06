let input = document.querySelector("input");
let buttons = document.querySelectorAll("button");

let inputString = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.textContent);
  });
});

function handleButtonClick(buttonText) {
  if (buttonText === "AC") {
    inputString = "";
    input.value = "0";
  } else if (buttonText === "DEL") {
    inputString = inputString.slice(0, -1);
    input.value = inputString || "0";
  } else if (buttonText === "=") {
    try {
      if (inputString.trim()) {
        input.value = eval(inputString);
        inputString = input.value;
      } else {
        input.value = "0";
      }
    } catch {
      input.value = "Error";
      inputString = "";
    }
  } else {
    if (isOperator(buttonText) && isOperator(inputString.slice(-1))) {
      inputString = inputString.slice(0, -1) + buttonText;
    } else {
      inputString += buttonText;
    }
    input.value = inputString;
  }
}

function isOperator(char) {
  return ["+", "-", "*", "/", "%"].includes(char);
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleButtonClick(key);
  } else if (["+", "-", "*", "/", "%"].includes(key)) {
    handleButtonClick(key);
  } else if (key === "Enter") {
    handleButtonClick("=");
  } else if (key === "Backspace") {
    handleButtonClick("DEL");
  } else if (key === "Escape") {
    handleButtonClick("AC");
  }
});
