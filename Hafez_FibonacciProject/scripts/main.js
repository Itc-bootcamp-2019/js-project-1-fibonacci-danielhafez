const button = document.getElementById("calculate-btn");
const input = document.getElementById("x_value");
const loader = document.getElementById("loader");
const resultHistory = document.getElementById("results-history");
loader.classList.add("hide");
const loader2 = document.getElementById("loader2");
loader2.classList.add("hide");

function calculateFibonacci() {
  let x = document.getElementById("x_value").value;
  console.log(x);

  if (checkInput(x) !== "ok") {
    return console.log("the input is not a valid number");
  } else {
    invisible(`result-space`);
    visible(`loader`);
    invisible(`alertMessage`);

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
        invisible(`loader`);
        visible(`result-space`);
        const resultSpace = document.getElementById("result-space");

        if (typeof data === "object") {
          resultSpace.innerText = data.result;
          resultSpace.classList.remove("server-error");
          console.log(data);
        } else {
          resultSpace.innerText = "Server Error: " + data;
          resultSpace.classList.toggle("server-error");
        }
      });

    visible(`loader2`);
    setTimeout(() => {
      fetch("http://localhost:5050/getFibonacciResults")
        .then(res => res.json())
        .then(function fetchResult(data) {
          let history = cleanArray(data.results);
          createList(history);
          invisible(`loader2`);
        });
    }, 1200);
  }
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
    displayBlock(`alertMessage`);
    return console.log("The input was not a number");
  }
  if (num < 0) {
    alertMessage.innerText = "Please insert a positive number";
    displayBlock(`alertMessage`);
    return console.log("The input was a negative number");
  }
  if (num > 50) {
    alertMessage.innerText = "Can't be larger than 50";
    displayBlock(`alertMessage`);
    return console.log("The maximum value is 50");
  } else {
    return "ok";
  }
}
function restart() {
  x = "";
  invisible(`alertMessage`);
  invisible(`loader`);
}
function visible(element) {
  let something = document.getElementById(`${element}`);
  something.classList.remove("hide");
  something.classList.add("unhide");
}

function displayBlock(element) {
  let something = document.getElementById(`${element}`);
  something.classList.remove("hide");
  something.classList.remove("unhide");
  something.classList.add("blockit");
}

function invisible(element) {
  let something = document.getElementById(`${element}`);
  something.classList.remove("unhide");
  something.classList.add("hide");
}

button.addEventListener("click", calculateFibonacci);
