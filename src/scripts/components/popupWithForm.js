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
        console.log("_form_submt вызывается")                              // попробовать сюда передать метод api
    let data = this._getInputValues();
    this._callBackSubmitForm(data);

  };

  // setEventListenerSubmitConfirmation(data,element){

  //   this._popupContainer.addEventListener('submit', (event)=>{
  //     event.preventDefault();
  //     this._callBackSubmitForm(data,element)
  //     this.close();
  //     console.log(element, "element в setEventListenerSubmitConfirmation")
  //   })
  // }
  setEventListenerSubmitConfirmation(data,element){

    const listener = (event)=>{
      event.preventDefault();
      this._callBackSubmitForm(data,element)
      this.close();
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
    //this._popupContainer.removeEventListener("submit", this._formSubmit)
    this._popupContainer.reset();
  }
}
