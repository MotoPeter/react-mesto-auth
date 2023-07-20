export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email, tooltipOpen, inCaseRegister) => {
	return fetch(`${BASE_URL}/signup`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	})
		.then((res) => {
			try {
				if (res.status >= 200 && res.status < 300) {
					inCaseRegister();
					return res.json();
				}
			} catch (e) {
				return e;
			}
		})
		.then((res) => {
			tooltipOpen();
			return res;
		})
		.catch((err) => console.log(err));
};

export const authorization = (password, email) => {
	return fetch(`${BASE_URL}/signin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ password: password, email: email }),
	}).then((res) => {
		try {
			if (res.status >= 200 && res.status < 300) {
				return res.json();
			}
		} catch (e) {
			return e;
		}
	});
};

export const getContent = (token) => {
	return fetch(`${BASE_URL}/users/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => data);
};
