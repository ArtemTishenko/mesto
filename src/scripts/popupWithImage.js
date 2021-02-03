import{Popup} from './popup.js';
export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }
  open(src, alt){
    super.open()
    const elementImg = this._popupSelector.querySelector(".popup__picture");
    const elementCaption = this._popupSelector.querySelector(".popup__picture-caption")
    elementImg.src = src;
    elementImg.alt = alt;
    elementCaption.textContent = alt;

  }

}
