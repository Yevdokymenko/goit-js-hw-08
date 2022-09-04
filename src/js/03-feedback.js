const throttle = require('lodash.throttle');

// //TODO => initialization

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// //TODO => parse from Locale Storage
let objectStorage = {
  email: '',
  message: '',
};

getInputFromLS();

function getInputFromLS() {
  try {
    const dataLS = localStorage.getItem(STORAGE_KEY);
    if (!dataLS) return;
    objectStorage = JSON.parse(dataLS);
    for (let key in objectStorage) {
      form.elements[key].value = objectStorage[key];
    }
  } catch (error) {
    console.log('Get state error: ', error.message);
  }
}

// TODO => onFormInput callback
function onFormInput(e) {
  objectStorage[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objectStorage));
}

// TODO => onFormSubmit callback
function onFormSubmit(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  const formData = {
    email: email.value,
    message: message.value,
  };

  console.log('This is Form Data:', formData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// TODO => Event Listener
form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);
