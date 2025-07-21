const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyDiv = document.getElementById('history');

let currentInput = '';

function formatNumber(input) {
  return input.replace(/\d+(\.\d+)?/g, match => {
    return Number(match).toLocaleString('id-ID');
  });
}

function addToHistory(expression, result) {
  const item = document.createElement('div');
  item.textContent = `${formatNumber(expression)} = ${Number(result).toLocaleString('id-ID')}`;
  historyDiv.appendChild(item);
  historyDiv.scrollTop = historyDiv.scrollHeight;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');

    if (value === 'C') {
      currentInput = '';
      display.value = '';
    } else if (value === '=') {
      try {
        const result = eval(currentInput);
        addToHistory(currentInput, result);
        currentInput = result.toString();
        display.value = Number(result).toLocaleString('id-ID');
      } catch (error) {
        display.value = 'Error';
        currentInput = '';
      }
    } else {
      currentInput += value;
      display.value = formatNumber(currentInput);
    }
  });
});
