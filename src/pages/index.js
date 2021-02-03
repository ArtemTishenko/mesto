import { Card } from "../scripts/card.js";

import {FormValidator} from "../scripts/formValidator.js";
import { Section } from "../scripts/section.js";
import {Popup} from "../scripts/popup.js";
import {PopupWithImage} from "../scripts/popupWithImage.js";

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
//const popupButtonClose = document.querySelector(".popup__button-close_type_eddit-form");
//const popupButtonCloseCard = document.querySelector(".popup__button-close_type_card");
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

 const edditPopup = new Popup (popupEditForm)
 const cardPopup = new Popup(popupCard);
 const popupWithImage = new PopupWithImage(popupImg);


 function openPopupEdditForm() {
   nameInput.value = profileInfoNameNode.textContent; //подтяжка с profile-info в форму
   jobInput.value = profileInfoJobNode.textContent;

   edditPopup.open();

   edditValidator.clearError();
   edditValidator.setButtonState();
 }
 function openPopupCard() {
   popupContainerCardName.value = "";
   popupContainerCardLink.value = "";

   cardPopup.open();

   cardValidator.setButtonState();
   cardValidator.clearError();
 }
 export function openPopupImg(event) {
   //в качестве аргумента передается у кого есть visible (popupImg или popupEdditForm)


   const eventTargetSrc = event.target.getAttribute("src");
   const eventTargetAlt = event.target.getAttribute("alt");
  // const eventTargetCaption = event.target.parentElement.querySelector(".element__caption").innerHTML;
   // console.log(eventTargetCaption, "eventTargetCaption")
  //  popupPicture.setAttribute("src", eventTargetSrc);
  //  popupPicture.setAttribute("alt", eventTargetAlt);
  //  popupPictureCaption.textContent = eventTargetCaption;

   popupWithImage.open(eventTargetSrc, eventTargetAlt);
   //openModal(popupImg);
 }
 function formSubmitHandler(event) {
   event.preventDefault();
   profileInfoNameNode.textContent = nameInput.value; // Вставляем новые значения с помощью textContent
   profileInfoJobNode.textContent = jobInput.value;

   edditPopup.close();
   //closeModal(popupEditForm);
 }

//________________________________________________________________________________________________________
const sectionDefault = new Section({
    items: initialCards,
    renderer:()=>{
      initialCards.forEach((initialCard)=>{// перебор по начальным карточкам
      const card = new Card (initialCard, ".template"); // создали экземпляр для каждой карточки
      const cardElement = card.generateCard();//сгенерировали зполненный шаблон карточки
      sectionDefault.addItem(cardElement); // добавили в разметку
      })
    }
  },
  listContainerElement);

  sectionDefault.renderCard();// вызвали метод у экземпляра класса Section для формирования и добваления default карточeк
//_________________________________________________________________________________________________________

function addNewObjectCard(event) {// функция добовляет в разметку карточку из input
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  const itemCard = {
    name: popupContainerCardName.value,
    link: popupContainerCardLink.value,
  };
  //________________________________________________
  const sectionNewCard = new Section({
    items:itemCard,
    renderer:()=>{
      const card = new Card(itemCard,".template");
      const cardElement = card.generateCard();
      sectionNewCard.addItem(cardElement);
    }
  },
  listContainerElement);

  sectionNewCard.renderCard();
  //____________________________________________________



  cardPopup.close();
 }


 popupContainerEdditForm.addEventListener("submit", formSubmitHandler);
 profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
 profileButtonAdd.addEventListener("click", openPopupCard);



 popupButtonCloseImg.addEventListener("click", function (evt) {
   //closeModal(popupImg);
 });
 popupContainerCard.addEventListener("submit", addNewObjectCard); //добалвение карточек из формы


 cardValidator.enableValidation();
 edditValidator.enableValidation();

