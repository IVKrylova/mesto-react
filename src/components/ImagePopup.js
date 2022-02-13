function ImagePopup(props) {
  return (
    <section className={`popup popup_background_opacity ${props.card ? 'popup_opened' : ''}`} id="element-popup">
      <div className="popup__card">
        <button onClick={props.onClose} type="button" className="button-close" aria-label="Кнопка закрыть"></button>
        <img className="popup__image" src={props.card} alt="Фотография места" />
        <h2 className="popup__description"></h2>
      </div>
    </section>
  );
}

export default ImagePopup;
