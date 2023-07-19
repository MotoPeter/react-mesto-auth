import React from "react";
import Header from "./Header";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import * as mestoAuth from "../utils/mestoAuth.js";

const Register = ({handleSubmit}) => {

	return (
		<div>
			<Header />
			<AuthForm
				onSubmit={handleSubmit}
				title={"Регистрация"}
				buttonSubmitText={"Зарегистрироваться"}
			/>
		</div>
	);
};

export default Register;
