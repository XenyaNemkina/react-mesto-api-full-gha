import React from "react";

function PopupWithForm({ onSubmit, ...props }) {
  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }
    if (props.isOpen) {
    window.addEventListener("keydown", handleEscClose);
    return () => window.removeEventListener("keydown", handleEscClose);
  }}, [props, props.isOpen, props.onClose]);

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} onSubmit={onSubmit}>
          {props.children}
          <button type="submit" className="popup__save">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
