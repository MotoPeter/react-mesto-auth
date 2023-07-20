import React from "react";

const AuthForm = ({ onSubmit, title, buttonSubmitText, ...props }) => {
	const [formValue, setFormValue] = React.useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormValue({
			...formValue,
			[name]: value,
		});
	};

	const onSubmitAuthForm = (e) => {
		e.preventDefault();
		onSubmit(formValue);
	};

	return (
		<>
			<form className="auth-form" name={"name"} noValidate>
				<h2 className="auth-form__title">{title}</h2>
				<input
					className="auth-form__input"
					name="email"
					id="email"
					type="email"
					placeholder="Email"
					value={formValue.email || ""}
					minLength="5"
					maxLength="50"
					required
					autoComplete="off"
					onChange={handleChange}
				/>
				<input
					className="auth-form__input"
					styles={{ marginTop: 30 }}
					name="password"
					id="password"
					type="password"
					placeholder="Пароль"
					value={formValue.password || ""}
					minLength="4"
					maxLength="20"
					required
					autoComplete="off"
					onChange={handleChange}
				/>
				<button
					className="auth-form__button button_condition_hover"
					type="submit"
					onClick={onSubmitAuthForm}
				>
					{buttonSubmitText}
				</button>
				{props.children}
			</form>
		</>
	);
};

export default AuthForm;
