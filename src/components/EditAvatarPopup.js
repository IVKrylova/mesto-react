import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  // переменная для доступа к элементу инпута
  const inputRef = React.useRef();
  // хуки состояния валидности input type="url"
  const [isValid, setIsValid] = React.useState(true);

  // обработчик изменения инпута
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });

    // сброс значений инпутов формы
    inputRef.current.value = '';
  }

  // функция проверки валидности input type="url"
  function checkInputUrl() {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    if (!regex.test(inputRef.current.value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар"
                  onSubmit={handleSubmit}
                  isRenderLoading={props.isRenderLoading}
                  isOpen={props.isOpen} onClose={props.onClose}
                  buttonText={props.buttonText}
                  isValid={isValid}>
      <input onChange={checkInputUrl} ref={inputRef} type="url" className={`form__item ${isValid ? '' : 'form__item_type_error'}`} id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
      <span className={`form__input-error ${isValid ? '' : 'form__input-error_active'}`}>
        {isValid ? '' : 'Введите URL'}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


