import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ linkTitle, linkTo, ...props }) {
	return (
		<header className="header">
			<img src={logo} alt="логотип." className="header__logo logo" />
			<div className="header__user-name">{props.children}</div>
			<button onClick={props.handleExit} className="header__button">
				<Link
					to={`${linkTo}`}
					style={{ textDecoration: "none" }}
					className="button_condition_hover"
				>
					<p className="header__link">{linkTitle}</p>
				</Link>
			</button>
		</header>
	);
}

export default Header;
