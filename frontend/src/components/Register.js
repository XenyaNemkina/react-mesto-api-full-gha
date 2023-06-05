import React from "react";
import { Link } from "react-router-dom";

const Register = ({ onSubmit }) => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue.email , formValue.password);
    setFormValue({
      email:'', 
      password: ''
    })
  };

  return (
    <main className="content">
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Регистрация</h2>
          <form className="auth__form" onSubmit={handleSubmitRegister}>
            <input className="popup__field auth__field" type="email" name="email" placeholder="Email" minLength="2" autoComplete="off" value={formValue.email} onChange={handleChange} required />
            <span className="popup__error popup__error_active"></span>
            <input className="popup__field auth__field" type="password" name="password" placeholder="Пароль" minLength="2" autoComplete="off" value={formValue.password} onChange={handleChange} required />
            <span className="popup__error popup__error_active"></span>
            <button type="submit" onSubmit={handleSubmitRegister} className="popup__save popup__save_auth-button">
              Зарегистрироваться
            </button>
            <p className="auth__text">
              Уже зарегистрированы?{" "}
              <Link to="/sign-in" className="auth__text_link">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
