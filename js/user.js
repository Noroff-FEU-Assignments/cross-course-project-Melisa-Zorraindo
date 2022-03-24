//import utilities
import { addFavs } from "./functions/favourites.js";

//select elements in the DOM
const favsDiv = document.querySelector(".items-wrapper");

//call imported function
const favs = addFavs();

//create HTML in case there are no favs
if (favs.length === 0) {
  const favsPara = document.createElement("p");
  favsPara.innerText = "There are no favourites at the moment. ";
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
  newType.innerText = fav.type;
  headingDiv.append(newType);

  //create price
  const newPrice = document.createElement("p");
  newPrice.innerText = fav.price;
  headingDiv.append(newPrice);

  //create fav icon
  const likeHeart = document.createElement("i");
  likeHeart.classList.add("fas", "fa-heart");
  likeHeart.dataset.id = fav.id;
  headingDiv.append(likeHeart);
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
  }
}

//save item clicked to local storage
function storeLikes(chosenItem) {
  localStorage.setItem("favourites", JSON.stringify(chosenItem));
}
