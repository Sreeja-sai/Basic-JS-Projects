let result = localStorage.getItem('result-key') || '';
displayResult(result);
function calculation(value) {
  result += value;
  localStorage.setItem('result-key', result);
  console.log(result);
  displayResult(result);
}

function displayResult(result) {
  localStorage.setItem('result-key', result);
  document.querySelector('.display-operations').innerHTML = result;
}