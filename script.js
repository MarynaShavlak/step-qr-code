const totalInput = 4;
const correctPassword = '1234';
const varificateInputsList = [
  ...document.querySelectorAll('.box-number > input[type="text"]'),
];

const verifInput1 = document.querySelector('input[name="verificate-1"]');

const makeVerification = () => {
  const password = varificateInputsList.map(input => input.value).join('');
  console.log(password);
  if (password === correctPassword) {
    console.log('Все вірно!');
  } else {
    console.log('Error!');
  }
};

const onVerifInputKeyUp = (input, index) => {
  input.addEventListener('keyup', e => {
    if (!e.target.value) return;
    if (index == totalInput - 1) {
      makeVerification();
      return;
    }
    varificateInputsList[index + 1].focus();
  });
};

varificateInputsList.forEach((input, index) => {
  onVerifInputKeyUp(input, index);
});

verifInput1.addEventListener('paste', async e => {
  try {
    const text = await navigator.clipboard.readText();
    if (text.length !== totalInput) {
      console.log('Error length!');
      return;
    }
    varificateInputsList.forEach((input, i) => {
      input.value = text[i];
    });
    varificateInputsList[totalInput - 1].focus();
    makeVerification();
  } catch (error) {
    console.error('Error reading clipboard:', error);
  }
});
