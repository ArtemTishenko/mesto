export const profileButtonInfoEddit = document.querySelector(".profile__button-info-eddit");
export const profileButtonAdd = document.querySelector(".profile__button-add");
export const popupEditForm = document.querySelector(".popup_type_edit-form");
export const popupImg = document.querySelector(".popup_type_img");

export const popupCard = document.querySelector(".popup_type_card");

       const popupContainerEdditForm = document.querySelector(".popup__container_type_eddit-form");
export const nameInput = popupContainerEdditForm.querySelector(".popup__field_type_name");
export const jobInput = popupContainerEdditForm.querySelector(".popup__field_type_job");

export const profileInfoNameNode = document.querySelector(".profile__info-name");
export const profileInfoJobNode = document.querySelector(".profile__info-job");
export const listContainerElement = document.querySelector(".elements");
export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
export const validationConfig = {
  formSelector: ".popup__container_type_form",
  formSelectorForm:".popup_type_card popup__container_type_eddit-form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_type_invalid",
  inputErrorClass: "popup__field_type_error",
};