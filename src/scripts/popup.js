export class Popup {
  constructor(popupSelector) {
    // селектор актинвого попапа
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_visible");
    this.setEventListeners();
    this._handleEscClose();
    this._handleOverlayClose();
  }
  close() {
    this._popupSelector.classList.remove("popup_visible");
    this._removeListeners();
  }

  _handleEscClose() {// функция добавления слушателя нажатия на Escape
    document.addEventListener("keydown", this._closePopupByEscape);
  }
  _handleOverlayClose() {//функция добавления слушателя слика по overlay
    document.addEventListener("click", this._closeByOverlay);
  }

  _removeListeners() {//функция удаление слушателей собития нажатия Escape и клика по overlay
    document.removeEventListener("keydown", this._closePopupByEscape);
    document.removeEventListener("click", this._closeByOverlay);
  }
  _closePopupByEscape = (evt) => {// стрелочная функция обработки нажатия на клавишу Escape и закрытия popup
    if (evt.key === "Escape") {
      this.close();
    }
  };
  _closeByOverlay = (evt) => {// слушатель клика закрытия по overlay
    const checkClassOverlay = evt.target.classList.contains("popup_visible");
    if (checkClassOverlay) {
      this.close();
    }
  };

  setEventListeners() {// слушатель клика по иконке закрытия попапа
    const buttonClose = this._popupSelector.querySelector(
      ".popup__button-close"
    );
    buttonClose.addEventListener("click", () => {
      this.close();
    });
  }
}

class PopupWithForm extends Popup{
  constructor(popupSelector, formSubmit){
    super(popupSelector),
    this._formSubmit = formSubmit
  }
  _getInputValues(){
    const valuesCard
  }
  setEventListeners(){
    super.setEventListeners();
    const popupContainerCard = this._popupSelector.querySelector(".popup__container_type_card")
    console.log(popupContainerCard, "popupContainerCard");

    popupContainerCard.addEventListener("submit", this._formSubmit)
  }
  close(){
    super.open()
    const popupContainerCardName =  this._popupSelector.querySelector(".popup__field_type_card-name");
    const popupContainerCardLink = this._popupSelector.querySelector(".popup__field_type_card-link");
    popupContainerCardName.value = "";
    popupContainerCardLink.value = "";
  }

}
