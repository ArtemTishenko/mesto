import { Card } from "../scripts/card.js";

import {FormValidator} from "../scripts/formValidator.js";
import { Section } from "../scripts/section.js";
import {Popup} from "../scripts/popup.js";
import {PopupWithImage} from "../scripts/popupWithImage.js";
import {PopupWithForm} from "../scripts/popupWithForm.js"
import {UserInfo} from "../scripts/userInfo.js"
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
//const popupButtonCloseImg = document.querySelector("#popup__button-close_img"); // при обращении через id не нужно формировать файловую структуру по БЭМ
const popupCard = document.querySelector(".popup_type_card");
//const popupButtonClose = document.querySelector(".popup__button-close_type_eddit-form");
//const popupButtonCloseCard = document.querySelector(".popup__button-close_type_card");
const popupContainerEdditForm = document.querySelector(".popup__container_type_eddit-form");
const nameInput = popupContainerEdditForm.querySelector(".popup__field_type_name");
const jobInput = popupContainerEdditForm.querySelector(".popup__field_type_job");
const popupContainerCard = document.querySelector(".popup__container_type_card");
//const popupContainerCardName = popupContainerCard.querySelector(".popup__field_type_card-name");
//const popupContainerCardLink = popupContainerCard.querySelector(".popup__field_type_card-link");
const profileInfoNameNode = document.querySelector(".profile__info-name");
const profileInfoJobNode = document.querySelector(".profile__info-job");
const listContainerElement = document.querySelector(".elements");
//const popupPicture = popupImg.querySelector(".popup__picture"); // перенесено в класс Card метод _OpenPopupImg
//const popupPictureCaption = popupImg.querySelector(".popup__picture-caption"); // перенесено в класс Card метод _OpenPopupImg
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

const edditPopup = new Popup (popupEditForm);
const cardPopup = new Popup(popupCard);
const popupWithImage = new PopupWithImage(popupImg);
const popupWithFormCard = new PopupWithForm(popupCard, addNewObjectCard);
const popupWithFormEddit = new PopupWithForm(popupEditForm, formSubmitHandler);
const userInfo = new UserInfo ({
  profileInfoName: profileInfoNameNode,
  profileInfoJob:profileInfoJobNode
});

function openPopupEdditForm() {
  nameInput.value = userInfo.getUserInfo().name; //подтяжка с profile-info в форму
  jobInput.value = userInfo.getUserInfo().job;

  edditPopup.open();
  popupWithFormEddit.setEventListeners();

  edditValidator.clearError();
  edditValidator.setButtonState();
}

function openPopupCard() {
  cardPopup.open();
  popupWithFormCard.setEventListeners(); // установка слушателя на Submit

  cardValidator.setButtonState();
  cardValidator.clearError();
}

function openPopupImg(event) {//в качестве аргумента передается у кого есть visible (popupImg или popupEdditForm)
  const eventTargetSrc = event.target.getAttribute("src");
  const eventTargetAlt = event.target.getAttribute("alt");

  popupWithImage.open(eventTargetSrc, eventTargetAlt);
}

function formSubmitHandler(data) {
  userInfo.setUserInfo(data)// вставляем новые значения методом setUserInfo класса UserInfo, data - данные полученные из класса PopupWithForm
  edditPopup.close();
}

const sectionDefault = new Section({ //создаем экземпляр класса для начальных карточек
    items: initialCards,
    renderer:()=>{
      initialCards.forEach((initialCard)=>{// перебор по массивву данных с начальными карточкамами
      const card = new Card (initialCard, ".template", openPopupImg); // создали экземпляр для каждой карточки
      const cardElement = card.generateCard();//сгенерировали зполненный шаблон карточки
      sectionDefault.addItem(cardElement); // добавили в разметку
      })
    }
},listContainerElement);
sectionDefault.renderCard();// вызвали метод у экземпляра класса Section для формирования и добваления default карточeк

function addNewObjectCard(dataCard) {// функция добовляет в разметку карточку из input
  const sectionNewCard = new Section({
    items:dataCard,
    renderer:()=>{
      const card = new Card(dataCard,".template", openPopupImg);
      const cardElement = card.generateCard();
      sectionNewCard.addNewItem(cardElement);
    }
  },listContainerElement);

  sectionNewCard.renderCard();
  popupWithFormCard.close();
}

profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
profileButtonAdd.addEventListener("click", openPopupCard);

cardValidator.enableValidation();
edditValidator.enableValidation();

