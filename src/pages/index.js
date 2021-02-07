import '../pages/index.css';
import { Card } from "../scripts/components/card.js";

import {FormValidator} from "../scripts/components/formValidator.js";
import { Section } from "../scripts/components/section.js";
import {Popup} from "../scripts/components/popup.js";
import {PopupWithImage} from "../scripts/components/popupWithImage.js";
import {PopupWithForm} from "../scripts/components/popupWithForm.js";
import {UserInfo} from "../scripts/components/userInfo.js";


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
  initialCards,
  validationConfig,
} from "../scripts/utils/constants.js";

const cardValidator = new FormValidator(validationConfig, popupCard);
const edditValidator = new FormValidator(validationConfig, popupEditForm);

const edditPopup = new Popup(popupEditForm);
const cardPopup = new Popup(popupCard);
const popupWithImage = new PopupWithImage(popupImg);
const popupWithFormCard = new PopupWithForm(popupCard, addNewObjectCard);
const popupWithFormEddit = new PopupWithForm(popupEditForm, formSubmitHandler);
const userInfo = new UserInfo({
  profileInfoName: profileInfoNameNode,
  profileInfoJob: profileInfoJobNode,
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

function openPopupImg(event) {
  //в качестве аргумента передается у кого есть visible (popupImg или popupEdditForm)
  const eventTargetSrc = event.target.getAttribute("src");
  const eventTargetAlt = event.target.getAttribute("alt");

  popupWithImage.open(eventTargetSrc, eventTargetAlt);
}

function formSubmitHandler(data) {
  userInfo.setUserInfo(data); // вставляем новые значения методом setUserInfo класса UserInfo, data - данные полученные из класса PopupWithForm
  edditPopup.close();
}

const sectionDefault = new Section(//создаем экземпляр класса для начальных карточек
  {
    items: initialCards,
    renderer: () => {
      initialCards.forEach((initialCard) => {
        // перебор по массивву данных с начальными карточкамами
        const card = new Card(initialCard, ".template", openPopupImg); // создали экземпляр для каждой карточки
        const cardElement = card.generateCard(); //сгенерировали зполненный шаблон карточки
        sectionDefault.addItem(cardElement); // добавили в разметку
      });
    },
  },
  listContainerElement
);
sectionDefault.renderCard(); // вызвали метод у экземпляра класса Section для формирования и добваления default карточeк

function addNewObjectCard(dataCard) {// функция добовляет в разметку карточку из input
  const sectionNewCard = new Section(
    {
      items: dataCard,
      renderer: () => {
        const card = new Card(dataCard, ".template", openPopupImg);
        const cardElement = card.generateCard();
        sectionNewCard.addNewItem(cardElement);
      },
    },
    listContainerElement
  );

  sectionNewCard.renderCard();
  popupWithFormCard.close();
}

profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
profileButtonAdd.addEventListener("click", openPopupCard);

cardValidator.enableValidation();
edditValidator.enableValidation();

