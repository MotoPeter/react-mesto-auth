import React, { Fragment, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Navigate, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from "./ProtectedRoute";
import { Link, useNavigate } from "react-router-dom";
import * as mestoAuth from "../utils/mestoAuth.js";
import imgOk from "../images/img-ok.png";
import imgNone from "../images/img-none.png";

function App() {
	const [currentUser, setCurrentUser] = useState([]);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = React.useState([]);
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);

	const navigate = useNavigate();

  console.log(isLoggedIn);

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);

		api
			.changeLikeCardStatus(card, !isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch((err) => {
				console.log(err.status);
			});
	}

	function handleCardDel(card) {
		api
			.deleteCard(card)
			.then((res) => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch((err) => {
				console.log(err.status);
			});
	}

	React.useEffect(() => {
		Promise.all([api.getInitialCards(), api.getUserInfo()])
			.then(([initialCards, userInfo]) => {
				setCards(initialCards);
				setCurrentUser(userInfo);
			})
			.catch((err) => {
				console.log(err.status);
			});
	}, [isLoggedIn]);

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(null);
		setIsInfoTooltipPopup(false);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleUpdateUser({ name, about }) {
		api
			.editProfile({ name, about })
			.then((userInfo) => {
				setCurrentUser(userInfo);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err.status);
			});
	}

	function handleUpdateAvatar({ avatar }) {
		api
			.editAvatar({ avatar })
			.then((userInfo) => {
				setCurrentUser(userInfo);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err.status);
			});
	}

	function handleAddPlaceSubmit({ name, link }) {
		api
			.addNewCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err.status);
			});
	}

	const handleRegistrSubmit = (formValue) => {
		const { password, email } = formValue;
		setIsRegister(false);
		mestoAuth.register(password, email, tooltipOpen, inCaseRegister);
	};

	const handleLoginSubmit = (formValue) => {
		const { password, email } = formValue;
		console.log({ password, email });
    console.log(isLoggedIn);
		setIsLoggedIn(true);
		navigate("/a", { replace: true });
    console.log(isLoggedIn);
		//mestoAuth
		//	.authorization(password, email).then(() => {
		//    navigate("/", { replace: true });
		//  })
	};

	const inCaseRegister = () => {
		navigate("/sign-in", { replace: true });
		setIsRegister(true);
	};

	const tooltipOpen = () => {
		setIsInfoTooltipPopup(true);
	};

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Routes>
					<Route
						path="/sign-up"
						element={<Register handleSubmit={handleRegistrSubmit} />}
					/>
					<Route path="*" element={<Login />} />
					<Route
						path="/sign-in"
						element={<Login handleLoginSubmit={handleLoginSubmit} />}
					/>
					<Route
						path="/"
						element={
							isLoggedIn ? (
								<Navigate to="/a" replace />
							) : (
								<Navigate to="/sign-in" replace />
							)
						}
					/>
					<Route
						path="/a"
						element={
							<ProtectedRouteElement
              path='/a'
								element={
									<>
										<Header />
										<Main
											onEditAvatar={handleEditAvatarClick}
											onEditProfile={handleEditProfileClick}
											onAddPlace={handleAddPlaceClick}
											handleCardClick={handleCardClick}
											handleCardLike={handleCardLike}
											cards={cards}
											handleCardDel={handleCardDel}
										/>
										<Footer />
									</>
								}
								loggedIn={isLoggedIn}
							/>
						}
					/>
				</Routes>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen && "popup_openend"}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen && "popup_openend"}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
				/>

				<PopupWithForm
					title="Вы уверены?"
					name="delete-place"
					buttonSubmitText="Да"
					onClose={closeAllPopups}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen && "popup_openend"}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>

				{selectedCard && (
					<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				)}

				<InfoTooltip
					title={
						isRegister
							? "Вы успешно зарегистрировались!"
							: "Что то пошло не так! Попробуйте еще раз!"
					}
					imgAlt={isRegister ? "галочка" : "крестик"}
					imgSrc={isRegister ? imgOk : imgNone}
					onClose={closeAllPopups}
					isOpen={isInfoTooltipPopup && "popup_openend"}
					name={"infoTooltip"}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
