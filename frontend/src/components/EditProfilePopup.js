import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setDescription(currentUser ? currentUser.about : "");
  }, [currentUser, isOpen]);

  function handleName(evt) {
    setName(evt.target.value);
  }

  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: name, about: description });
  }

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      name="profile" 
      title="Редактировать профиль" 
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}>
        <input id="name" type="text" name="name" className="popup__field popup__field_type_nickname" placeholder="Имя" autoComplete="off" minLength="2" maxLength="40" required value={name || ""} onChange={handleName} />
        <span id="name-error" className="popup__error popup__error_active"></span>
        <input id="prof" type="text" name="about" className="popup__field popup__field_type_prof" placeholder="О себе" autoComplete="off" minLength="2" maxLength="200" required value={description || ""} onChange={handleDescription} />
        <span id="prof-error" className="popup__error popup__error_active"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
