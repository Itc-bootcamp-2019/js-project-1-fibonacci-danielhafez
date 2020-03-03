function calculateFibonacci(num) {
  let elementOne = 1;
  let elementTwo = 0;
  let storage;

  if (num === 0) return 0;
  if (num === 1 || num === 2) return 1;
  else {
    for (num; num >= 1; num--) {
      storage = elementOne;
      elementOne = elementOne + elementTwo;
      elementTwo = storage;
    }

    return elementTwo;
  }
}

function calculation() {
  let x = document.getElementById("first_value").value;
  console.log(x);
  result = calculateFibonacci(x);
  document.getElementById("result").innerText = result;
}
