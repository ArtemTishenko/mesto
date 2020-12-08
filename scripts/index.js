//******Открытие и закрытие popup окна*****************************//
const profileButtonInfoEddit = document.querySelector('.profile__button-info-eddit');
const profileButtonAdd =  document.querySelector('.profile__button-add');

const popupEditForm = document.querySelector('.popup_type_edit-form'); // const popup

const popupImg = document.querySelector('.popup_type_img');
const popupButtonCloseImg = document.querySelector('#popup__button-close_img'); // при обращении через id не нужно формировать файловую структуру по БЭМ

const popupCard = document.querySelector('.popup_type_card');

const popupButtonClose = document.querySelector('.popup__button-close_type_eddit-form');
const popupButtonCloseCard = document.querySelector('.popup__button-close_type_card');

const popupContainerEdditForm = document.querySelector('.popup__container_type_eddit-form');
const nameInput = popupContainerEdditForm.querySelector('.popup__field_type_name');
const jobInput =popupContainerEdditForm.querySelector('.popup__field_type_job');


const popupContainerCard = document.querySelector('.popup__container_type_card');
const popupContainerCardName = popupContainerCard.querySelector('.popup__field_type_card-name');
const popupContainerCardLink = popupContainerCard.querySelector('.popup__field_type_card-link');

const profileInfoNameNode = document.querySelector('.profile__info-name');
const profileInfoJobNode = document.querySelector('.profile__info-job');


function openPopupEdditForm(){
  popupEditForm.classList.add('popup_visible');

  nameInput.value = profileInfoNameNode.textContent; //подтяжка с profile-info в форму
  jobInput.value = profileInfoJobNode.textContent;
}
function closePopupEdditForm(){
  popupEditForm.classList.remove('popup_visible');
}
function openPopupCard(){
  popupCard.classList.add('popup_visible');
}
function closePopupCard(){
  popupCard.classList.remove('popup_visible');
}


function formSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  profileInfoNameNode.textContent=nameInput.value;// Вставляем новые значения с помощью textContent
  profileInfoJobNode.textContent=jobInput.value;

  closePopupEdditForm();
}



profileButtonInfoEddit.addEventListener('click', openPopupEdditForm );
profileButtonAdd.addEventListener('click', openPopupCard);
popupButtonClose.addEventListener('click', closePopupEdditForm );
popupButtonCloseCard.addEventListener('click', closePopupCard);

popupContainerEdditForm.addEventListener('submit', formSubmitHandler);// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»


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
  listContainerElement.append(...cardItems);
}

function addNewCard (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки
  let newCardElement = [];

  let newCardName = popupContainerCardName.value;// Вставляем название карточки
  let newCardLink = popupContainerCardLink.value;// Вставляем ссылку на картинку для карточки

  newCardElement.push({name:`${newCardName}`, link: `${newCardLink}`});

  let newCarItem = newCardElement.map(composeCard);
  listContainerElement.prepend(...newCarItem);

  console.log(newCardElement);
  composeCard(newCardElement);
  closePopupCard();

}

popupContainerCard.addEventListener('submit',addNewCard);

function composeCard(item){ // функция клонирования template, добавления картинки и имени карточки
  const newCard = templateCard.content.cloneNode(true);
  const elementCaption = newCard.querySelector('.element__caption');
  const elementImg = newCard.querySelector('.element__img');
  const elementDelete = newCard.querySelector('.element__delete'); //* delete button
  const elementLike = newCard.querySelector('.element__like');//* like button


  elementCaption.textContent = item.name;
  elementImg.setAttribute('src', `${item.link}`);
  elementImg.setAttribute('alt',`${item.name}`);



  elementDelete.addEventListener('click',clickRemoveButton); //* delete button
  elementLike.addEventListener('click', clickLikeButton);
  elementImg.addEventListener('click',openPopupImg);
  popupButtonCloseImg.addEventListener('click', closePopupImg);


  return newCard;
}


function openPopupImg(){
  popupImg.classList.add('popup_visible');

}

function closePopupImg(){
  popupImg.classList.remove('popup_visible');
}


//****************RemoveCard********************* */
function clickRemoveButton(event){
  const eventTarget= event.target.closest('.element');
  eventTarget.remove();
}
//************************************************* */

//****************Like********************* */
function clickLikeButton(event){
  const eventTarget = event.target;
  eventTarget.classList.toggle('element__like_active');
}
//************************************************* */



renderCard();




