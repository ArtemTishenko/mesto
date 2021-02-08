import { Popup } from "./popup.js";
export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
  }
  open(src, alt) {
    super.open();
    const elementImg = this._popupElement.querySelector(".popup__picture");
    const elementCaption = this._popupElement.querySelector(
      ".popup__picture-caption"
    );
    elementImg.src = src;
    elementImg.alt = alt;
    elementCaption.textContent = alt;
  }
}
