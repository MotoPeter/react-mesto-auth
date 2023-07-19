import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
	const currentUser = React.useContext(CurrentUserContext);

	const [name, setName] = React.useState("");
	const [description, setDescription] = React.useState("");

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleChangeName(evt) {
		setName(evt.target.value);
	}

	function handleChangeDescription(evt) {
		setDescription(evt.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateUser({
			name,
			about: description,
		});
	}

	return (
		<PopupWithForm
			title="Редактировать профиль"
			name="user-edit"
			buttonSubmitText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			children={
				<fieldset className="popup__fieldset">
					<label className="popup__label">
						<input
							id="name-input"
							name="name"
							value={name || ''}
							placeholder="Имя"
							required
							autoComplete="off"
							className="popup__input popup__input-first popup__input_data_name"
							type="text"
							minLength="2"
							maxLength="40"
							onChange={handleChangeName}
						/>
						<span className="name-input-error popup__input-error"></span>
					</label>
					<label className="popup__label">
						<input
							id="ocupation-input"
							name="about"
							value={description || ''}
							placeholder="Род занятий"
							required
							autoComplete="off"
							className="popup__input popup__input-second popup__input_data_ocupation"
							type="text"
							minLength="2"
							maxLength="200"
							onChange={handleChangeDescription}
						/>
						<span className="ocupation-input-error popup__input-error"></span>
					</label>
				</fieldset>
			}
		></PopupWithForm>
	);
}

export default EditProfilePopup;
