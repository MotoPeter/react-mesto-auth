import React from "react";
//создаем класс api для обмена информацией с сервером
class Api {
	//в конструктор url и заголовок в виде массива - токен авторизации и тип данных
	constructor(url, headers) {
		this._url = url;
		this._headers = headers;
	}

	//проверка статуса ответа
	_checkResponse(res) {
		//если статус 200, возвращаем промис с данными
		if (res.ok) {
			return res.json();
		}
		//если ошибка, возвращаем прмис со статусом ошибки
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	//загрузка карточек с сервера
	getInitialCards() {
		//запрос на сервер на получение карточек
		return fetch(`${this._url}/cards`, {
			headers: this._headers,
			//получив промис проверяем статус
		}).then((res) => this._checkResponse(res));
	}

	//получение данных пользователя с сервера
	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
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
		}).then((res) => this._checkResponse(res));
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
		}).then((res) => this._checkResponse(res));
	}

	//редактирование аватара
	editAvatar({ avatar }) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({
				avatar,
			}),
		}).then((res) => this._checkResponse(res));
	}

	deleteCard(place) {
		return fetch(`${this._url}/cards/${place._id}`, {
			//метод для отправки данных
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

	// Ставим лайк
	putLike(place) {
		return fetch(`${this._url}/cards/${place._id}/likes`, {
			method: "PUT",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
	}

	// Убираем лайк
	delLike(place) {
		return fetch(`${this._url}/cards/${place._id}/likes`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => this._checkResponse(res));
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
const token = "6ea24768-e3b3-4cce-a68a-3bff993d63e5";
//создаем элемент api
export const api = new Api("https://nomoreparties.co/v1/cohort-66", {
	authorization: token,
	"Content-Type": "application/json",
});
