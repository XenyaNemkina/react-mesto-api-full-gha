import { Routes, Route, Link } from "react-router-dom";

function NavBar({email, onLogout}) {
  return (
    <div className="header__navbar">
      <Routes>
        <Route exact path="/sign-in" element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route exact path="/sign-up" element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route exact path="/" element={
          <>
            <p className="header__email">{email}</p>
            <button type="button" className="header__signout" onClick={onLogout}>Выйти</button>
          </>
          }
        />
      </Routes>
      </div>
      )
  }  
  


export default NavBar;
