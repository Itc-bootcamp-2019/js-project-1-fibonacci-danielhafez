x = 16;
document.getElementById("x").innerText = x;

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
y = calculateFibonacci(x);
document.getElementById("y").innerText = y;
