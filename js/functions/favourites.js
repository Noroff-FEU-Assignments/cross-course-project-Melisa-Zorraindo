//add to favourites
export function addFavs() {
  const likes = localStorage.getItem("favourites");

  if (!likes) {
    return [];
  } else {
    return JSON.parse(likes);
  }
}
