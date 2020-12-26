const validationConfig = {
  formSelector: ".popup__container_type_form",
  formSelectorForm:".popup_type_card .popup__container_type_form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_type_invalid",
  inputErrorClass: "popup__field_type_error",
};

function showInputError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
}

function hideInputError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(form, input, config) {
  if (input.validity.valid) {
    hideInputError(form, input, config);
  } else {
    showInputError(form, input, config);
  }
}

function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);

    button.disabled = true;
  }
}

function setEventListener(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    input.addEventListener("input", (evt) => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config); //
    });
  });
}
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    setEventListener(form, config);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setButtonState(submitButton, form.checkValidity(), config);
  });
}

enableValidation(validationConfig);
