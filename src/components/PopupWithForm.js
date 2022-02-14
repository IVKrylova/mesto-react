function PopupWithForm(props) {
  return(
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={props.onClose} type="button" className="button-close" aria-label="Кнопка закрыть"></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form form" name={`form-${props.name}`} id={`form-${props.name}`} noValidate>
          {props.children}
          <button type="submit" className="form__button">{props.buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;