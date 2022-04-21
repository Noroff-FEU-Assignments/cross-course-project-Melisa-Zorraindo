//import utilities
import { addFavs } from "./functions/favourites.js";
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

const itemsToBuy = fetchProductsInCart();

//select elements in the DOM
const favsDiv = document.querySelector(".items-wrapper");

//call imported function
const favs = addFavs();

//create HTML in case there are no favs
if (favs.length === 0) {
  const favsPara = document.createElement("p");
  favsPara.innerText = "There are no saved jackets at the moment. ";
  favsPara.classList.add("favs-para");
  favsDiv.append(favsPara);

  const linkToShop = document.createElement("a");
  linkToShop.innerText = "Have a look at one of our collections";
  linkToShop.setAttribute("href", "/shop.html");
  favsPara.append(linkToShop);
}

//create HTML
favs.forEach((fav) => {
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
  newType.innerText = fav.type
    .replace("<div>", " ")
    .replace("<div>", " ")
    .replace("</div>", " ")
    .replace("</div>", " ");
  headingDiv.append(newType);

  //create price
  const newPrice = document.createElement("p");
  newPrice.innerText = fav.price;
  headingDiv.append(newPrice);

  //create interactions div
  const interDiv = document.createElement("div");
  interDiv.classList.add("interactions");
  headingDiv.append(interDiv);

  //create fav icon
  const likeHeart = document.createElement("i");
  likeHeart.classList.add("fas", "fa-heart");
  likeHeart.dataset.id = fav.id;
  interDiv.append(likeHeart);

  //create cta
  const ctaWishlist = document.createElement("button");
  ctaWishlist.classList.add("cta", "cta-small");
  ctaWishlist.innerText = "Buy";
  ctaWishlist.dataset.id = fav.id;
  ctaWishlist.dataset.image = fav.image;
  ctaWishlist.dataset.name = fav.name;
  ctaWishlist.dataset.type = fav.type;
  ctaWishlist.dataset.price = fav.price.replace("$", " ");
  interDiv.append(ctaWishlist);
});

//select buttons in the DOM
const likeButton = document.querySelectorAll(".fa-heart");

likeButton.forEach((heart) => {
  heart.addEventListener("click", toggleLikes);
});

//have hearts change styles when clicked
function toggleLikes() {
  this.classList.toggle("far");
  this.classList.toggle("fas");

  //store info to be displayed in favourites page
  const id = this.dataset.id;
  const name = this.dataset.name;
  const type = this.dataset.type;
  const image = this.dataset.image;
  const price = this.dataset.price;

  const itemsLiked = addFavs();

  //check if product is already stored
  const isJacketLiked = itemsLiked.find((item) => {
    return item.id === id;
  });

  //save if isn't, remove if it is
  if (!isJacketLiked) {
    const product = {
      id: id,
      name: name,
      type: type,
      image: image,
      price: price,
    };
    itemsLiked.push(product);
    storeLikes(itemsLiked);
  } else {
    const newItemsLiked = itemsLiked.filter((item) => {
      return item.id !== id;
    });
    storeLikes(newItemsLiked);
    location.reload();
  }
}

//save item clicked to local storage
function storeLikes(chosenItem) {
  localStorage.setItem("favourites", JSON.stringify(chosenItem));
}

//update number of items in trolley
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

//select modal popup elements in the dom
const body = document.querySelector("body");
const modalPopup = document.querySelector(".popup-box");
const overlay = document.querySelector(".overlay");
const closePopupButton = document.querySelector(".close-modal");
const addToCartButton = document.querySelectorAll(".cta-small");

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
const cartBtn = document.querySelectorAll(".cta-small");

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
