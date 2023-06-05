import React from "react";

function ImagePopup({ card, onClose }) {
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (card) {
      window.addEventListener("keydown", handleEscClose);
      return () => window.removeEventListener("keydown", handleEscClose);
    }}, [card, onClose]);
  
  return (
    <section className={`popup popup_full-image ${card.link ? "popup_is-opened" : ""}`}>
      <div className="popup__container popup__container_full-image">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__img popup__img_full-image" src={card.link} alt={card.name} />
        <h2 className="popup__name popup__name_full-image">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
