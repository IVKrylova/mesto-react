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
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit-avatar" title="Обновить аватар" isOpen={props.isOpen}/* isEditAvatarPopupOpen */ onClose={/* closeAllPopups */props.onClose} buttonText="Сохранить">
      <input ref={inputRef} type="url" className="form__item" id="avatar-url" name="avatar" placeholder="Ссылка на аватар" required />
      <span className="avatar-url-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


