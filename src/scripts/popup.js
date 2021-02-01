

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
    console.log("селектор popup_visible удален")
    console.log(this._popupSelector.classList.contains("popup_visible"), "close visible")

  }

  _handleEscClose(){
    document.addEventListener("keydown",(evt)=>{
        if (evt.key === "Escape"){
          this.close()
        }
      }
    )
  }
  _
  _closeByOverlay(){// слушатель клика закрытия по overlay

  }

  setEventListeners(){// слушатель клика по иконке закрытия попапа
    const buttonClose = this._popupSelector.querySelector('.popup__button-close');
    buttonClose.addEventListener("click",()=>{
      this.close()
    })


  }
}
