//import array from file
// import { jacketList } from "./modules/list-of-jackets.mjs";
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

const itemsToBuy = fetchProductsInCart();

//select elements in the DOM
const shoppingBasketContainer = document.querySelector(".basket-div");

//create HTML in case there are no favs
if (itemsToBuy.length === 0) {
  const emptyTrolley = document.createElement("div");
  shoppingBasketContainer.append(emptyTrolley);

  const favsPara = document.createElement("p");
  favsPara.innerText = "Your shopping cart is currently empty ";
  favsPara.classList.add("favs-para");
  emptyTrolley.append(favsPara);

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
  subtotalSum.innerText = "$ 500";
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
  totalSum.innerText = "$ 500";
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
    newCardPrice.style.fontStyle = "italic";
    newCardPrice.style.fontWeight = "bold";
    newCardPrice.innerText = `$ ${jacket.price}`;
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

    const minusIcon = document.createElement("i");
    minusIcon.style.cursor = "pointer";
    minusIcon.classList.add("fas", "fa-minus-square");
    updateNumber.append(minusIcon);

    const numberInput = document.createElement("input");
    numberInput.setAttribute("type", numberInput);
    numberInput.setAttribute("placeholder", 1);
    numberInput.style.borderColor = "black";
    numberInput.style.width = "1rem";
    numberInput.style.textAlign = "center";
    updateNumber.append(numberInput);

    const plusIcon = document.createElement("i");
    plusIcon.style.cursor = "pointer";
    plusIcon.style.marginLeft = "0";
    plusIcon.classList.add("fas", "fa-plus-square");
    updateNumber.append(plusIcon);
  });
}
