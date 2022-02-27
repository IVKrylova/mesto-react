import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  // переменная для доступа к элементу инпута
  const inputRef = React.useRef();

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

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар"
                  onSubmit={handleSubmit}
                  isRenderLoading={props.isRenderLoading}
                  isOpen={props.isOpen} onClose={props.onClose}
                  buttonText=/* "Сохранить" */{props.buttonText}>
      <input ref={inputRef} type="url" className="form__item" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
      <span className="avatar-url-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


