import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
	const placeLinkRef = React.useRef("");
	const placeTitleRef = React.useRef("");
	const [name, setName] = React.useState("");
	const [link, setLink] = React.useState("");

	React.useEffect(() => {
		placeTitleRef.current.value = '';
    placeLinkRef.current.value= '';
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({
			name: placeTitleRef.current.value,
			link: placeLinkRef.current.value,
		});
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="place-add"
			buttonSubmitText="Создать"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			children={
				<fieldset className="popup__fieldset">
					<label className="popup__label">
						<input
							id="place-input"
							name="name"
							placeholder="Название"
							autoComplete="off"
							className="popup__input popup__input_data_location popup__input-first"
							type="text"
							required
							minLength="2"
							maxLength="30"
							ref={placeTitleRef}
						/>
						<span className="place-input-error popup__input-error"></span>
					</label>
					<label className="popup__label">
						<input
							id="link-input"
							name="link"
							placeholder="Ссылка на картинку"
							autoComplete="off"
							className="popup__input_data_link-foto popup__input"
							type="url"
							required
							ref={placeLinkRef}
						/>
						<span className="link-input-error popup__input-error"></span>
					</label>
				</fieldset>
			}
		/>
	);
}

export default AddPlacePopup;
