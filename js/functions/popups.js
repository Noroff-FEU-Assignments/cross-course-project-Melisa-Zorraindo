//open close modal popup
export function openPopup() {
  modalPopup.classList.remove("hidden");
  overlay.classList.remove("hidden");
  body.style.overflow = "hidden";
}

//close modal popup
export function closePopup() {
  modalPopup.classList.add("hidden");
  overlay.classList.add("hidden");
  body.style.overflow = "auto";
}
