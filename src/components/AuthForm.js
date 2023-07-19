import React from "react";
import { Link } from 'react-router-dom';

const AuthForm = ({ onSubmit, title, buttonSubmitText }) => {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: '',
  })
  
  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const onSubmitAuthForm = (e) => {
    e.preventDefault();
    onSubmit(formValue)    
  }
  
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
					value={formValue.email || ''}
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
					value={formValue.password || ''}
					minLength="4"
					maxLength="20"
					required
					autoComplete="off"
          onChange={handleChange}
				/>
				<button className="auth-form__button" type="submit" onClick={onSubmitAuthForm}>
					{buttonSubmitText}
				</button>
				<p className="auth-form__footer">
					Уже зарегистрированы?
					<Link to="/sign-in" style={{ textDecoration: "none" }} className="button_condition_hover">
						<span style={{margin:0, color:'white', marginLeft:4}}> Войти</span>
					</Link>
				</p>
			</form>
		</>
	);
};

export default AuthForm;
