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
			//console.log(res.data._id);
			//localStorage.setItem('token', res.data._id);
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
	})
		.then((res) => {
			try {
				if (res.status >= 200 && res.status < 300) {
					return res.json();
				}
			} catch (e) {
				return e;
			}
		})
		.then((res) => {
			console.log(res.data._id);
			//localStorage.setItem('token', res.data._id);
			return res;
		})
		.catch((err) => console.log(err));
};
