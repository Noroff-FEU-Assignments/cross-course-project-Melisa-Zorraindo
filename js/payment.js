//import array from file
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

//select modal popup elements in the dom
const body = document.querySelector("body");
const modalPopup = document.querySelector(".popup-box");
const overlay = document.querySelector(".overlay");
const closePopupButton = document.querySelector(".close-modal");

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

//update number of items in trolley
const itemsToBuy = fetchProductsInCart();
const numberItemsInTrolley = document.querySelector(
  ".second-navigation a span"
);

function updateNumberOfItemsInTrolley() {
  let itemQuantity = 0;
  for (let m = 0; m < itemsToBuy.length; m++) {
    itemQuantity = m + 1;
  }
  numberItemsInTrolley.innerText = itemQuantity;
}

updateNumberOfItemsInTrolley();

//form
const form = document.querySelector(".form-wrapper");
const submitButton = document.querySelector(".cta");
console.log(submitButton);
submitButton.disabled = true;
submitButton.classList.add("disabled");

const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const postcode = document.querySelector("#postcode");
const country = document.querySelector("#country");

function validateForm() {
  if (
    checkLengths(fullName.value, 1) &&
    checkEmail(email.value) &&
    checkLengths(address.value, 1) &&
    checkLengths(city.value, 1) &&
    checkLengths(postcode.value, 1) &&
    checkLengths(country, 1)
  ) {
    submitButton.disabled = false;
    submitButton.classList.remove("disabled");
  } /* else {
    submitButton.disabled = true;
    submitButton.classList.add("disabled");
  } */
}

fullName.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);
address.addEventListener("keyup", validateForm);
city.addEventListener("keyup", validateForm);
postcode.addEventListener("keyup", validateForm);
country.addEventListener("keyup", validateForm);

function submitForm(event) {
  event.preventDefault();
  openPopup();
  submitButton.disabled = true;
  submitButton.classList.add("disabled");
  form.reset();
}

form.addEventListener("submit", submitForm);

function checkLengths(val, len) {
  if (val.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const regExMatches = regEx.test(email);
  return regExMatches;
}
