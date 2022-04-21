export function fetchProductsInCart() {
  const favs = localStorage.getItem("cart");

  if (!favs) {
    return [];
  } else {
    return JSON.parse(favs);
  }
}
