import React from "react";
import logo from "../images/logo.svg";
import { Link } from 'react-router-dom'; 

function Header() {
	return (
		<header className="header">
			<img src={logo} alt="логотип." className="header__logo logo" />
    
      <Link to='/sign-up' style={{textDecoration: 'none'}} className="button_condition_hover">
        <p className="header__link">Регистрация
        </p>
        </Link> 
  
		</header>
	);
}

export default Header;
