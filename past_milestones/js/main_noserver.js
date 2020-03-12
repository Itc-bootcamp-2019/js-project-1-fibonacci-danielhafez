function calculateFibonacci(num) {
  if (isNaN(num)) {
    alert("Insert numbers!");
    return console.error(
      "The classic Fibonacci Sequence includes only positive number, the input was not a number"
    );
  }
  if (num < 0) {
    alert(
      "The classic Fibonacci Sequence includes only positive number, the number inserted was negative"
    );
    return console.error(
      "The classic Fibonacci Sequence includes only positive number, the number inserted was negative."
    );
  }
  if (num <= 1) {
    return num;
  } else {
    return calculateFibonacci(num - 1) + calculateFibonacci(num - 2);
  }
}

function calculation() {
  let x = document.getElementById("first_value").value;
  document.getElementById("result").innerText = calculateFibonacci(x);
}

let button = document.getElementById("calculate-btn");
button.addEventListener("click", calculation);

const url = "http://localhost:5050/fibonacci/10";

fetch(url)
  .then(res => res.json())
  .then(function(data) {
    console.log(data);
    console.log(data.result);
  });

//https://randomuser.me/api/?results=10
