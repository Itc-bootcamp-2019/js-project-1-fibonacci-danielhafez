function getValueX(inputOfX) {
  return document.getElementById(inputOfX).value;
}

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

document.getElementById("calculate-btn").onclick = function calculation() {
  let input = getValueX(input);
  let y = calculateFibonacci(input);
  document.getElementById("y").innerText = y;
};
