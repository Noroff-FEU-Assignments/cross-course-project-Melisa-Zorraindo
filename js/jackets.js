//import array from file
import { jacketList } from "./modules/list-of-jackets.mjs";

//select elements in the dom
let divContainer = document.querySelector(".items-wrapper");

//function to create HTML
function createHTML(jacketList) {
  //set new page heading
  divContainer.innerHTML = `<h1>Comes from a variable, think about it</h1>`;

  //create rest f HTML
  jacketList.forEach((jacket) => {
    divContainer.innerHTML += `<div class="items">
                                <div>
                                    <a href="../jackets/alaska.html?=id${jacket.id}"
                                    ><img
                                        alt="${jacket.type}"
                                        class="jacket-image"
                                        src="${jacket.image}"
                                    /></a>
                                </div>
                                <div class="jacket-info">
                                    <h2>
                                    <a href="../jackets/alaska.html?=id${jacket.id}">${jacket.name}</a>
                                    </h2>
                                    <p>${jacket.type}</p>
                                    <p>&dollar; ${jacket.price}</p>
                                    <div class="interactions">
                                        <div>
                                            <i class="fas fa-heart"></i>
                                        </div>
                                        <div>
                                        <a href="../jackets/alaska.html?=id${jacket.id}" class="cta cta-small">Buy</a>
                                        </div>
                                    </div>
                                </div>
                               </div>`;
  });
}

createHTML(jacketList);
