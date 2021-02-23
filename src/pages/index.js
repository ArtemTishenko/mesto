import "../pages/index.css";
import { Card } from "../scripts/components/card.js";

import { FormValidator } from "../scripts/components/formValidator.js";
import { Section } from "../scripts/components/section.js";
import { Popup } from "../scripts/components/popup.js";
import { PopupWithImage } from "../scripts/components/popupWithImage.js";
import { PopupWithForm } from "../scripts/components/popupWithForm.js";
import { UserInfo } from "../scripts/components/userInfo.js";
import { Api } from "../scripts/components/api.js";

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
  listContainerElement,
  validationConfig,
  profileAvatarButton,
} from "../scripts/utils/constants.js";

const api = new Api ("https://mesto.nomoreparties.co/v1/cohort-20/","4056c30d-f7e0-4f36-a996-b3ca58e8ceb0");



const avatarValidator = new FormValidator(validationConfig, popupAvatar);
const cardValidator = new FormValidator(validationConfig, popupCard);
const edditValidator = new FormValidator(validationConfig, popupEditForm);


const deletePopup = new Popup(popupDelete);

const popupWithImage = new PopupWithImage(popupImg);
const popupWithFormEddit = new PopupWithForm(
  popupEditForm,
  handlePopupProfileSubmit
);
const popupWithFormCard = new PopupWithForm(popupCard, addNewObjectCard);

const popupWithFormAvatar = new PopupWithForm(
  popupAvatar,
  handlePopupAvatareSubmit
);

const userInfo = new UserInfo({
  profileNameSelector: ".profile__info-name",
  profileJobSelector: ".profile__info-job",
  profileAvatarButton: ".profile__avatar-img"
});
function createNewCard(cardData, myId) {
  const card = new Card(
    cardData,
    ".template",
    openPopupImg,
    openPopupDelete,
    setLike,
    myId
  );
  return card;
}
function addNewObjectCard(dataCard,) {// функция добовляет в разметку карточку с СЕРВЕРА

  const sectionNewCard = new Section(
    {
      items: dataCard,
      renderer: () => {
        popupWithFormCard.renderLoading(true);
        api
          .addCard(dataCard)
          .then((data) => {
            const card = createNewCard(data);

            const cardElement = card.generateCard();
            sectionNewCard.addNewItem(cardElement);
          })
          .catch((err) => {
            console.log(err, "ошибка в addNewObjectCard");
          })
          .finally(() => {
            popupWithFormCard.renderLoading(false);
          });
      },
    },
    listContainerElement
  );
  sectionNewCard.renderCard();
  popupWithFormCard.close();
}

function openPopupEdditForm() {
  nameInput.value = userInfo.getUserInfo().name; //подтяжка с profile-info в форму
  jobInput.value = userInfo.getUserInfo().about;

  popupWithFormEddit.open();

  edditValidator.clearError();
  edditValidator.setButtonState();
}

function openPopupCard() {
  popupWithFormCard.open();

  cardValidator.setButtonState();
  cardValidator.clearError();
}

function openPopupAvatar() {
  popupWithFormAvatar.open();
  avatarValidator.setButtonState();
  avatarValidator.clearError();
}
function handlePopupAvatareSubmit(data) {
  popupWithFormAvatar.renderLoading(true);
  api
    .addInfoProfileAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar(data)
      popupWithFormAvatar.close();
    })
    .catch((err) => {
      console.log(err, "err из handlePopupAvatareSubmit");
    })
    .finally(() => {
      popupWithFormAvatar.renderLoading(false);
    });
}

function openPopupImg(link, name) {
  popupWithImage.open(link, name);
}

function handlePopupProfileSubmit(data) {
  popupWithFormEddit.renderLoading(true);
  api
    .addInfoProfile(data)
    .then(() => {
      userInfo.setUserInfo(data); // вставляем новые значения методом setUserInfo класса UserInfo, data - данные полученные из класса PopupWithForm
      popupWithFormEddit.close();
    })
    .catch((err) => {
      console.log(err, "Ошибка из handlePopupProfileSubmit");
    })
    .finally(() => {
      popupWithFormEddit.renderLoading(false);
    });
}

function openPopupDelete(data, element) {
  deletePopup.open();
  const popupWithFormDelete = new PopupWithForm(
    popupDelete,
    handlePopupDeleteSubmit
  );
  popupWithFormDelete.setEventListenerSubmitConfirmation(data, element); // установили функцию слушателя по submit (вы уверены?)
}
function handlePopupDeleteSubmit(data, element) {//функция подверждения удления карточки
  api.deleteCard(data._id)
    .then(()=>{
      element.remove();
      deletePopup.close();
    })
    .catch((err)=>{
      console.log(err, "err из handlePopupDeleteSubmit")
    })

}

function setLike(dataCard, element, checkMyLike) {

  if (checkMyLike) {// если true - мой лайк есть, лайк надо удалить/ если false - лайка нет, надо добавить
    return api
      .deleteLike(dataCard._id)
      .then((data) => {
        element.removeLike();
        element.countLikes(data.likes);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return api
      .putLike(dataCard._id)
      .then((data) => {
        element.addLike();
        element.countLikes(data.likes);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

popupWithFormCard.setEventListeners(); // установка слушатель клика по иконке закрытия попапа
popupWithFormEddit.setEventListeners();
popupWithImage.setEventListeners();
popupWithFormAvatar.setEventListeners(); // Установка слушателя клика по иконке закрытия попапа popupAvatar

profileButtonInfoEddit.addEventListener("click", openPopupEdditForm);
profileButtonAdd.addEventListener("click", openPopupCard);
profileAvatarButton.addEventListener("click", openPopupAvatar);

avatarValidator.enableValidation();
cardValidator.enableValidation();
edditValidator.enableValidation();

  Promise.all([//в Promise.all передаем массив промисов которые нужно выполнить
    api.getInfoProfile(),
    api.getAllInitialCards()
  ])
    .then((data)=>{    //попадаем сюда, когда оба промиса будут выполнены
      const dataProfile = data[0];
      const myId = data[0]._id;
      const dataInitialCards = data[1];
      const sectionDefault = new Section( //создаем экземпляр класса для начальных карточек
        {
          items: dataInitialCards,
          renderer: () => {
            dataInitialCards.forEach((initialCard) => {// перебор по массивву данных с начальными карточкамами
              const card = createNewCard(initialCard, myId); // создали экземпляр для каждой карточки
              card._checkIdCard(initialCard.owner._id); // проверка что карточка моя и ее можно удалять
              const cardElement = card.generateCard(); //сгенерировали зполненный шаблон карточки
              sectionDefault.addItem(cardElement); // добавили в разметку
            });
          },
        },
        listContainerElement
      );
      sectionDefault.renderCard(); //все данные получены, отрисовываем страницу

      userInfo.setUserInfo(dataProfile);
      userInfo.setUserAvatar(dataProfile);

    })
    .catch((err)=>{     //попадаем сюда если один из промисов завершится ошибкой
      console.log(err);
    })
    .finally(()=>{
      popupWithFormEddit.renderLoading(false);
    })
