//импорт функции проверки ответа от сервера
import { checkResponse } from "./checkResponse";
const BASE_URL = "https://api.mesto.motopeter.nomoredomainsicu.ru";

//передача на сервер данных регистрации - емаил и пароль
export const register = (password, email) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	}).then(checkResponse); //передача функции проверки ответа
};

//запрос на сервер при авторизации - пароль и емаил
export const authorization = (password, email, token) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	}).then(checkResponse);
};

//запрос на сервер проверки токена
export const getContent = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			authorization: token,
		},
	}).then(checkResponse);
};
