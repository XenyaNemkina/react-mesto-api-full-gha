import React from "react";

const Login = ({onSubmit}) => {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    const name = evt.target.name;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
    onSubmit(formValue.email, formValue.password);
    setFormValue({email: '', password: ''});
  };

  return (
    <main className="content">
      <section className="auth">
        <div className="auth__container">
          <h2 className="auth__title">Вход</h2>
          <form className="auth__form" onSubmit={handleSubmitLogin}>
            <input className="popup__field auth__field" type="email" name="email" placeholder="Email" minLength="2" autoComplete="off" value={formValue.email} onChange={handleChange} required />
            <span className="popup__error popup__error_active"></span>
            <input className="popup__field auth__field" type="password" name="password" placeholder="Пароль" minLength="2" autoComplete="off" value={formValue.password} onChange={handleChange} required />
            <span className="popup__error popup__error_active"></span>
            <button type="submit" onSubmit={handleSubmitLogin} className="popup__save popup__save_auth-button">
              Войти
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
export default Login;
