class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkHeaders = () => {
    this._token = localStorage.getItem('token');
    this._headers.authorization = `Bearer ${this._token}`;
    return this._headers;
  };

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
        return res.json();
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
    {headers: this._checkHeaders()})
    .then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, 
    {headers: this._checkHeaders()})
    .then(this._getResponseData);
  }

  //добавление информации о пользователе
  setUserInfo({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._checkHeaders(),
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getResponseData);
  }

  //сменить аватар
  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._checkHeaders(),
      body: JSON.stringify({
        avatar: `${data.avatar}`,
      }),
    }).then(this._getResponseData);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/` + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/` + cardId + "/likes", {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getResponseData);
    } else {
      return fetch(`${this._baseUrl}/cards/` + cardId + "/likes", {
        method: "PUT",
        headers: this._headers,
      }).then(this._getResponseData);
    }
  }
}

const api = new Api({
  baseUrl: // "http://localhost:3000",
   "https://api.mesto.xenyanemkina.nomoredomains.rocks",
  headers: {
     "Content-Type": "application/json",
     "Accept": "application/json",
  },
});

export default api;