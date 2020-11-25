//******Открытие и закрытие popup окна*****************************//
const profileButtonInfoEddit = document.querySelector('.profile__button-info-eddit');
const popup = document.querySelector('.popup');
const popupButtonClose = document.querySelector('.popup__button-close');

profileButtonInfoEddit.addEventListener('click', openPopup );
popupButtonClose.addEventListener('click', closePopup );

function openPopup() {
  popup.classList.add('popup_visible');
}

function closePopup() {
  popup.classList.remove('popup_visible');
}
//**********************************************************************/


//******************************************************************* */
  // Находим форму в DOM
 const popupContainer = document.querySelector('.popup__container');

 const nameInput = popupContainer.querySelector('.popup__field_name');
 const jobInput =popupContainer.querySelector('.popup__field_job');

 const profileInfoNameNode = document.querySelector('.profile__info-name');
 const profileInfoJobNode = document.querySelector('.profile__info-job');
  //Записывание в форму текущие знчения блока profile
 nameInput.value = profileInfoNameNode.textContent;
 jobInput.value = profileInfoJobNode.textContent;

 function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки

  // Находим поля формы в DOM
  let nameInput = popupContainer.querySelector('.popup__field_name');
  let jobInput =popupContainer.querySelector('.popup__field_job');

  // Выбираем элементы, куда должны быть вставлены значения полей
  let profileInfoNameNode = document.querySelector('.profile__info-name');
  let profileInfoJobNode = document.querySelector('.profile__info-job');

  // Вставляем новые значения с помощью textContent
  profileInfoNameNode.textContent=nameInput.value;
  profileInfoJobNode.textContent=jobInput.value;

  closePopup()
 }

 const popupButtonSubmitClick = document.querySelector('.popup__button-submit');

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
 popupButtonSubmitClick.addEventListener('click', formSubmitHandler);
