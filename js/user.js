//import utilities
import { addFavs } from "./functions/favourites.js";

//call imported function
const favs = addFavs();

//select elements in the DOM
const favsDiv = document.querySelector(".items-wrapper");

//create HTML
favs.forEach((fav) => {
  //clear existing HTML
  const noFavs = document.querySelector(".favs-para");
  noFavs.classList.toggle("no-display");

  //create item card
  const jacketCard = document.createElement("div");
  jacketCard.classList.add("items");
  favsDiv.append(jacketCard);

  //create image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("product-image");
  jacketCard.append(imageContainer);

  //create image and append to previous container
  const picture = document.createElement("img");
  picture.alt = fav.type;
  picture.classList.add("jacket-image");
  picture.src = fav.image;
  imageContainer.append(picture);

  //create jacket information container
  const productInfo = document.createElement("div");
  productInfo.classList.add("jacket-info");
  jacketCard.append(productInfo);

  //create heading div
  const headingDiv = document.createElement("div");
  headingDiv.classList.add("product-heading");
  productInfo.append(headingDiv);

  //create heading and type
  const newHeading = document.createElement("h3");
  newHeading.innerText = fav.name;
  headingDiv.append(newHeading);

  const newType = document.createElement("p");
  newType.innerText = fav.type;
  headingDiv.append(newType);

  //create price
  const newPrice = document.createElement("p");
  newPrice.innerText = fav.price;
  headingDiv.append(newPrice);

  //create fav icon
  const likeHeart = document.createElement("i");
  likeHeart.classList.add("fas", "fa-heart");
  headingDiv.append(likeHeart);
});
