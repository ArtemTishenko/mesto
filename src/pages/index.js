import { Card } from "../scripts/card.js";
//import {validationConfig} from "./validate.js";
import {FormValidator} from "../scripts/formValidator.js"
export const validationConfig = {
  formSelector: ".popup__container_type_form",
  formSelectorForm:".popup_type_card popup__container_type_eddit-form",//! проверить .popup__container_type_form заменить на popup__container_type_eddit-form
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_type_invalid",
  inputErrorClass: "popup__field_type_error",
};
const profileButtonInfoEddit = document.querySelector(".profile__button-info-eddit");
const profileButtonAdd = document.querySelector(".profile__button-add");
const popupEditForm = document.querySelector(".popup_type_edit-form");
const popupImg = document.querySelector(".popup_type_img");
const popupButtonCloseImg = document.querySelector("#popup__button-close_img"); // при обращении через id не нужно формировать файловую структуру по БЭМ
const popupCard = document.querySelector(".popup_type_card");
const popupButtonClose = document.querySelector(".popup__button-close_type_eddit-form");
const popupButtonCloseCard = document.querySelector(".popup__button-close_type_card");
const popupContainerEdditForm = document.querySelector(".popup__container_type_eddit-form");
const nameInput = popupContainerEdditForm.querySelector(".popup__field_type_name");
const jobInput = popupContainerEdditForm.querySelector(".popup__field_type_job");
const popupContainerCard = document.querySelector(".popup__container_type_card");
const popupContainerCardName = popupContainerCard.querySelector(".popup__field_type_card-name");
const popupContainerCardLink = popupContainerCard.querySelector(".popup__field_type_card-link");
const profileInfoNameNode = document.querySelector(".profile__info-name");
const profileInfoJobNode = document.querySelector(".profile__info-job");
const listContainerElement = document.querySelector(".elements");

const popupPicture = popupImg.querySelector(".popup__picture"); // перенесено в класс Card метод _OpenPopupImg
const popupPictureCaption = popupImg.querySelector(".popup__picture-caption"); // перенесено в класс Card метод _OpenPopupImg


const cardValidator = new FormValidator(validationConfig, popupCard);
const edditValidator = new FormValidator(validationConfig, popupEditForm);

const initialCards = [
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

 function openModal(dompopup) {// в качестве аргумента передается у кого есть visible (popupImg или popupEdditForm)
   dompopup.classList.add("popup_visible");

   document.addEventListener("click", closeByOverlay);
   document.addEventListener("keydown", closePopupByEscape);
 }
 function closeModal(dompopup) {
   dompopup.classList.remove("popup_visible"); // удаляя класс закрывается попап

   document.removeEventListener("keydown", closePopupByEscape); // удаление слушателя по кнопке
   document.removeEventListener("click", closeByOverlay); //удалени яслушателя закрытия по overlay
 }
 function openPopupEdditForm() {
   nameInput.value = profileInfoNameNode.textContent; //подтяжка с profile-info в форму
   jobInput.value = profileInfoJobNode.textContent;

   openModal(popupEditForm);
   edditValidator.clearError();
   edditValidator.setButtonState();
 }
 function openPopupCard() {
   popupContainerCardName.value = "";
   popupContainerCardLink.value = "";

   openModal(popupCard);
   cardValidator.setButtonState();
   cardValidator.clearError();
 }
 export function openPopupImg(event) {
   //в качестве аргумента передается у кого есть visible (popupImg или popupEdditForm)

   const eventTargetSrc = event.target.getAttribute("src");
   const eventTargetAlt = event.target.getAttribute("alt");
   const eventTargetCaption = event.target.parentElement.querySelector(
     ".element__caption"
   ).innerHTML;

   popupPicture.setAttribute("src", eventTargetSrc);
   popupPicture.setAttribute("alt", eventTargetAlt);
   popupPictureCaption.textContent = eventTargetCaption;

   openModal(popupImg);
 }
 function formSubmitHandler(event) {
   event.preventDefault();
   profileInfoNameNode.textContent = nameInput.value; // Вставляем новые значения с помощью textContent
   profileInfoJobNode.textContent = jobInput.value;

   closeModal(popupEditForm);
 }
 function checkClassOverlay(overlay) {// функция проверки клика по overlay

   return overlay.classList.contains("popup_visible");
 }
 function closeByOverlay(evt) {// функция закрытия popup при клике по overlay

   if (checkClassOverlay(evt.target)) {
     closeModal(evt.target);
   }
 }
 function closePopupByEscape(evt) {// функция закрития popup при нажатие  Escape
   const popupActive = document.querySelector(".popup_visible");
   if (evt.key === "Escape") {
     closeModal(popupActive);
   }
 }
 function generateDefaultCard(initialCards) {
   initialCards.forEach((item) => {
     const card = new Card(item, ".template");
     const cardElement = card.generateCard();
     listContainerElement.append(cardElement);
   });
 }
 function addNewObjectCard(event) {// функция добовляет в разметку карточку из input
   event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

   const itemCard = {
     name: popupContainerCardName.value,
     link: popupContainerCardLink.value,
   };

   const newCarItem = generateCardElement(itemCard);
   listContainerElement.prepend(newCarItem);

   closeModal(popupCard);
 }
 function generateCardElement(dataCard) {// функция возвращает готовую карточку
   const card = new Card(dataCard, ".template");
   const cardElement = card.generateCard();
   return cardElement;
 }

 popupContainerEdditForm.addEventListener("submit", formSubmitHandler);
 profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
 profileButtonAdd.addEventListener("click", openPopupCard);
 popupButtonClose.addEventListener("click", function (evt) {
   closeModal(popupEditForm);
 });
 popupButtonCloseCard.addEventListener("click", function (evt) {
   closeModal(popupCard);
 });
 popupButtonCloseImg.addEventListener("click", function (evt) {
   closeModal(popupImg);
 });
 popupContainerCard.addEventListener("submit", addNewObjectCard); //добалвение карточек из формы

 generateDefaultCard(initialCards); //добааление карточек из массива
 cardValidator.enableValidation();
 edditValidator.enableValidation();

