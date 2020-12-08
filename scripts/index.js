//******Открытие и закрытие popup окна*****************************//
const profileButtonInfoEddit = document.querySelector('.profile__button-info-eddit');
const profileButtonAdd =  document.querySelector('.profile__button-add');

const popup = document.querySelector('.popup');

const popupImg = document.querySelector('.popup_type_img');

const popupCard = document.querySelector('.popup_type_card');

const popupButtonClose = document.querySelector('.popup__button-close');
const popupButtonCloseCard = document.querySelector('.popup__button-close_type_card');

const popupContainer = document.querySelector('.popup__container');
const nameInput = popupContainer.querySelector('.popup__field_type_name');
const jobInput =popupContainer.querySelector('.popup__field_type_job');

const profileInfoNameNode = document.querySelector('.profile__info-name');
const profileInfoJobNode = document.querySelector('.profile__info-job');

function openPopup(event) {
  const clickProfileButtonInfoEddit = event.target.getAttribute('class').includes('profile__button-info-eddit');
  const clickProfileButtonAdd = event.target.getAttribute('class').includes('profile__button-add');

  if (clickProfileButtonInfoEddit === true){
    popup.classList.add('popup_visible');
    console.log('условие открытия edit формы  выполнилось');
  }
  if (clickProfileButtonAdd === true){
    popupCard.classList.add('popup_visible');
    console.log('условие открытия card формы  выполнилось');
  }

  nameInput.value = profileInfoNameNode.textContent;
  jobInput.value = profileInfoJobNode.textContent;

}



function closePopup(event) {
  const clickPopupButtonClose = event.target.getAttribute('class').includes('popup__button-close')
  const clickPopupButtonCloseCard =event.target.getAttribute('class').includes('popup__button-close_type_card');

  if (clickPopupButtonClose === true){
    popup.classList.remove('popup_visible');
    console.log('условие закрытия edit формы  выполнилось');
  }

  if (clickPopupButtonCloseCard === true){
    popupCard.classList.remove('popup_visible');
    console.log('условие закрытия сard формы  выполнилось');
  }

}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  profileInfoNameNode.textContent=nameInput.value;// Вставляем новые значения с помощью textContent
  profileInfoJobNode.textContent=jobInput.value;

  closePopup()
}

profileButtonInfoEddit.addEventListener('click', openPopup );
profileButtonAdd.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup );
popupButtonCloseCard.addEventListener('click', closePopup);

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
 // console.log(cardItems);
  listContainerElement.append(...cardItems);
}

//<<<<<<< feature/deleteCard
function composeCard(item){ // функция клонирования template, добавления картинки и имени карточки
  const newCard = templateCard.content.cloneNode(true);
  const elementCaption = newCard.querySelector('.element__caption');
  const elementImg = newCard.querySelector('.element__img');
  const elementDelete = newCard.querySelector('.element__delete'); //* delete button
  const elementLike = newCard.querySelector('.element__like');//* like button
  

  elementCaption.textContent = item.name;
  elementImg.setAttribute('src', `${item.link}`);
  elementImg.setAttribute('alt',`${item.name}`);

  
  elementLike.addEventListener('click', clickLikeButton);
  elementDelete.addEventListener('click',clickRemoveButton); //* delete button
  elementImg.addEventListener('click',openPopupImg);
  popupButtonCloseImg.addEventListener('click', closePopupImg);
  

  return newCard;
}
//****************elementDelete********************* */
function clickRemoveButton(event){
  const eventTarget= event.target.closest('.element');
  eventTarget.remove();
}
//************************************************* */
//=======
const cardItems = initialCards.map(composeCard);
//console.log(cardItems);
listContainerElement.append(...cardItems);
//>>>>>>> develop

function clickLikeButton(event){
  const eventTarget = event.target;
  eventTarget.classList.toggle('element__like_active');
}

function openPopupImg(event){
  const eventTarget = event.target;
  popupImg.classList.add('popup_visible');
}

const popupButtonCloseImg = document.querySelector('#popup__button-close_img');
//console.log(popupButtonCloseImg);
function closePopupImg(event){
  popupImg.classList.remove('popup_visible');
  document.querySelector('.')
}

renderCard();




