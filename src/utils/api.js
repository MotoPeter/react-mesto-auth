import { checkResponse } from "./checkResponse";

class Api {
	//в конструктор url и заголовок в виде массива - токен авторизации и тип данных
	constructor(url, headers, checkResponse) {
		this._url = url;
		this._headers = headers;
		this._checkResponse = checkResponse;
	}

  //универсальный метод проверки запроса
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  //загрузка карточек с сервера
	getInitialCards() {
		//запрос на сервер на получение карточек
		return this._request(`${this._url}/cards`, {
			headers: this._headers,
			//получив промис проверяем статус
		})
	}

	//получение данных пользователя с сервера
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		}).then(this._checkResponse);
	}

	//редактирование профиля на вход массив с именем и профессией
	editProfile({ name, about }) {
		return fetch(`${this._url}/users/me`, {
			//метод для частичного обновления
			method: "PATCH",
			headers: this._headers,
			//преобразуем в строку
			body: JSON.stringify({
				name,
				about,
			}),
			//полученный промис отправляем на проверку статуса
		}).then(this._checkResponse);
	}

	//отправка на сервер новой карточки
	addNewCard(formValues) {
		return fetch(`${this._url}/cards`, {
			//метод для отправки данных
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({
				name: formValues["name"],
				link: formValues["link"],
			}),
		}).then(this._checkResponse);
	}

	//редактирование аватара
	editAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar,
			}),
		}).then(this._checkResponse);
	}

	deleteCard(place) {
		return fetch(`${this._url}/cards/${place._id}`, {
			//метод для отправки данных
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkResponse);
	}

	// Ставим лайк
	putLike(place) {
		return fetch(`${this._url}/cards/${place._id}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then(this._checkResponse);
	}

	// Убираем лайк
	delLike(place) {
		return fetch(`${this._url}/cards/${place._id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._checkResponse);
	}

	changeLikeCardStatus(place, isLiked) {
		if (isLiked) {
			return this.putLike(place);
		} else {
			return this.delLike(place);
		}
	}
}

//токен для авторизации
const token = "6eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGY4M2JlZmEwYjkwNzRiYjhiYjQ0MmQiLCJpYXQiOjE2OTM5OTYzMjMsImV4cCI6MTY5NDYwMTEyM30.EdZwltUwU0AIuxLNu2BokFATIOa9nWlkS1oFxCV8jOwa24768-e3b3-4cce-a68a-3bff993d63e5";
//создаем элемент api
export const api = new Api(
	"https://api.mesto.motopeter.nomoredomainsicu.ru",
	{
		authorization: token,
		"Content-Type": "application/json",
	},
  //функция проверки ответа от сервера
	checkResponse
);
