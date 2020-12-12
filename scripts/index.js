const profileButtonInfoEddit = document.querySelector('.profile__button-info-eddit');
const profileButtonAdd =  document.querySelector('.profile__button-add');

const popupEditForm = document.querySelector('.popup_type_edit-form');

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

const listContainerElement = document.querySelector('.elements');
const templateCard = document.querySelector('.template');

const popupPicture = popupImg.querySelector('.popup__picture');
const popupPictureCaption = popupImg.querySelector('.popup__picture-caption');

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

//*****************************Открытие и закрытие popup окон*****************************//
function openModal(dompopup){
  dompopup.classList.add('popup_visible');
}
function closeModal(dompopup){
  dompopup.classList.remove('popup_visible');
}
function openPopupEdditForm(){
  nameInput.value = profileInfoNameNode.textContent; //подтяжка с profile-info в форму
  jobInput.value = profileInfoJobNode.textContent;

  openModal(popupEditForm);
}
function openPopupCard(){
  popupContainerCardName.value = "";
  popupContainerCardLink.value = "";

  openModal(popupCard);
}
function openPopupImg(event){
  const eventTargetSrc = event.target.getAttribute('src');
  const eventTargetAlt = event.target.getAttribute('alt');
  const eventTargetCaption = event.target.parentElement.querySelector('.element__caption').innerHTML ;

  popupPicture.setAttribute('src', eventTargetSrc);
  popupPicture.setAttribute('alt', eventTargetAlt);
  popupPictureCaption.textContent = eventTargetCaption;

  openModal(popupImg);
}
//*************************************************************************************** //
function formSubmitHandler (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  profileInfoNameNode.textContent=nameInput.value;// Вставляем новые значения с помощью textContent
  profileInfoJobNode.textContent=jobInput.value;

  closeModal(popupEditForm);
}
function addNewCard (event) {
  event.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  const newCardName = popupContainerCardName.value;// Вставляем название карточки
  const newCardLink = popupContainerCardLink.value;// Вставляем ссылку на картинку для карточки

  const newCarItem = composeCard({name:newCardName,link: newCardLink})
  listContainerElement.prepend(newCarItem);

  closeModal(popupCard);
}
function renderCard(){ // функция добавления карточки из массива
  const cardItems = initialCards.map(composeCard);
  listContainerElement.append(...cardItems);
}
function composeCard(item){ // Функция клонирования template, добавления картинки и имени карточки
  const newCard = templateCard.content.cloneNode(true);
  const elementCaption = newCard.querySelector('.element__caption');
  const elementImg = newCard.querySelector('.element__img');
  const elementDelete = newCard.querySelector('.element__delete'); //* delete button
  const elementLike = newCard.querySelector('.element__like');//* like button

  elementCaption.textContent = item.name;
  elementImg.setAttribute('src', `${item.link}`);
  elementImg.setAttribute('alt',`${item.name}`);

  elementDelete.addEventListener('click',clickRemoveButton); //* delete button
  elementLike.addEventListener('click', clickLikeButton);//* like button

  elementImg.addEventListener('click',openPopupImg);

  return newCard;
}
function clickRemoveButton(event){ //Функция удления карточки
  const eventTarget= event.target.closest('.element');
  eventTarget.remove();
}
function clickLikeButton(event){ //Функция установки like
  const eventTarget = event.target;
  eventTarget.classList.toggle('element__like_active');
}

profileButtonInfoEddit.addEventListener('click', openPopupEdditForm);
profileButtonAdd.addEventListener('click', openPopupCard);
popupButtonClose.addEventListener('click', function(){closeModal(popupEditForm)});
popupButtonCloseCard.addEventListener('click', function(){closeModal(popupCard)});
popupButtonCloseImg.addEventListener('click', function(){closeModal(popupImg)});
// Прикрепляем обработчики к форме: он будет следить за событием “submit” - «отправка»
popupContainerEdditForm.addEventListener('submit', formSubmitHandler);
popupContainerCard.addEventListener('submit', addNewCard);

renderCard();




