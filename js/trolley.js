//import array from file
// import { jacketList } from "./modules/list-of-jackets.mjs";
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

const itemsToBuy = fetchProductsInCart();

//select elements in the DOM
const shoppingBasketContainer = document.querySelector(".basket-div");

//create HTML in case items in cart = 0
if (itemsToBuy.length === 0) {
  const emptyTrolley = document.createElement("div");
  shoppingBasketContainer.append(emptyTrolley);

  const cartPara = document.createElement("p");
  cartPara.innerText = "Your shopping cart is currently empty ";
  cartPara.classList.add("favs-para");
  emptyTrolley.append(cartPara);

  const linkToShop = document.createElement("a");
  linkToShop.innerText = "Start shopping";
  linkToShop.classList.add("cta");
  linkToShop.setAttribute("href", "/shop.html");
  emptyTrolley.append(linkToShop);
} else {
  const itemsToBuyDiv = document.createElement("div");
  itemsToBuyDiv.classList.add("items-to-buy");
  shoppingBasketContainer.append(itemsToBuyDiv);

  //create summary card
  const summaryDiv = document.createElement("div");
  summaryDiv.classList.add("summary-wrapper");
  shoppingBasketContainer.append(summaryDiv);

  const summaryHeading = document.createElement("h2");
  summaryHeading.innerText = "Summary";
  summaryHeading.style.fontWeight = "bold";
  summaryHeading.style.marginBottom = "1.5rem";
  summaryDiv.append(summaryHeading);

  const subtotal = document.createElement("div");
  summaryDiv.append(subtotal);

  const subtotalDivOne = document.createElement("div");
  subtotalDivOne.classList.add("summary-info");
  subtotal.append(subtotalDivOne);

  const subtotalPara = document.createElement("p");
  subtotalPara.innerText = "Subtotal";
  subtotalPara.style.marginBottom = "0.5rem";
  subtotalDivOne.append(subtotalPara);

  const subtotalSum = document.createElement("p");
  subtotalSum.classList.add("subtotal-sum");
  subtotalSum.innerText = "";
  subtotalSum.style.marginBottom = "0.5rem";
  subtotalDivOne.append(subtotalSum);

  const subtotalDivTwo = document.createElement("div");
  subtotalDivTwo.classList.add("summary-info");
  subtotal.append(subtotalDivTwo);

  const shippingPara = document.createElement("p");
  shippingPara.innerText = "Shipping cost";
  shippingPara.style.marginBottom = "0.5rem";
  subtotalDivTwo.append(shippingPara);

  const shippingSum = document.createElement("p");
  shippingSum.innerText = "Free";
  shippingSum.style.marginBottom = "0.5rem";
  subtotalDivTwo.append(shippingSum);

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("summary-info");
  subtotal.append(totalDiv);

  const totalPara = document.createElement("p");
  totalPara.innerText = "Total";
  totalPara.style.fontWeight = "bold";
  totalDiv.append(totalPara);

  const totalSum = document.createElement("p");
  totalSum.classList.add("total-sum");
  totalSum.innerText = "";
  totalSum.style.fontWeight = "bold";
  totalDiv.append(totalSum);

  const ctaDiv = document.createElement("div");
  summaryDiv.append(ctaDiv);

  const ctaPrimary = document.createElement("a");
  ctaPrimary.setAttribute("href", "../payment.html");
  ctaPrimary.classList.add("cta");
  ctaPrimary.innerText = "Check out";
  ctaDiv.append(ctaPrimary);

  const ctaSecondary = document.createElement("a");
  ctaSecondary.setAttribute("href", "../shop.html");
  ctaSecondary.classList.add("cta", "cta-secondary");
  ctaSecondary.innerText = "Continue shopping";
  ctaDiv.append(ctaSecondary);

  itemsToBuy.forEach((jacket) => {
    //create outer container
    const newCardContainer = document.createElement("div");
    newCardContainer.classList.add("purchase-items");
    itemsToBuyDiv.append(newCardContainer);

    //create card container
    const newCardContent = document.createElement("div");
    newCardContainer.append(newCardContent);

    //create image
    const newCardImageLink = document.createElement("a");
    newCardImageLink.setAttribute(
      "href",
      `../shop/jackets.html?id=${jacket.id}`
    );
    newCardContent.append(newCardImageLink);

    const newCardImage = document.createElement("img");
    newCardImage.alt = jacket.type;
    newCardImage.classList.add("jacket-image");
    newCardImage.src = jacket.image;
    newCardContent.append(newCardImage);

    //create brief
    const newCardBriefDiv = document.createElement("div");
    newCardBriefDiv.classList.add("jacket-summary");
    newCardContainer.append(newCardBriefDiv);

    const newCardHeading = document.createElement("h2");
    newCardHeading.innerText = jacket.name;
    newCardBriefDiv.append(newCardHeading);

    const newCardSubheading = document.createElement("p");
    newCardSubheading.innerText = jacket.type;
    newCardBriefDiv.append(newCardSubheading);

    const newCardPrice = document.createElement("p");
    newCardPrice.classList.add("item-price");
    newCardPrice.style.fontStyle = "italic";
    newCardPrice.style.fontWeight = "bold";
    newCardPrice.innerText = "$ " + jacket.price;
    newCardBriefDiv.append(newCardPrice);

    //create icons to add or remove product
    const newCardHandleProduct = document.createElement("div");
    newCardHandleProduct.classList.add("icons-box");
    newCardBriefDiv.append(newCardHandleProduct);

    const deleteIcon = document.createElement("i");
    deleteIcon.style.cursor = "pointer";
    deleteIcon.classList.add("fas", "fa-trash-alt");
    newCardHandleProduct.append(deleteIcon);

    const updateNumber = document.createElement("div");
    updateNumber.classList.add("update-number-wrapper");
    newCardHandleProduct.append(updateNumber);

    const numberInput = document.createElement("input");
    numberInput.setAttribute("type", "number");
    numberInput.setAttribute("placeholder", 1);
    numberInput.style.width = "1.8rem";
    updateNumber.append(numberInput);
  });
}
//select elements in the DOM
const totalValueJacket = document.querySelectorAll(".item-price");
const subtotalAmount = document.querySelector(".subtotal-sum");
const totalAmount = document.querySelector(".total-sum");

//set total and subtotal amounts programmatically
function updatePrices() {
  let finalPrice = 0;
  for (let l = 0; l < totalValueJacket.length; l++) {
    let price = parseInt(totalValueJacket[l].innerText.replace("$", " "));
    finalPrice += price;
    subtotalAmount.innerText = "$" + finalPrice;
    totalAmount.innerText = "$" + finalPrice;
  }
}
updatePrices();

//remove items from the list using the bin icon
//and update price when item removed
const binIcon = document.querySelectorAll(".fa-trash-alt");

//select modal popup elements in the dom
const body = document.querySelector("body");
const modalPopup = document.querySelector(".popup-box");
const overlay = document.querySelector(".overlay");
const closePopupButton = document.querySelector(".close-modal");
const confirmRemoval = document.querySelector(".cta-confirm-action");
const abortRemoval = document.querySelector(".cta-abort-removal");

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

binIcon.forEach((icon) => {
  icon.addEventListener("click", deleteItem);
});

// confirmRemoval.addEventListener("click", deleteItem);

function deleteItem() {
  const jacketToRemoveCard = document.querySelectorAll(".purchase-items");

  for (let i = 0; i < jacketToRemoveCard.length; i++) {
    let jacketToRemove = jacketToRemoveCard[i];

    jacketToRemove.addEventListener("click", function () {
      openPopup();

      //if no is clicked
      abortRemoval.addEventListener("click", closePopup);

      //if yes is clicked
      confirmRemoval.addEventListener("click", function () {
        jacketToRemove.remove();
        //
        const newItemsToBuy = itemsToBuy.filter((item) => {
          return item !== itemsToBuy[i];
        });
        saveProduct(newItemsToBuy);
        location.reload();
      });
    });
  }
}

//function to store in local storage
//this function repeats itself in product.js line 289, see refactoring
function saveProduct(itemToPurchase) {
  localStorage.setItem("cart", JSON.stringify(itemToPurchase));
}
//function ends here

//prevent placeholder to take values under one
const numberOfJackets = document.querySelectorAll("input");
for (let j = 0; j < numberOfJackets.length; j++) {
  let productNumber = numberOfJackets[j];
  productNumber.addEventListener("change", function () {
    if (productNumber.value < 1) {
      productNumber.value = 1;
    }
  });
}

//update jacket price when placeholder changes values
//update total price
for (let k = 0; k < totalValueJacket.length; k++) {
  let priceValue = parseInt(totalValueJacket[k].innerText.replace("$", " "));
  let jacketQuantity = document.querySelectorAll("input");

  jacketQuantity[k].addEventListener("change", function () {
    let quantity = jacketQuantity[k].value;
    let totalJacketPrice = priceValue * quantity;
    totalValueJacket[k].innerText = "$ " + totalJacketPrice;
    updatePrices();
  });
}
