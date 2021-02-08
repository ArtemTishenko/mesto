import { Popup } from "./popup.js";
export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupCardImage = this._popupElement.querySelector(".popup__picture");
    this._captionImage = this._popupElement.querySelector(".popup__picture-caption");
  }
  open(src, alt) {
    super.open();
    
    this._popupCardImage.src = src;
    this._captionImage.alt = alt;
    this._captionImage.textContent = alt;
  }
}
