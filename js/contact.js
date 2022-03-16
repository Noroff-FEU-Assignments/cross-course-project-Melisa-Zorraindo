const form = document.querySelector(".contact-form");

const firstName = document.querySelector("#name");
const errorName = document.querySelector("#error-name");

const subject = document.querySelector("#subject");
const errorSubject = document.querySelector("#error-subject");

const email = document.querySelector("#email");
const errorEmail = document.querySelector("#error-email");

const successMessage = document.querySelector(".success-message");
const instructionsForm = document.querySelector(".instructions-para");

function validateForm(event) {
  event.preventDefault();

  if (
    checkLengths(firstName.value, 1) ||
    checkLengths(subject.value, 10) ||
    !checkEmail(email.value)
  ) {
    errorName.style.display = "block";
    errorSubject.style.display = "block";
    errorEmail.style.display = "block";
    return false;
  }

  if (checkLengths && checkEmail) {
    successMessage.style.display = "block";
    instructionsForm.style.display = "none";
    errorName.style.display = "none";
    errorSubject.style.display = "none";
    errorEmail.style.display = "none";
  }
  form.reset();
}

form.addEventListener("submit", validateForm);

function checkLengths(val, len) {
  if (val.trim().length < len) {
    return true;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const regExMatches = regEx.test(email);
  return regExMatches;
}
