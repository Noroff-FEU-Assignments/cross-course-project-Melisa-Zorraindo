//import array from file
import { jacketList } from "./modules/list-of-jackets.mjs";

//fetch the query string to set heading accordingly
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const page = params.get("page");

//select element in the dom
let divContainer = document.querySelector(".items-wrapper");

//function to create HTML
function createHTML(jacketList) {
  //set appropriate heading
  if (page === "womens") {
    divContainer.innerHTML = `<h1>Our most fashionable designs for women</h1>`;
  } else if (page === "mens") {
    divContainer.innerHTML = `<h1>Our most comfortable designs for men</h1>`;
  } else {
    divContainer.innerHTML = `<h1>Our latest and most modern designs</h1>`;
  }

  //create rest of HTML
  jacketList.forEach((jacket) => {
    divContainer.innerHTML += `<div class="items">
                                <div>
                                    <a href="../shop/jackets.html?id=${jacket.id}"
                                    ><img
                                        alt="${jacket.type}"
                                        class="jacket-image"
                                        src="${jacket.image}"
                                    /></a>
                                </div>
                                <div class="jacket-info">
                                    <h2>
                                    <a href="../shop/jackets.html?id=${jacket.id}">${jacket.name}</a>
                                    </h2>
                                    <p>${jacket.type}</p>
                                    <p>&dollar; ${jacket.price}</p>
                                    <div class="interactions">
                                        <div>
                                            <i class="far fa-heart"></i>
                                        </div>
                                        <div>
                                        <a href="../shop/jackets.html?id=${jacket.id}" class="cta cta-small">Buy</a>
                                        </div>
                                    </div>
                                </div>
                               </div>`;
  });
}

createHTML(jacketList);
