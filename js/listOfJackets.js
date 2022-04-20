//import utilities
import { addFavs } from "./functions/favourites.js";
import { fetchProductsInCart } from "./functions/addToCartFunction.js";

//call imported function
const favs = addFavs();

//fetch the query string to set heading accordingly
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const page = params.get("page");

//select element in the dom
let divContainer = document.querySelector(".items-wrapper");

//set api variable
const url =
  "https://rainy-days.melisazor.com/wp-json/wc/store/products?per_page=25";

//make call
async function fetchJackets() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    createHTML(data);
  } catch (error) {
    console.log(error);
  }
}

fetchJackets();

function createHTML(data) {
  //set appropriate heading
  if (page === "womens") {
    divContainer.innerHTML = `<h1>Our most fashionable designs for women</h1>`;
  } else if (page === "mens") {
    divContainer.innerHTML = `<h1>Our most comfortable designs for men</h1>`;
  } else {
    divContainer.innerHTML = `<h1>Our latest and most modern designs</h1>`;
  }

  data.forEach((jacket) => {
    //check if item is already stored
    const isJacketStored = favs.find((fav) => {
      return parseInt(fav.id) === jacket.id;
    });

    //if item is stored change styles in jackets page
    let heartClass = "far";
    if (isJacketStored) {
      heartClass = "fas";
    }
    divContainer.innerHTML += `<div class="items">
      <div>
          <a href="../shop/jackets.html?id=${jacket.id}"
          ><img
              alt="${jacket.short_description}"
              class="jacket-image"
              src="${jacket.images[0].src}"
          /></a>
      </div>
      <div class="jacket-info">
          <h2>
          <a href="../shop/jackets.html?id=${jacket.id}">${jacket.name}</a>
          </h2>
          <div>${jacket.short_description}</div>
          <div>&dollar;${jacket.prices.price}</div>
          <div>
            <div>
                 <i class="${heartClass} fa-heart"
                 data-id="${jacket.id}"
                 data-name="${jacket.name}"
                 data-type="${jacket.short_description}"
                 data-image="${jacket.images[0].src}"
                 data-price="&dollar;${jacket.prices.price}"></i>
            </div>
          <div>
          <a href="../shop/jackets.html?id=${jacket.id}" class="cta cta-small">Buy</a>
              </div>
          </div>
      </div>
     </div>`;
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
