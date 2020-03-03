function calculateFibonacci(num) {
  if (num == 0) {
    return 0;
  }
  if (num == 1) {
    return 1;
  } else {
    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
  }
}

function calculation() {
  let x = document.getElementById("first_value").value;
  console.log(x);
  result = calculateFibonacci(x);
  document.getElementById("result").innerText = result;
}
