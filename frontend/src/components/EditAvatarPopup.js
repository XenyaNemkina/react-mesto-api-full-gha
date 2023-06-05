import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avaRef = React.useRef();

  React.useEffect(() => {
    avaRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avaRef.current.value,
    });
  }

  return (
    <PopupWithForm 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit} 
      name="new-avatar" 
      title="Обновить аватар" 
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}>
        <input id="avatar" name="link" className="popup__field popup__field_type_src" placeholder="Ссылка на аватар" autoComplete="off" type="url" required ref={avaRef} />
        <span id="avatar-error" className="popup__error popup__error_active"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
