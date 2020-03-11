const button = document.getElementById("calculate-btn");
const loader = document.getElementById("loader");
const loader2 = document.getElementById("loader2");
const resultHistory = document.getElementById("results-history");
const input = document.getElementById("x_value");
loader.classList.add("hide");
loader2.classList.add("hide");

showHistory("createdDate", "desc");
//loading the history of results - by default sorted by the most recent

//main function
function calculateFibonacci() {
  let x = document.getElementById("x_value").value;
  const resultSpace = document.getElementById("result-space");

  if (checkInput(x) !== "ok") {
    // check if input is valid
    return;
  } else {
    hideUnhide(`result-space`);
    hideUnhide(`loader`);

    const checkBox = document.getElementById("checkbox");

    if (checkBox.checked == false) {
      hideUnhide(`result-space`);
      hideUnhide(`loader`);
      resultSpace.innerText = fibonacciNoServer(x);
      //calculate fibonacci without connecting to the server
    } else {
      const server = `http://localhost:5050/fibonacci/${x}`;
      fetch(server)
        .then(function(response) {
          if (response.ok) {
            //check for server errors
            return response.json();
          } else {
            return response.text();
          }
        })
        .then(function fetchResult(data) {
          hideUnhide(`loader`);
          hideUnhide(`result-space`);
          if (typeof data === "object") {
            resultSpace.classList.remove("server-error");
            resultSpace.innerText = data.result;
            showHistory("createdDate", "desc");
          } else {
            resultSpace.innerText = "Server Error: " + data;
            resultSpace.classList.add("server-error");
          }
        });
    }
  }
}

function showHistory(key, sort) {
  //get the result history
  hideUnhide(`loader2`);
  setTimeout(() => {
    fetch("http://localhost:5050/getFibonacciResults")
      .then(res => res.json())
      .then(function fetchResult(data) {
        let history = sortByKey(data.results, key);
        history = cleanArray(data.results);
        if (sort === "desc") {
          history = history.reverse();
        } else {
        }
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
      "The Fibonacci Of <b>" +
        array[i].number +
        "</b> is <b> " +
        array[i].result +
        "</b>. Calculated at: " +
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
function fibonacciNoServer(num) {
  if (num <= 1) {
    return num;
  } else {
    return fibonacciNoServer(num - 1) + fibonacciNoServer(num - 2);
  }
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

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}

button.addEventListener("click", calculateFibonacci);

numberAsc = document.getElementById("numberAsc");
numberDesc = document.getElementById("numberDesc");
dateAsc = document.getElementById("dateAsc");
dateDesc = document.getElementById("dateDesc");

numberAsc.addEventListener("click", function() {
  showHistory("number");
});
dateAsc.addEventListener("click", function() {
  showHistory("createdDate");
});
numberDesc.addEventListener("click", function() {
  showHistory("number", "desc");
});
dateDesc.addEventListener("click", function() {
  showHistory("createdDate", "desc");
});
