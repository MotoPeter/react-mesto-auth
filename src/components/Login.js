import React from "react";
import Header from "./Header";
import AuthForm from "./AuthForm";

const Login = ({handleLoginSubmit}) => {
 
	return (
		<div>
			<Header />
			<AuthForm
				onSubmit={handleLoginSubmit}
				title={"Вход"}
				buttonSubmitText={"Войти"}
			/>
		</div>
	);
};

export default Login;
