import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // стейты со значениями инпутов
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // oбработчик изменения инпута
  function handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
  }

  // после загрузки текущего пользователя из API eго данные будут использованы в управляемых компонентах
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      description: description
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить">
      <input type="text" value={name} onChange={handleChange} className="form__item" id="name" name="name" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className="name-input-error form__input-error"></span>
      <input type="text" value={description} onChange={handleChange} className="form__item" id="profession" name="description" placeholder="О себе" minLength="2" maxLength="200" required />
      <span className="profession-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;


/* // Подписка на контекст
const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
React.useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser]); */

/* // Обработчик изменения инпута обновляет стейт
function handleChange(e) {
  setValue(e.target.value);
}

return (
      // Значение элемента «привязывается» к значению стейта
  <input type="text" value={value} onChange={handleChange} />
);
} */
