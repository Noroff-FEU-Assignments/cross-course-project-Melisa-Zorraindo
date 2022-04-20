//import array from file
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

//query string to display correct jacket
const queryStringJacket = document.location.search;
const paramsJacket = new URLSearchParams(queryStringJacket);
const id = paramsJacket.get("id");
const apiUrl =
  "https://rainy-days.melisazor.com/wp-json/wc/store/products/" + id;

//select elements in the dom
const breadcrumbsCurrent = document.querySelector(".breadcrumbs-current");
const productContainer = document.querySelector(".product-info");
const descriptionContainer = document.querySelector(".item-description");
const pageTitle = document.querySelector("title");

//make call
async function fetchSpecificJacket() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    createHTML(data);
  } catch (error) {
    console.log(error);
  }
}

fetchSpecificJacket();

function createHTML(jacket) {
  //update title
  pageTitle.innerText = `Rainy Days | ${
    jacket.name
  } - ${jacket.short_description
    .replace("<div>", " ")
    .replace("<div>", " ")
    .replace("</div>", " ")
    .replace("</div>", " ")}`;

  //update breadcrumbs
  breadcrumbsCurrent.innerText = jacket.name;
  breadcrumbsCurrent.style.textTransform = "lowercase";

  //create image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("product-image");
  productContainer.append(imageContainer);

  //create image and append to previous container
  const picture = document.createElement("img");
  picture.alt = jacket.short_description;
  picture.classList.add("jacket-image");
  picture.src = jacket.images[0].src;
  imageContainer.append(picture);

  //create jacket information container
  const productInfo = document.createElement("div");
  productInfo.classList.add("jacket-info");
  productContainer.append(productInfo);

  //create heading div
  const headingDiv = document.createElement("div");
  headingDiv.classList.add("product-heading");
  productInfo.append(headingDiv);

  //create heading and type
  const newHeading = document.createElement("h1");
  newHeading.innerText = jacket.name;
  headingDiv.append(newHeading);

  const newType = document.createElement("div");
  newType.innerText = jacket.short_description
    .replace("<div>", " ")
    .replace("<div>", " ")
    .replace("</div>", " ")
    .replace("</div>", " ");
  headingDiv.append(newType);

  //create rating and price container
  const newSubheading = document.createElement("div");
  newSubheading.classList.add("product-subheading");
  productInfo.append(newSubheading);

  //create rating
  const starsLink = document.createElement("a");
  starsLink.setAttribute(
    "href",
    `../shop/jackets.html?id=${jacket.id}#reviews`
  );
  newSubheading.append(starsLink);

  //create stars
  const starsUl = document.createElement("ul");
  starsLink.append(starsUl);
  for (let i = 0; i < 5; i++) {
    let starsLi = document.createElement("li");
    starsLi.style.padding = "0.2rem";
    starsUl.append(starsLi);
    const stars = document.createElement("i");
    stars.classList.add("fas", "fa-star");
    starsLi.append(stars);
  }

  //create price
  const newPrice = document.createElement("p");
  newPrice.innerText = `$ ${jacket.prices.price}`;
  newSubheading.append(newPrice);

  //create colours
  const newH2Colours = document.createElement("h2");
  newH2Colours.innerText = "Colours";
  productInfo.append(newH2Colours);

  const coloursUl = document.createElement("ul");
  coloursUl.classList.add("colour-wrapper");
  productInfo.append(coloursUl);

  for (let i = 0; i < jacket.attributes[1].terms.length; i++) {
    let coloursLi = document.createElement("li");
    coloursLi.classList.add("colour-box");
    coloursUl.append(coloursLi);

    let colourIcon = document.createElement("i");
    colourIcon.classList.add("far", "fa-square");
    colourIcon.style.color = jacket.attributes[1].terms[i].name;
    coloursLi.append(colourIcon);

    let colourName = document.createElement("p");
    colourName.innerText = jacket.attributes[1].terms[i].name;
    coloursLi.append(colourName);
  }

  //chose colours function
  const selectedColour = document.querySelectorAll(".colour-box");
  const selectedIcon = document.querySelectorAll(".fa-square");

  //run through the colours array and listen for a click to change icon style
  for (let j = 0; j < selectedColour.length; j++) {
    selectedColour[j].addEventListener("click", function () {
      for (let k = 0; k < selectedIcon.length; k++) {
        //remove the class from all other icons
        selectedIcon[k].classList.remove("fas");
        //add it to the one clicked on
        selectedIcon[j].classList.add("fas");
      }
      //update picture according to colour
      picture.src = jacket.images[j + 1].src;
    });
  }

  //create sizes
  const newH2Sizes = document.createElement("h2");
  newH2Sizes.innerText = "Sizes";
  productInfo.append(newH2Sizes);

  const sizesUl = document.createElement("ul");
  sizesUl.classList.add("size-choices");
  productInfo.append(sizesUl);

  for (let l = 0; l < jacket.attributes[0].terms.length; l++) {
    let sizesLi = document.createElement("li");
    sizesLi.classList.add("sizes-box");
    sizesUl.append(sizesLi);

    const sizeButton = document.createElement("button");
    sizeButton.classList.add("size-button");
    sizeButton.innerText = jacket.attributes[0].terms[l].name;
    sizesLi.append(sizeButton);
  }

  //chose size function
  const selectedSize = document.querySelectorAll(".sizes-box");
  const selectedButton = document.querySelectorAll(".size-button");

  //run through the buttons array and listen for a click to change button style
  for (let m = 0; m < selectedSize.length; m++) {
    selectedSize[m].addEventListener("click", function () {
      for (let n = 0; n < selectedButton.length; n++) {
        //remove the class from all other buttons
        selectedButton[n].style.backgroundColor = "#e9e9ed";
        selectedButton[n].style.color = "black";
        //add it to the one clicked on
        selectedButton[m].style.backgroundColor = "#265591";
        selectedButton[m].style.color = "white";
      }
    });
  }

  //create call to action
  const ctaDiv = document.createElement("div");
  ctaDiv.classList.add("call-to-action-div");
  productInfo.append(ctaDiv);

  const ctaButton = document.createElement("button");
  ctaButton.classList.add("cta", "cta-specific-product");
  ctaButton.innerText = "Add to cart";
  ctaButton.dataset.id = jacket.id;
  ctaButton.dataset.image = jacket.images[0].src;
  ctaButton.dataset.name = jacket.name;
  ctaButton.dataset.type = jacket.short_description;
  ctaButton.dataset.price = jacket.prices.price;
  ctaDiv.append(ctaButton);

  //create product description
  const newH2Description = document.createElement("h2");
  newH2Description.innerText = "Product description";
  descriptionContainer.append(newH2Description);

  const descriptionCopy = document.createElement("p");
  descriptionCopy.innerText = jacket.description
    .replace("<div>", " ")
    .replace("<div>", " ")
    .replace("</div>", " ")
    .replace("</div>", " ");
  descriptionContainer.append(descriptionCopy);

  //create product specs
  const newH2Specs = document.createElement("h2");
  newH2Specs.innerText = "Product specifications";
  descriptionContainer.append(newH2Specs);

  const specsUl = document.createElement("ul");
  specsUl.style.display = "block";
  specsUl.style.paddingLeft = "40px";
  specsUl.style.listStyle = "disc";
  descriptionContainer.append(specsUl);

  for (let o = 0; o < jacket.categories.length; o++) {
    let specsLi = document.createElement("li");
    specsLi.innerText = jacket.categories[o].name;
    specsLi.style.textAlign = "left";
    specsLi.style.paddingLeft = "1rem";
    specsUl.append(specsLi);
  }

  //create recommended sports
  const newH2Sports = document.createElement("h2");
  newH2Sports.innerText = "Recommended for";
  descriptionContainer.append(newH2Sports);

  const sportsUl = document.createElement("ul");
  sportsUl.style.display = "block";
  sportsUl.style.paddingLeft = "40px";
  sportsUl.style.listStyle = "disc";
  descriptionContainer.append(sportsUl);

  for (let p = 0; p < jacket.tags.length; p++) {
    let sportsLi = document.createElement("li");
    sportsLi.innerText = jacket.tags[p].name;
    sportsLi.style.textAlign = "left";
    sportsLi.style.paddingLeft = "1rem";
    sportsUl.append(sportsLi);
  }

  //append second cta at the bottom of the page
  const ctaSupportButtonDiv = document.querySelector(".call-to-action-div-one");
  const ctaSupportButton = document.createElement("button");
  ctaSupportButton.classList.add("cta", "cta-specific-product");
  ctaSupportButton.innerText = "Add to cart";
  ctaSupportButton.dataset.id = jacket.id;
  ctaSupportButton.dataset.image = jacket.images[0].src;
  ctaSupportButton.dataset.name = jacket.name;
  ctaSupportButton.dataset.type = jacket.short_description;
  ctaSupportButton.dataset.price = jacket.prices.price;
  ctaSupportButtonDiv.append(ctaSupportButton);

  //select modal popup elements in the dom
  const body = document.querySelector("body");
  const modalPopup = document.querySelector(".popup-box");
  const overlay = document.querySelector(".overlay");
  const closePopupButton = document.querySelector(".close-modal");
  const addToCartButton = document.querySelectorAll(".cta-specific-product");

  //open close modal popup
  function openPopup() {
    modalPopup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    body.style.overflow = "hidden";
  }

  function closePopup() {
    modalPopup.classList.add("hidden");
    overlay.classList.add("hidden");
    body.style.overflow = "auto";
  }

  for (let i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener("click", openPopup);
  }

  closePopupButton.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  //select elements for trolley page
  const cartBtn = document.querySelectorAll(".cta-specific-product");

  for (let j = 0; j < cartBtn.length; j++) {
    cartBtn[j].addEventListener("click", addToCart);
  }

  function addToCart() {
    const id = this.dataset.id;
    const image = this.dataset.image;
    const name = this.dataset.name;
    const type = this.dataset.type;
    const price = this.dataset.price;

    const productsInCart = fetchProductsInCart();

    const productStored = productsInCart.find(function (item) {
      return item.id === id;
    });

    if (!productStored) {
      const product = {
        id: id,
        image: image,
        name: name,
        type: type,
        price: price,
      };

      productsInCart.push(product);

      saveProduct(productsInCart);
    } /*  else {
    //this part is removing the product if it's already stored
    const newItemToPurchase = currentFavs.filter((fav) => fav.id !== id);
    saveProduct(newItemToPurchase);
  } */
  }

  //function to store in local storage
  function saveProduct(itemToPurchase) {
    localStorage.setItem("cart", JSON.stringify(itemToPurchase));
  }

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
}
