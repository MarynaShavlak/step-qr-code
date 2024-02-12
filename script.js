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
    return 'Код верифікації вірний!';
  } else {
    return 'Некоректний код верифікації!';
  }
};

const focusNextInput = (index, key) => {
  if (!varificateInputsList[index + 1].value && key !== 'Backspace') {
    varificateInputsList[index + 1].focus();
  }
};
const focusPreviousInput = index => {
  if (index > 0) {
    varificateInputsList[index].value = '';
    varificateInputsList[index - 1].focus();
  } else {
    varificateInputsList[index].value = '';
  }
};
const resetInputs = () => {
  varificateInputsList.forEach(input => {
    input.value = '';
  });
  varificateInputsList[0].focus();
};

const handleKeyUp = (input, index) => {
  input.addEventListener('keyup', e => {
    const key = e.key;
    if (!e.target.value) return;
    if (index == totalInput - 1) {
      const verificationResult = makeVerification();
      document.querySelector('.modal__text').textContent = verificationResult;
      return;
    }
    focusNextInput(index, key);
  });
};

const handleKeyDown = (input, index) => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      focusPreviousInput(index);
    }
  });
};

varificateInputsList.forEach((input, index) => {
  handleKeyUp(input, index);
  handleKeyDown(input, index);
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
    const verificationResult = makeVerification();
    document.querySelector('.modal__text').textContent = verificationResult;
  } catch (error) {
    console.error('Error reading clipboard:', error);
  }
});

setupModal();
function setupModal() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    backdrop: document.querySelector('[data-modal]'),
    modal: document.querySelector('.modal'),
  };

  refs.openModalBtn.addEventListener('click', () => {
    resetInputs();
    toggleModal();
  });
  refs.closeModalBtn.addEventListener('click', handleModalClose);
  refs.backdrop.addEventListener('click', toggleModal);
  refs.modal.addEventListener('click', stopPropagation);

  function toggleModal() {
    document.body.classList.toggle('modal-open');
    refs.backdrop.classList.toggle('backdrop--hidden');
  }
  function handleModalClose(e) {
    e.stopPropagation();
    toggleModal();
  }
  function stopPropagation(e) {
    e.stopPropagation();
  }
}
