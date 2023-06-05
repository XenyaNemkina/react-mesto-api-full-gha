import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSetName(evt) {
    setName(evt.target.value);
  }

  function handleSetLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      name="new-card" 
      title="Новое место" 
      buttonText={onLoading ? "Сохранение..." : "Создать"}>
        <input id="new-card-name" type="text" name="name" className="popup__field popup__field_type_name" placeholder="Название" autoComplete="off" minLength="2" maxLength="30" required value={name || ""} onChange={handleSetName} />
        <span id="new-card-name-error" className="popup__error popup__error_active"></span>
        <input id="new-card-src" name="link" className="popup__field popup__field_type_src" placeholder="Ссылка на картинку" autoComplete="off" type="url" required value={link || ""} onChange={handleSetLink} />
        <span id="new-card-src-error" className="popup__error popup__error_active"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
