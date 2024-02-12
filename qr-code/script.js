const container = document.querySelector('.container'),
  form = container.querySelector('.form'),
  input = container.querySelector('.form input'),
  btn = container.querySelector('.form button'),
  img = container.querySelector('.qr-code img');

let currentInput;
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputValue = input.value.trim();
  if (!inputValue || inputValue == currentInput) {
    return;
  }
  currentInput == inputValue;
  btn.textContent = 'Генерація qr-коду ...';
  img.src = `https:/api.qrserver.com/v1/create-qr-code/?size=200x200&data=${inputValue}`;
  img.addEventListener('load', () => {
    container.classList.add('active');
    btn.textContent = 'Згенерувати QR-код';
  });
  img.addEventListener('error', () => {
    alert('Error with qr-code generation.');
    location.reload();
  });
  input.addEventListener('input', function () {
    if (!this.value.trim() && container.classList.contains('active')) {
      container.classList.remove('active');
    }
  });
});
