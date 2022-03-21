//select elements in the form
const form = document.querySelector(".contact-form");
const submitButton = document.querySelector(".cta");
submitButton.disabled = true;
submitButton.classList.add("disabled");

const firstName = document.querySelector("#name");
const errorName = document.querySelector("#error-name");

const subject = document.querySelector("#subject");
const errorSubject = document.querySelector("#error-subject");

const email = document.querySelector("#email");
const errorEmail = document.querySelector("#error-email");

const successMessage = document.querySelector(".success-message");
const instructionsForm = document.querySelector(".instructions-para");

//select modal popup elements in the dom
const body = document.querySelector("body");
const modalPopup = document.querySelector(".popup-box");
const overlay = document.querySelector(".overlay");
const closePopupButton = document.querySelector(".close-modal");

function validateForm() {
  if (checkLengths(firstName.value, 1)) {
    errorName.style.display = "block";
    return false;
  } else {
    errorName.style.display = "none";
  }

  if (checkLengths(subject.value, 5)) {
    errorSubject.style.display = "block";
    return false;
  } else {
    errorSubject.style.display = "none";
  }

  if (!checkEmail(email.value)) {
    errorEmail.style.display = "block";
    return false;
  } else {
    errorEmail.style.display = "none";
  }

  if (checkLengths && checkEmail) {
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");
  }
}

firstName.addEventListener("keyup", validateForm);
subject.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);

function submitForm(event) {
  event.preventDefault();
  submitButton.disabled = true;
  submitButton.classList.add("disabled");
  openPopup();
  form.reset();
}

form.addEventListener("submit", submitForm);

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

//open close modal popup
function openPopup() {
  modalPopup.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
}

//close modal popup
function closePopup() {
  modalPopup.classList.add("hidden");
  overlay.classList.add("hidden");
  body.style.overflow = "auto";
}

closePopupButton.addEventListener("click", closePopup);
overlay.addEventListener("click", closePopup);
