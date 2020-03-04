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

// // const url = "http://localhost:5050/fibonacci/:number";

// fetch(``)
//   .then(function(response) {
//     if (response.status !== 200) {
//       console.log(
//         "Looks like there was a problem. Status Code: " + response.status
//       );
//       return;
//     }
//     response.json().then(function(data) {
//       console.log(data);
//     });
//   })
//   .catch(function(err) {
//     console.log("Fetch Error :-S", err);
//   });

// function calculateFibonacci(num) {
//   let elementOne = 1;
//   let elementTwo = 0;
//   let storage;

//   if (num === 0) return 0;
//   if (num === 1 || num === 2) return 1;
//   else {
//     for (num; num >= 1; num--) {
//       storage = elementOne;
//       elementOne = elementOne + elementTwo;
//       elementTwo = storage;
//     }

//     return elementTwo;
//   }
// }
