import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // стейты со значениями инпутов
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // хуки состояния валидности input name="name"
  const [isValidName, setIsValidName] = React.useState(true);
  // хуки состояния валидности input name="description"
  const [isValidDescription, setIsValidDescription] = React.useState(true);

  // oбработчик изменения инпута
  function handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    if (name === 'name') {
      checkInputName(value);
      setName(value);
    }
    if (name === 'description') {
      checkInputDescription(value);
      setDescription(value);
    }
  }

  // после загрузки текущего пользователя из API eго данные будут использованы в управляемых компонентах
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      description: description
    });
  }

  // функция проверки валидности input name="name"
  function checkInputName(value) {
    if (value.length < 2 || value.length > 40) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  }

   // функция проверки валидности input name="description"
   function checkInputDescription(value) {
    if (value.length < 2 || value.length > 200) {
      setIsValidDescription(false);
    } else {
      setIsValidDescription(true);
    }
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  isRenderLoading={props.isRenderLoading}
                  onSubmit={handleSubmit}
                  buttonText={props.buttonText}
                  isValid={isValidName && isValidDescription}>
      <input type="text" value={name} onChange={handleChange} className={`form__item ${isValidName ? '' : 'form__item_type_error'}`} id="name" name="name" placeholder="Имя" required />
      <span className={`form__input-error ${isValidName ? '' : 'form__input-error_active'}`}>
        {isValidName ? '' : 'Заполните это поле'}
      </span>
      <input type="text" value={description} onChange={handleChange} className={`form__item ${isValidDescription ? '' : 'form__item_type_error'}`} id="profession" name="description" placeholder="О себе" required />
      <span className={`form__input-error ${isValidDescription ? '' : 'form__input-error_active'}`}>
        {isValidDescription ? '' : 'Заполните это поле'}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
