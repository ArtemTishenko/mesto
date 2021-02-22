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
  popupAvatar,
  popupDelete,
  nameInput,
  jobInput,
  profileInfoNameNode,
  profileInfoJobNode,
  listContainerElement,
  validationConfig,
  profileAvatarButton,
  initialCards
} from "../scripts/utils/constants.js";

// const apiBaseLike = new Api({
//   url:"https://mesto.nomoreparties.co/v1/cohort-20/",
//   headers:{
//     authorization: '4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
//     "content-type":'application/json'
//   }},
//   'https://mesto.nomoreparties.co/v1/cohort-20/'

// )

const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-20/cards/",
  headers:{
    authorization: '4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
    "content-type":'application/json'
  }
})
const apiEdditAvatar = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-20/users/me/avatar",
  headers:{
    authorization:'4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
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

const avatarValidator = new FormValidator(validationConfig, popupAvatar);
const cardValidator = new FormValidator(validationConfig, popupCard);
const edditValidator = new FormValidator(validationConfig, popupEditForm);

const edditPopup = new Popup(popupEditForm);
const cardPopup = new Popup(popupCard);
const avatarPopup = new Popup(popupAvatar);
const deletePopup = new Popup(popupDelete);

const popupWithImage = new PopupWithImage(popupImg);
const popupWithFormEddit = new PopupWithForm(popupEditForm, handlePopupProfileSubmit);
const popupWithFormCard = new PopupWithForm(popupCard, addNewObjectCard);

const popupWithFormAvatar = new PopupWithForm(popupAvatar, handlePopupAvatareSubmit);
//const popupWithFormDelete = new PopupWithForm(popupDelete, submitDeleteCard)

const userInfo = new UserInfo({
  profileNameSelector: ".profile__info-name",
  profileJobSelector: ".profile__info-job",
});
function addNewObjectCard(dataCard) {// функция добовляет в разметку карточку с СЕРВЕРА по ыг

  const sectionNewCard = new Section(
    {
      items: dataCard,
      renderer: () => {

        api.addCard(dataCard)
          .then((data)=>{
            const card = createNewCard(data);
           // card.showDeleteButtonCard();
            const cardElement = card.generateCard();
            sectionNewCard.addNewItem(cardElement);
            //cardElement.setLikeCard(dataCard.likes)
          })

      },
    },
    listContainerElement,
  );
  sectionNewCard.renderCard();
  popupWithFormCard.close();
}

function openPopupEdditForm() {
  nameInput.value = userInfo.getUserInfo().name; //подтяжка с profile-info в форму
  jobInput.value = userInfo.getUserInfo().about;

  edditPopup.open();

  edditValidator.clearError();
  edditValidator.setButtonState();
}

function openPopupCard() {
  cardPopup.open();


  cardValidator.setButtonState();
  cardValidator.clearError();
}

function openPopupAvatar(){
  avatarPopup.open();
  avatarValidator.setButtonState();
  avatarValidator.clearError()
}
function handlePopupAvatareSubmit (data){
  apiEdditAvatar.addInfoProfileAvatar(data);
  profileAvatarButton.style.backgroundImage =  `url(${data.avatar})`;
  popupWithFormAvatar.close();

}

function openPopupImg(link, name) {

  popupWithImage.open(link, name);
}
function handlePopupProfileSubmit(data) {
  apiEddit.addInfoProfile(data);
  userInfo.setUserInfo(data); // вставляем новые значения методом setUserInfo класса UserInfo, data - данные полученные из класса PopupWithForm
  edditPopup.close();
}


function openPopupDelete(data, element){
  deletePopup.open();
  const popupWithFormDelete = new PopupWithForm(popupDelete, handlePopupDeleteSubmit)
  popupWithFormDelete.setEventListenerSubmitConfirmation(data, element); // установили функцию слушателя по submit (вы уверены?)
  //popupWithFormDelete.setEventListeners();// Установка слушателя клика по иконке закрытия попапа удаления карточки
}
function handlePopupDeleteSubmit (data, element){

  const apiDelete = new Api({
    url:`https://mesto.nomoreparties.co/v1/cohort-20/cards/${data._id}`,
    headers:{
      authorization: '4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
      "content-type":'application/json'
    }
  })

  apiDelete.deleteCard()

  element.remove();


}

function setLike(dataCard, element, checkMyLike){ //this._handleLikeClick
  const apiLike = new Api ({
    url:`https://mesto.nomoreparties.co/v1/cohort-20/cards/likes/${dataCard._id}`,
    headers:{
      authorization:'4056c30d-f7e0-4f36-a996-b3ca58e8ceb0',
      "content-type":'application/json'
    }
  })

  if (checkMyLike){// если true - мой лайк есть, лайк надо удалить/ если false - лайка нет, надо добавить
    //element.setLikeCard(dataCard.likes)
    return apiLike.deleteLlike()
      .then((data)=>{
         console.log(data, "data из then api.deleteLike")
        // console.log(dataCard.likes, "dataCard.likes")
        element.removeLike()
        element.countLikes(data.likes)
        return data
      })
       .catch((err) => {
        console.log(err);
      });
  }
  else{
   // element.setLikeCard(dataCard.likes)
   return apiLike.putLike()
      .then((data)=>{
        // console.log(data, "data в apiLike.putlike")
        // console.log(dataCard.likes, "dataCard.likes")
        //element.setLikeCard(data.likes)
        element.addLike();
        element.countLikes(data.likes)
        return data
      })
       .catch((err) => {
        console.log(err);
      });
  }

 }


popupWithFormCard.setEventListeners(); // установка слушатель клика по иконке закрытия попапа
popupWithFormEddit.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAvatar.setEventListeners();// Установка слушателя клика по иконке закрытия попапа popupAvatar
//popupWithFormDelete.setEventListeners();// Установка слушателя клика по иконке закрытия попапа удаления карточки

profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
profileButtonAdd.addEventListener("click", openPopupCard);
profileAvatarButton.addEventListener("click", openPopupAvatar);

avatarValidator.enableValidation();
cardValidator.enableValidation();
edditValidator.enableValidation();
//!_____________________________________________________________________

api.getAllCarads()
    .then((data)=>{

      const sectionDefault = new Section(//создаем экземпляр класса для начальных карточек
        {
          items: data,
          renderer: () => {
            data.forEach((initialCard) => {// перебор по массивву данных с начальными карточкамами
              const card = createNewCard(initialCard)// создали экземпляр для каждой карточки
              card._checkIdCard(initialCard.owner._id);// проверка что карточка моя и ее можно удалять
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


apiEddit.getInfoProfile()// запрос на данные пользователя
  .then((data)=>{
    // document.querySelector('.profile__avatar-img').setAttribute("src", data.avatar); // установка аватара из пришедших данных о пользователе с сервера
    profileAvatarButton.style.backgroundImage =  `url(${data.avatar})`; //добавления аватара в background-image
    profileInfoNameNode.textContent = data.name;
    profileInfoJobNode.textContent = data.about;

  })
  .catch((err)=>{
    console.log(err, "err из index.js -apiEdditAnswer")
  });




function createNewCard(cardData){
  const card = new Card(cardData, ".template", openPopupImg, openPopupDelete, setLike );
     return card
}
