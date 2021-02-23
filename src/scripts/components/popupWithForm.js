import { Popup } from "./popup.js";
export class PopupWithForm extends Popup {
  constructor(popupElement, callBackSubmitForm) {
    super(popupElement)
    this._callBackSubmitForm = callBackSubmitForm;
    this._popupContainer = this._popupElement.querySelector(
      ".popup__container_type_form"
    );
    this._popupInputList = this._popupContainer.querySelectorAll(
      ".popup__field"
    );
    this._buttonSubmit = this._popupElement.querySelector(".popup__button-submit");
    this._normalButtonText =  this._buttonSubmit.textContent
  }
  _getInputValues() {
    const inputData = {};
    this._popupInputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData; //данные с импутов всех
  }

  _formSubmit = (event) => {
    event.preventDefault();

    let data = this._getInputValues();
    this._callBackSubmitForm(data);

  };

  setEventListenerSubmitConfirmation(data,element){
    super.setEventListeners();
    const listener = (event)=>{
      event.preventDefault();
      this._callBackSubmitForm(data,element)
      this._popupContainer.removeEventListener("submit", listener)
    }

    this._popupContainer.addEventListener('submit', listener)
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", this._formSubmit);
  }

  close() {
    super.close();
    this._popupContainer.reset();
  }

  renderLoading(isLoading){

    if (isLoading){
      this._buttonSubmit.textContent = `${this._buttonSubmit.textContent}...`
    } else {
      this._buttonSubmit.textContent = this._normalButtonText
    }
  }
}
