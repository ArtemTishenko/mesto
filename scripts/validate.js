const popupEdditForm = document.querySelector('.popup__container_type_eddit-form');
const popupFieldInput = popupEdditForm.querySelector('.popup__field');
//console.log(popupFieldInput);
const showInputError = (element)=>{
  element.classList.add('popup__field_type_error');
  console.log(element.classList);
}
const hideInputError = (element)=>{
  element.classList.remove('popup__field_type_error');
  console.log(element.classList);
}
const  isValid = ()=>{
  if(!popupFieldInput.validity.valid){
    //console.log(`Поле волидно  ${popupFieldInput.validity.valid}`);
    showInputError(popupFieldInput);
  }else {
    hideInputError(popupFieldInput);
  }
}

popupEdditForm.addEventListener('submit', (evt => evt.preventDefault()));

popupFieldInput.addEventListener('input', isValid);
