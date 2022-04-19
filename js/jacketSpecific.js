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
  pageTitle.innerText = `Rainy Days | ${jacket.name} - ${jacket.images[0].alt}`;

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

  const newType = document.createElement("p");
  newType.innerText = jacket.short_description;
  headingDiv.append(newType);
}
