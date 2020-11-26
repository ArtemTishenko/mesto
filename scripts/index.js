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
