function calculateFibonacci() {
  let x = document.getElementById("x_value").value;

  if (isNaN(x)) {
    alert("Please insert a number");
    return console.error("The input was not a number");
  }
  if (x < 0) {
    alert(
      "The regular Fibonacci Sequence includes only positive number, the number inserted was negative"
    );
    return console.error(
      "The regular Fibonacci Sequence includes only positive number, the number inserted was negative."
    );
  }

  if (x <= 1) {
    return x;
  } else {
    fetch(`http://localhost:5050/fibonacci/${x}`)
      .then(res => res.json())
      .then(function fetchResult(data) {
        document.getElementById("result-space").innerText = data.result;
      });
  }
}

let button = document.getElementById("calculate-btn");
button.addEventListener("click", calculateFibonacci);
