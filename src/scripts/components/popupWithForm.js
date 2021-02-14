import { Popup } from "./popup.js";
export class PopupWithForm extends Popup {
  constructor(popupElement, callBackSubmitForm, api) {
    super(popupElement), (this._callBackSubmitForm = callBackSubmitForm);
    this._popupContainer = this._popupElement.querySelector(
      ".popup__container_type_form"
    );
    this._popupInputList = this._popupContainer.querySelectorAll(
      ".popup__field"
    );
    this._api = api;
  }
  _getInputValues() {
    const inputData = {};
    this._popupInputList.forEach((input) => {
      inputData[input.name] = input.value;
    });
    //this._api.addInfoProfile(inputData); // нужно перенести выше
    console.log(inputData, "inputdata")

    return inputData; //данные с импутов всех
  }

  _formSubmit = (event) => {
    event.preventDefault();

    let data = this._getInputValues();
    this._callBackSubmitForm(data);
    this._api.addInfoProfile(data)
    .then((data)=>{

    });//ищу куда поставить
  };
  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", this._formSubmit);
  }

  close() {
    super.close();
    this._popupContainer.reset();
  }
}
