//import {validationConfig} from '../utils/constants.js'

export class FormValidator {
  constructor(validationConfig, validationForm) {
    this._validationForm = validationForm; //= .popup_type_card
    this._validationConig = validationConfig;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;

    this._error = this._validationForm.querySelector(this._inputErrorClass);
    this._inputList = this._validationForm.querySelectorAll(this._inputSelector);
  }
  _showInputError(input) {
    const error = this._validationForm.querySelector(`#${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }
  _hideInputError(input) {
    const error = this._validationForm.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._inputErrorClass);
  }
  _checkInputValidity(input) {
    const statValid = input.validity.valid;

    if (statValid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }
  _setEventListener() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.setButtonState( this._validationConig);
      });
    });
  }
  setButtonState() {
    const isActive = this._validationForm
      .querySelector(this._formSelector)
      .checkValidity(); // true/false checkValidity формы
    const button = this._validationForm.querySelector(
      this._submitButtonSelector
    );
    if (isActive) {
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }
  }
  enableValidation() {
    this._setEventListener();
  }

  clearError() {
    this._inputList.forEach((input) => { //выбираем все инпуты в активной форме
      this._hideInputError(input);
      const errorList = this._validationForm.querySelectorAll(
        `#${input.id}-error`
      );// выбрали все spanы
      errorList.forEach((error) => { // очистили сообщение каждого span в активной форме
        error.textContent = "";
      });
    });
  }
}
