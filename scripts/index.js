//******Открытие и закрытие popup окна*****************************//
const profileButtonInfoEddit = document.querySelector('.profile__button-info-eddit');
const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__button-close');

const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__field_type_name');
const jobInput =popupContainer.querySelector('.popup__field_type_job');

const profileInfoNameNode = document.querySelector('.profile__info-name');
const profileInfoJobNode = document.querySelector('.profile__info-job');

function openPopup() {
  popup.classList.add('popup_visible');
  nameInput.value = profileInfoNameNode.textContent;
  jobInput.value = profileInfoJobNode.textContent;
}

function closePopup() {
  popup.classList.remove('popup_visible');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  profileInfoNameNode.textContent=nameInput.value;// Вставляем новые значения с помощью textContent
  profileInfoJobNode.textContent=jobInput.value;

  closePopup()
}

profileButtonInfoEddit.addEventListener('click', openPopup );
popupButtonClose.addEventListener('click', closePopup );
popupContainer.addEventListener('submit', formSubmitHandler);// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»

//!_____________________________________________________________________________________________________________________________________________________/

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const listContainerElement = document.querySelector('.elements');
const templateCard = document.querySelector('.template');

function renderCard(){ // функция добавления карточки из массива

const cardItems = initialCards.map(composeCard);
console.log(cardItems);
listContainerElement.append(...cardItems);


}

function composeCard(item){ // функция клонирования template, добавления картинки и имени карточки
const newCard = templateCard.content.cloneNode(true);
const elementCaption = newCard.querySelector('.element__caption');
const elementImg = newCard.querySelector('.element__img');

elementCaption.textContent = item.name;
elementImg.setAttribute('src', `${item.link}`);
elementImg.setAttribute('alt',`${item.name}`);
return newCard;
}

renderCard();
