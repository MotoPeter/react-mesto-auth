import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
	const avatarRef = React.useRef("");

	React.useEffect(() => {
		avatarRef.current.value = "";
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();
		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
		e.target.reset();
	}

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="avatar"
			buttonSubmitText="Сохранить"
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			children={
				<fieldset className="popup__fieldset">
					<input
						type="url"
						name="avatar"
						id="avatar-input"
						placeholder="Ссылка на картинку"
						className="popup__input popup__input_data_avatar"
						required
						ref={avatarRef}
					/>
					<span className="avatar-input-error popup__input-error"></span>
				</fieldset>
			}
		/>
	);
}

export default EditAvatarPopup;
