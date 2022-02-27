import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // стейты со значениями инпутов
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  // oбработчик изменения инпута
  function handleChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'link') {
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

  return (
    <PopupWithForm name="add-card" title="Новое место"
                  isOpen={props.isOpen}
                  onClose={props.onClose}
                  isRenderLoading={props.isRenderLoading}
                  buttonText={props.buttonText}
                  onSubmit={handleSubmit} >
      <input type="text" value={name} onChange={handleChange} className="form__item" id="place" name="name" placeholder="Название" minLength="2" maxLength="30" required />
      <span className="place-input-error form__input-error"></span>
      <input type="url" value={link} onChange={handleChange} className="form__item" id="place-url" name="link" placeholder="Ссылка на картинку" required />
      <span className="place-url-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
