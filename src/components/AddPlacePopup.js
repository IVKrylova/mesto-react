import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // стейты со значениями инпутов
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  // хуки состояния валидности input type="url"
  const [isValidLink, setIsValidLink] = React.useState(true);
  // хуки состояния валидности input name="name"
  const [isValidName, setIsValidName] = React.useState(true);

  // oбработчик изменения инпута
  function handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    if (name === 'name') {
      checkInputName(value);
      setName(value);
    }
    if (name === 'link') {
      checkInputLink(value);
      setLink(value);
    }
  }

  // обраотчик формы
  function handleSubmit(evt) {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: link,
    });

    // сброс значений инпутов формы
    setName('');
    setLink('');
  }

  // функция проверки валидности input type="url"
  function checkInputLink(value) {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    if (!regex.test(value)) {
      setIsValidLink(false);
    } else {
      setIsValidLink(true);
    }
  }

  // функция проверки валидности input name="name"
  function checkInputName(value) {
    if (value.length < 2 || value.length > 30) {
      setIsValidName(false);
    } else {
      setIsValidName(true);
    }
  }

  return (
    <PopupWithForm name="add-card" title="Новое место"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  isRenderLoading={props.isRenderLoading}
                  buttonText={props.buttonText}
                  onSubmit={handleSubmit}
                  isValid={isValidLink && isValidName}>
      <input type="text" value={name} onChange={handleChange} className={`form__item ${isValidName ? '' : 'form__item_type_error'}`} id="place" name="name" placeholder="Название" required />
      <span className={`form__input-error ${isValidName ? '' : 'form__input-error_active'}`}>
        {isValidName ? '' : 'Заполните это поле'}
      </span>
      <input type="url" value={link} onChange={handleChange} className={`form__item ${isValidLink ? '' : 'form__item_type_error'}`} id="place-url" name="link" placeholder="Ссылка на картинку" required />
      <span className={`form__input-error ${isValidLink ? '' : 'form__input-error_active'}`}>
        {isValidLink ? '' : 'Введите URL'}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
