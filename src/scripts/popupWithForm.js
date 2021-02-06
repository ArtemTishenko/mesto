import {Popup} from "./popup.js"
export class PopupWithForm extends Popup{
  constructor(popupSelector, callBackSubmitForm){
    super(popupSelector),
    this._callBackSubmitForm = callBackSubmitForm
    this._popupContainer = this._popupSelector.querySelector(".popup__container_type_form");
    this._popupInputList = this._popupContainer.querySelectorAll(".popup__field");

  }
  _getInputValues(){
    const inputData = {};
    this._popupInputList.forEach((input)=>{
      inputData[input.name]=input.value
     })

    return inputData
  }
  _formSubmit=(event)=>{
    event.preventDefault();
    let data = this._getInputValues();
    this._callBackSubmitForm(data);
  }
  setEventListeners(){
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", this._formSubmit)
  }

  close(){
    super.close();
    this._popupContainer.reset();
  }

}

