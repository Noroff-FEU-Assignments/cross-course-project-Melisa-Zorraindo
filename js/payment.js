//import array from file
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

//select modal popup elements in the dom
const body = document.querySelector("body");
const modalPopup = document.querySelector(".popup-box");
const overlay = document.querySelector(".overlay");
const closePopupButton = document.querySelector(".close-modal");
const checkoutBtn = document.querySelector(".cta");

checkoutBtn.addEventListener("click", openPopup);

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
