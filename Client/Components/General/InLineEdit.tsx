import React, { useState } from 'react';
import styles from '../../styles/InLine.module.scss';

interface Props {
	value: string;
	setValue: Function;
	type: string;
	currentUser: { address: object };
	setCurrentUser: Function;
	currentValue: string;
}

interface KeyboardEvent<T = Element> {
	altKey: boolean;
	/** @deprecated */
	charCode: number;
	ctrlKey: boolean;
	getModifierState(key: string): boolean;
	key: string;
	keyCode: number;
	locale: string;
	location: number;
	metaKey: boolean;
	repeat: boolean;
	shiftKey: boolean;
	which: number;
	target: any;
	blur: Function;
}
const InLineEdit = ({
	value,
	setValue,
	type,
	currentUser,
	setCurrentUser,
	currentValue,
}: Props) => {
	const [editingValue, setEditingValue] = useState<string>(value);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setEditingValue(event.target.value);

	const onKeyDown = (
		event: KeyboardEvent<HTMLInputElement> | React.KeyboardEvent,
	) => {
		if (event.key === 'Enter' || event.key === 'Escape') {
			event.target.blur();
		}
	};

	const onBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.trim() === '') {
			setValue(value);
		} else {
			switch (type) {
				case 'First':
					setCurrentUser({ ...currentUser, firstName: event.target.value });
					break;
				case 'Second':
					setCurrentUser({ ...currentUser, lastName: event.target.value });
					break;
				case 'Third':
					setCurrentUser({ ...currentUser, email: event.target.value });
					break;
				case 'Fourth':
					setCurrentUser({ ...currentUser, email: event.target.value });
					break;
				case 'Address One':
					setCurrentUser({
						...currentUser,
						address: {
							...currentUser.address,
							addressLineOne: event.target.value,
						},
					});
					break;
				case 'Address Two':
					setCurrentUser({
						...currentUser,
						address: {
							...currentUser.address,
							city: event.target.value,
						},
					});
					break;
				case 'Address Three':
					setCurrentUser({
						...currentUser,
						address: {
							...currentUser.address,
							county: event.target.value,
						},
					});
					break;
				case 'Address Four':
					setCurrentUser({
						...currentUser,
						address: {
							...currentUser.address,
							postCode: event.target.value,
						},
					});
					break;
				case 'Address Five':
					setCurrentUser({
						...currentUser,
						address: {
							...currentUser.address,
							country: event.target.value,
						},
					});
					break;
			}
		}
	};

	return (
		<input
			type='text'
			className={styles.inlineInput}
			aria-label='Field name'
			defaultValue={currentValue}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onBlur={onBlur}
		/>
	);
};

export default InLineEdit;
