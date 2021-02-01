

export class Popup{
  constructor(popupSelector){ // селектор актинвого попапа
    this._popupSelector = popupSelector
  }

  open(){
    this._popupSelector.classList.add("popup_visible")
    const buttonClose = this._popupSelector.querySelector('.popup__button-close')
    console.log(buttonClose, "buttonClose - class Popup")
  }
  close(){
    this._popupSelector.querySelector
  }
  _handleEscClose(){

  }
  setEventListeners(){// слушатель клика иконке закрытия попапа

  }
  _closeByOverlay(){// слушатель клика закрытия по overlay

  }
}
