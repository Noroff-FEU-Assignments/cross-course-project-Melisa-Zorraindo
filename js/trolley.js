//import array from file
import { jacketList } from "./modules/list-of-jackets.mjs";

//query string to display correct jacket
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//select elements in the DOM
const shoppingBasketContainer = document.querySelector(".basket-div");

jacketList.forEach((jacket) => {
  if (jacket.id === id) {
    //create outer container
    const newCardContainer = document.createElement("div");
    newCardContainer.classList.add("items");
    shoppingBasketContainer.append(newCardContainer);

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
    newCardBriefDiv.classList.add("jacket-info");
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
    deleteIcon.classList.add("fas", "fa-trash");
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
    numberInput.style.borderColor = "black";
    numberInput.style.width = "1rem";
    updateNumber.append(numberInput);

    const plusIcon = document.createElement("i");
    plusIcon.style.cursor = "pointer";
    plusIcon.style.marginLeft = "0";
    plusIcon.classList.add("fas", "fa-plus-square");
    updateNumber.append(plusIcon);
  }
});
