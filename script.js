var current = '0';
var stored = null;
var operator = null;
var freshResult = false;

var disp = document.getElementById('display');
var expr = document.getElementById('expr');

function updateDisplay(val) {
  disp.textContent = val;
}

function opSymbol(op) {
  var map = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    '%': '%'
  };

  return map[op] || op;
}

function inputDigit(d) {
  if (freshResult) {
    current = d;
    freshResult = false;
  } else {
    current = (current === '0') ? d : current + d;
  }

  updateDisplay(current);
}

function inputDot() {
  if (!current.includes('.')) {
    current += '.';
  }

  updateDisplay(current);
}

function compute(a, b, op) {

  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return a / b;
  if (op === '%') return a % b;

  return b;
}

function inputOperator(op) {

  if (stored !== null && operator) {

    var result = compute(
      parseFloat(stored),
      parseFloat(current),
      operator
    );

    stored = String(result);
    current = stored;

    updateDisplay(current);

  } else {
    stored = current;
  }

  operator = op;

  expr.textContent =
    stored + ' ' + opSymbol(op);

  freshResult = true;
}

function doEquals() {

  if (operator === null || stored === null)
    return;

  var result = compute(
    parseFloat(stored),
    parseFloat(current),
    operator
  );

  current = String(result);

  updateDisplay(current);

  expr.textContent =
    stored +
    ' ' +
    opSymbol(operator) +
    ' ' +
    current;

  stored = null;
  operator = null;
  freshResult = true;
}

function doBack() {

  if (freshResult) return;

  current =
    current.length > 1
      ? current.slice(0, -1)
      : '0';

  updateDisplay(current);
}

function doClear() {

  current = '0';
  stored = null;
  operator = null;
  freshResult = false;

  updateDisplay('0');

  expr.textContent = '';
}

document.querySelector('.btn-grid')
.addEventListener('click', function(e) {

  var btn = e.target.closest('button');

  if (!btn) return;

  var action = btn.dataset.action;
  var val = btn.dataset.val;

  if (action === 'digit')
    inputDigit(val);

  else if (action === 'op')
    inputOperator(val);

  else if (action === 'dot')
    inputDot();

  else if (action === 'equals')
    doEquals();

  else if (action === 'back')
    doBack();

  else if (action === 'clear')
    doClear();
});