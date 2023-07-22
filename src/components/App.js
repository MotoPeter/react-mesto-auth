import React, { useState, useEffect } from "react";
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
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from "./ProtectedRoute";
import * as mestoAuth from "../utils/mestoAuth.js";
import imgOk from "../images/img-ok.png";
import imgNone from "../images/img-none.png";

function App() {
	const [currentUser, setCurrentUser] = useState({});
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const [cards, setCards] = React.useState([]);
	const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isRegister, setIsRegister] = useState(false);
	const [userData, setUserData] = useState({
		id: "",
		email: "",
	});
	const [isLoading, setIsLoading] = React.useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		tokenCheck();
	}, []);

	const tokenCheck = () => {
		if (localStorage.getItem("token")) {
			const token = localStorage.getItem("token");
			mestoAuth
				.getContent(token)
				.then((res) => {
					if (res) {
						const userData = {
							id: res.data._id,
							email: res.data.email,
						};
						setIsLoggedIn(true);
						setUserData(userData);
						navigate("/", { replace: true });
					}
				})
				.catch((err) => {
					console.log(err.status);
				});
		}
	};

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

	useEffect(() => {
		Promise.all([api.getInitialCards(), api.getUserInfo()])
			.then(([initialCards, userInfo]) => {
				setCards(initialCards);
				setCurrentUser(userInfo);
			})
			.catch((err) => {
				console.log(err.status);
			});
	}, []);

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
		setIsLoading(true);
		api
			.editProfile({ name, about })
			.then((userInfo) => {
				setCurrentUser(userInfo);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err.status);
			})
			.finally(() => setIsLoading());
	}

	function handleUpdateAvatar({ avatar }) {
		setIsLoading(true);
		api
			.editAvatar({ avatar })
			.then((userInfo) => {
				setCurrentUser(userInfo);
				closeAllPopups();
			})
			.catch((err) => {
				console.log(err.status);
			})
			.finally(() => setIsLoading());
	}

	function handleAddPlaceSubmit({ name, link }) {
		setIsLoading(true);
		api
			.addNewCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch(console.error)
			.finally(() => setIsLoading());
	}

	const handleRegistrSubmit = (formValue) => {
		const { password, email } = formValue;
		mestoAuth
			.register(password, email)
			.then((res) => {
				setIsRegister(true);
				tooltipOpen();
				inCaseRegister();
			})
			.catch((err) => {
				setIsRegister(false);
				tooltipOpen();
				console.log(err);
			})
			.finally(() => {
				tooltipOpen();
			});
	};

	const handleLoginSubmit = (formValue) => {
		const { password, email } = formValue;
		mestoAuth
			.authorization(password, email)
			.then((data) => {
				console.log(data);
				if (data.token) {
					localStorage.setItem("token", data.token);
					tokenCheck();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const inCaseRegister = () => {
		navigate("/sign-in", { replace: true });
		//setIsRegister(true);
	};

	const tooltipOpen = () => {
		setIsInfoTooltipPopup(true);
	};

	useEffect(() => {
		if (isInfoTooltipPopup)
			setTimeout(() => {
				closeAllPopups();
			}, 2000);
	}, [isInfoTooltipPopup]);

	const handleExit = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		setUserData({
			id: "",
			email: "",
		});
		navigate("/sign-in", { replace: true });
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
							<ProtectedRouteElement loggedIn={isLoggedIn}>
								<>
									<Header
										linkTitle={"Выйти"}
										linkTo={"/sign-in"}
										handleExit={handleExit}
									>
										{userData.email}
									</Header>
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
							</ProtectedRouteElement>
						}
					/>
				</Routes>

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen && "popup_openend"}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen && "popup_openend"}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
					isLoading={isLoading}
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
					isLoading={isLoading}
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
