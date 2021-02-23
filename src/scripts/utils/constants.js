export const profileButtonInfoEddit = document.querySelector(".profile__button-info-eddit");
export const profileButtonAdd = document.querySelector(".profile__button-add");
export const popupEditForm = document.querySelector(".popup_type_edit-form");
export const popupImg = document.querySelector(".popup_type_img");

export const popupCard = document.querySelector(".popup_type_card");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const popupDelete = document.querySelector(".popup_type_card-delete")

       const popupContainerEdditForm = document.querySelector(".popup__container_type_eddit-form");
export const nameInput = popupContainerEdditForm.querySelector(".popup__field_type_name");
export const jobInput = popupContainerEdditForm.querySelector(".popup__field_type_job");


export const listContainerElement = document.querySelector(".elements");

export const profileAvatarButton = document.querySelector(".profile__avatar-img") ;

export const validationConfig = {
  formSelector: ".popup__container_type_form",
  formSelectorForm:".popup_type_card popup__container_type_eddit-form popup__container_type_avatar",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_type_invalid",
  inputErrorClass: "popup__field_type_error",
};
