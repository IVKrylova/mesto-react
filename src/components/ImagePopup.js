function ImagePopup(props) {
  return (
    <section className={`popup popup_background_opacity ${Object.keys(props.card).length ? 'popup_opened' : ''}`} id="element-popup">
      <div className="popup__card">
        <button onClick={props.onClose} type="button" className="button-close" aria-label="Кнопка закрыть"></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <h2 className="popup__description">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
