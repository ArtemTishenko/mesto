//import '../pages/index.css';
import { Card } from "../scripts/components/card.js";

import {FormValidator} from "../scripts/components/formValidator.js";
import { Section } from "../scripts/components/section.js";
import {Popup} from "../scripts/components/popup.js";
import {PopupWithImage} from "../scripts/components/popupWithImage.js";
import {PopupWithForm} from "../scripts/components/popupWithForm.js";
import {UserInfo} from "../scripts/components/userInfo.js";
import {Api} from "../scripts/components/api.js"

import {
  profileButtonInfoEddit,
  profileButtonAdd,
  popupEditForm,
  popupImg,
  popupCard,
  nameInput,
  jobInput,
  profileInfoNameNode,
  profileInfoJobNode,
  listContainerElement,
  //initialCards,
  validationConfig,
} from "../scripts/utils/constants.js";
//import { data } from "autoprefixer";
//import { data } from 'autoprefixer';
//import { json } from 'body-parser';

const cardValidator = new FormValidator(validationConfig, popupCard);
const edditValidator = new FormValidator(validationConfig, popupEditForm);

const edditPopup = new Popup(popupEditForm);
const cardPopup = new Popup(popupCard);
const popupWithImage = new PopupWithImage(popupImg);
const popupWithFormCard = new PopupWithForm(popupCard, addNewObjectCard);
const popupWithFormEddit = new PopupWithForm(popupEditForm, formSubmitHandler);
const userInfo = new UserInfo({
  profileNameSelector: ".profile__info-name",
  profileJobSelector: ".profile__info-job",
});

function openPopupEdditForm() {
  nameInput.value = userInfo.getUserInfo().name; //подтяжка с profile-info в форму
  jobInput.value = userInfo.getUserInfo().job;

  edditPopup.open();

  edditValidator.clearError();
  edditValidator.setButtonState();
}

function openPopupCard() {
  cardPopup.open();


  cardValidator.setButtonState();
  cardValidator.clearError();
}

function openPopupImg(link, name) {

  popupWithImage.open(link, name);
}

function formSubmitHandler(data) {
  console.log(data, "dataUserInfo")
  userInfo.setUserInfo(data); // вставляем новые значения методом setUserInfo класса UserInfo, data - данные полученные из класса PopupWithForm
  edditPopup.close();
}





popupWithFormCard.setEventListeners(); // установка слушатель клика по иконке закрытия попапа
popupWithFormEddit.setEventListeners();
popupWithImage.setEventListeners();

profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
profileButtonAdd.addEventListener("click", openPopupCard);

cardValidator.enableValidation();
edditValidator.enableValidation();
//!_____________________________________________________________________
const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-20/cards/",
  headers:{
    authorization: '4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
    "content-type":'application/json'
  }
})
const apiEddit = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-20/users/me",
  headers:{
    authorization:'4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
    "content-type":'application/json'
  }
})
const apiEdditAnswer = apiEddit.getAllCarads()
.then((data)=>{
  console.log(data, "data")
  userInfo.setUserInfo(data);

});
console.log(apiEdditAnswer, "apiEdditAnswer")


function addNewObjectCard(dataCard) {// функция добовляет в разметку карточку из input

  const sectionNewCard = new Section(
    {
      items: dataCard,
      renderer: () => {
        api.addCard(dataCard)
        const card = new Card(dataCard, ".template", openPopupImg, api);
        const cardElement = card.generateCard();
        sectionNewCard.addNewItem(cardElement);
      },
    },
    listContainerElement,
  );
  sectionNewCard.renderCard();
  popupWithFormCard.close();
}

api.getAllCarads()
    .then((data)=>{
      //console.log(data, "data_index.js");
      const sectionDefault = new Section(//создаем экземпляр класса для начальных карточек
        {
          items: data,
          renderer: () => {
            data.forEach((initialCard) => {// перебор по массивву данных с начальными карточкамами
              const card = new Card(initialCard, ".template", openPopupImg); // создали экземпляр для каждой карточки
              const cardElement = card.generateCard(); //сгенерировали зполненный шаблон карточки
              sectionDefault.addItem(cardElement); // добавили в разметку
            });
          },
        },
        listContainerElement
      );
      sectionDefault.renderCard(); // вызвали метод у экземпляра класса Section для формирования и добваления default карточeк
    })
    .catch((err)=>{ // catch всегда вызывать из index.js
      console.log(err, "err из index.js")
    })



