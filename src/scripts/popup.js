

export class Popup{
  constructor(popupSelector){ // селектор актинвого попапа
    this._popupSelector = popupSelector
  }

  open(){
    this._popupSelector.classList.add("popup_visible");
    this.setEventListeners();
    this._handleEscClose();
  }
  close(){
    this._popupSelector.classList.remove("popup_visible")
    this._removeListener();
  }

  _handleEscClose(){
    document.addEventListener("keydown", this._closePopupByEscape) 
  }
  _removeListener(){
    document.removeEventListener("keydown", this._closePopupByEscape)
  }
  _closePopupByEscape =(evt)=>{
    if (evt.key === "Escape"){
      this.close()
    }
  }
  _closeByOverlay(){// слушатель клика закрытия по overlay

  }

  setEventListeners(){// слушатель клика по иконке закрытия попапа
    const buttonClose = this._popupSelector.querySelector('.popup__button-close');
    buttonClose.addEventListener("click",()=>{
      this.close()
    })


  }
}
