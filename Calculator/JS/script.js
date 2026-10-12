(function () {
  const displayEl = document.getElementById('display');
  const historyEl = document.getElementById('history');
  const symbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

  let current = '0';      // الرقم المعروض حاليًا
  let previous = null;    // الرقم الأول
  let operator = null;    // العملية
  let overwrite = true;   // هل الرقم القادم يستبدل المعروض؟

  function format(str) {
    if (str === 'Error') return str;
    const neg = str.startsWith('-');
    const [int, dec] = str.replace('-', '').split('.');
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '-' : '') + grouped + (dec !== undefined ? '.' + dec : '');
  }

  function render() {
    const text = format(current);
    displayEl.textContent = text;
    // تصغير الخط تلقائيًا لو الرقم طويل
    const len = text.length;
    displayEl.style.fontSize = len > 14 ? '1.5rem' : len > 11 ? '1.9rem' : len > 8 ? '2.3rem' : '2.8rem';
    historyEl.textContent = operator ? format(previous) + ' ' + symbols[operator] : '';
    document.querySelectorAll('.operator-btn[data-op]').forEach(b => {
      b.classList.toggle('selected', overwrite && operator === b.dataset.op);
    });
  }

  function compute(a, b, op) {
    const x = parseFloat(a), y = parseFloat(b);
    let r;
    switch (op) {
      case '+': r = x + y; break;
      case '-': r = x - y; break;
      case '*': r = x * y; break;
      case '/': if (y === 0) return 'Error'; r = x / y; break;
      default: return b;
    }
    // تجنب أخطاء الفاصلة العائمة مثل 0.1 + 0.2
    return String(parseFloat(r.toPrecision(12)));
  }

  function inputNumber(n) {
    if (current === 'Error') clearAll();
    if (overwrite) { current = n; overwrite = false; }
    else if (current.replace(/[-.]/g, '').length < 15) {
      current = current === '0' ? n : current + n;
    }
    render();
  }

  function inputDot() {
    if (current === 'Error') clearAll();
    if (overwrite) { current = '0.'; overwrite = false; }
    else if (!current.includes('.')) current += '.';
    render();
  }

  function chooseOperator(op) {
    if (current === 'Error') return;
    if (operator && !overwrite) {
      current = compute(previous, current, operator);
      if (current === 'Error') { operator = null; previous = null; overwrite = true; render(); return; }
    }
    previous = current;
    operator = op;
    overwrite = true;
    render();
  }

  function equals() {
    if (!operator || current === 'Error') return;
    const expr = format(previous) + ' ' + symbols[operator] + ' ' + format(current) + ' =';
    current = compute(previous, current, operator);
    operator = null;
    previous = null;
    overwrite = true;
    render();
    historyEl.textContent = current === 'Error' ? '' : expr;
  }

  function clearAll() {
    current = '0'; previous = null; operator = null; overwrite = true;
    render();
  }

  function toggleSign() {
    if (current === 'Error' || current === '0') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
    render();
  }

  function percent() {
    if (current === 'Error') return;
    current = String(parseFloat((parseFloat(current) / 100).toPrecision(12)));
    overwrite = true;
    render();
  }

  function backspace() {
    if (overwrite || current === 'Error') return;
    current = current.length > 1 && !(current.length === 2 && current.startsWith('-'))
      ? current.slice(0, -1) : '0';
    render();
  }

  document.getElementById('keys').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.dataset.num !== undefined) inputNumber(btn.dataset.num);
    else if (btn.dataset.op) chooseOperator(btn.dataset.op);
    else {
      switch (btn.dataset.action) {
        case 'clear': clearAll(); break;
        case 'sign': toggleSign(); break;
        case 'percent': percent(); break;
        case 'dot': inputDot(); break;
        case 'equals': equals(); break;
      }
    }
  });

  // دعم الكيبورد
  document.addEventListener('keydown', e => {
    const k = e.key;
    if (/^[0-9]$/.test(k)) inputNumber(k);
    else if (k === '.' || k === ',') inputDot();
    else if ('+-*/'.includes(k)) { e.preventDefault(); chooseOperator(k); }
    else if (k === 'Enter' || k === '=') { e.preventDefault(); equals(); }
    else if (k === 'Backspace') backspace();
    else if (k === 'Escape' || k === 'Delete') clearAll();
    else if (k === '%') percent();
  });

  render();
})();