import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
	const [newPlace, setNewPlace] = React.useState({
		name: "",
		link: "",
	});

	React.useEffect(() => {
		setNewPlace({
			name: "",
			link: "",
		});
	}, [isOpen]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setNewPlace({
			...newPlace,
			[name]: value,
		});
	};

	function handleSubmit(e) {
		e.preventDefault();
		onAddPlace({
			name: newPlace.name,
			link: newPlace.link,
		});
	}

	return (
		<PopupWithForm
			title="Новое место"
			name="place-add"
			buttonSubmitText={!isLoading ? "Создать" : "Сохранение"}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
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
						value={newPlace.name || ""}
						onChange={handleChange}
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
						value={newPlace.link || ""}
						onChange={handleChange}
					/>
					<span className="link-input-error popup__input-error"></span>
				</label>
			</fieldset>
		</PopupWithForm>
	);
}

export default AddPlacePopup;
