const callbackForm = document.querySelector('.callback-form-container');
const requestReceivedModal = document.querySelector('#request-received');

const userName = document.querySelector('#callback-form-input-name');
const userEmail = document.querySelector('#callback-form-input-email');
const userPhone = document.querySelector('#callback-form-input-phone');

userPhone.addEventListener('click', function() {
  if (!userPhone.value.trim()) {
    userPhone.value = '+380';
  }
});

// если пользователь кликает вне данного элемента, то событие называется blur
userPhone.addEventListener('blur', function() {
  if (!userPhone.value === '+380') {
    userPhone.value = '';
  }
});

callbackForm.addEventListener('submit', function(event) {

  event.preventDefault();

  if (!userName.value) {
    userName.classList.add('.callback-form-input-error');
    return;
  }
  // let hasError = false;

  // if (!userName.value.trim()) {
  //   userName.classList.add('.callback-form-input-error');
  //   console.log(userName.value);
  //   let hasError = true;
  // } else {
  //   userName.classList.remove('.callback-form-input-error');
  // }
  // if (!userEmail.value.trim() || !isEmailValid(userEmail.value)) {
  //   userEmail.classList.add('.callback-form-input-error');
  //   let hasError = true;
  // } else {
  //   userEmail.classList.remove('.callback-form-input-error');
  // }
  // if (!userPhone.value.trim() || !isPhoneValid(userPhone.value)) {
  //   userPhone.classList.add('.callback-form-input-error');
  //   let hasError = true;
  // } else {
  //   userPhone.classList.remove('.callback-form-input-error');
  // }

  // if (hasError) {
  //   return;
  // }

  // userName.value = '';
  // userEmail.value = '';
  // userPhone.value = '';

  // доступ к классам и их добавлению возможно через classList
  requestReceivedModal.classList.add('modal-active');

  // через указанное время модальное окно автоматически закрывается
  setTimeout(function() {
    requestReceivedModal.classList.remove('modal-active');
  },2000)

});

function isPhoneValid(phone = '') {
  const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

  return phone.match(regexp);
}

function isEmailValid(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}