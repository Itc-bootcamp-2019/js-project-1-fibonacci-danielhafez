const button = document.getElementById("calculate-btn");
const loader = document.getElementById("loader");
const loader2 = document.getElementById("loader2");
const resultHistory = document.getElementById("results-history");
const input = document.getElementById("x_value");
loader.classList.add("hide");
loader2.classList.add("hide");

showHistory();

function calculateFibonacci() {
  let x = document.getElementById("x_value").value;

  if (checkInput(x) !== "ok") {
    return;
  } else {
    hideUnhide(`result-space`);
    hideUnhide(`loader`);

    const server = `http://localhost:5050/fibonacci/${x}`;

    fetch(server)
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(function fetchResult(data) {
        hideUnhide(`loader`);
        hideUnhide(`result-space`);
        const resultSpace = document.getElementById("result-space");

        if (typeof data === "object") {
          resultSpace.innerText = data.result;
          resultSpace.classList.remove("server-error");
        } else {
          resultSpace.innerText = "Server Error: " + data;
          resultSpace.classList.add("server-error");
        }
      });
    const checkBox = document.getElementById("checkbox");

    if (checkBox.checked == true) {
      showHistory();
    } else {
      return;
    }
  }
}

function showHistory() {
  hideUnhide(`loader2`);
  setTimeout(() => {
    fetch("http://localhost:5050/getFibonacciResults")
      .then(res => res.json())
      .then(function fetchResult(data) {
        let history = cleanArray(data.results);
        createList(history);
        hideUnhide(`loader2`);
      });
  }, 800);
}

function cleanArray(array) {
  let storage = [];
  for (let i = 0; i < array.length; i++) {
    let date = new Date(array[i].createdDate);
    const search = [
      "The Fibonacci Of <strong>" +
        array[i].number +
        "</strong> is <strong>" +
        array[i].result +
        "</strong>. Calculated at: " +
        date +
        "\n"
    ];
    storage.push(search);
  }
  return storage;
}

function createList(array) {
  resultHistory.innerHTML = "";
  for (i = 0; i < array.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = array[i] + "<hr>";
    resultHistory.appendChild(listItem);
  }
}

function checkInput(num) {
  const alertMessage = document.getElementById("alertMessage");
  if (isNaN(num)) {
    alertMessage.innerText = "Please insert a number";
    alertDisplay();
    return console.log("The input was not a number");
  }
  if (num < 0) {
    alertMessage.innerText = "Please insert a positive number";
    alertDisplay();
    return console.log("The input was a negative number");
  }
  if (num > 50) {
    alertMessage.innerText = "Can't be larger than 50";
    alertDisplay();
    return console.log("The maximum value is 50");
  } else {
    return "ok";
  }
}

function alertDisplay() {
  displayBlock(`alertMessage`);
  invisible(`checkbox`);
  invisible(`save`);
  input.classList.add("red");
  setTimeout(() => {
    input.classList.remove("red");
    hideUnhide(`checkbox`);
    hideUnhide(`save`);
    invisible(`alertMessage`);
  }, 3000);
}

function hideUnhide(element) {
  let something = document.getElementById(`${element}`);
  something.classList.toggle("hide");
}

function displayBlock(element) {
  let something = document.getElementById(`${element}`);
  something.classList.remove("hide");
  something.classList.add("blockit");
}

function invisible(element) {
  let something = document.getElementById(`${element}`);
  something.classList.remove("hide");
  something.classList.add("hide");
}

button.addEventListener("click", calculateFibonacci);
