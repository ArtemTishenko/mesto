//******Открытие и закрытие popup окна
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
//**********************************************************************


//******************************************************************* */
// Находим форму в DOM
const popupContainer = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()

 let nameInput = popupContainer.querySelector('.popup__field_name');
 let jobInput =popupContainer.querySelector('.popup__field_job');

 let profileInfoNameNode = document.querySelector('.profile__info-name');
 let profileInfoJobNode = document.querySelector('.profile__info-job');





// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

 function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                         // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = popupContainer.querySelector('.popup__field_name');// Воспользуйтесь инструментом .querySelector()
    let jobInput =popupContainer.querySelector('.popup__field_job'); // Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileInfoNameNode = document.querySelector('.profile__info-name');
    let profileInfoJobNode = document.querySelector('.profile__info-job');

    // Вставьте новые значения с помощью textContent
    profileInfoNameNode.textContent=nameInput.value;
    profileInfoJobNode.textContent=jobInput.value;
    closePopup()
 }

 // Прикрепляем обработчик к форме:
 // он будет следить за событием “submit” - «отправка»
const popupButtonSubmitClick = document.querySelector('.popup__button-submit');

 popupButtonSubmitClick.addEventListener('click', formSubmitHandler);
