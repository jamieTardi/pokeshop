import React, { useState, useEffect } from 'react';
import InLineEdit from '../General/InLineEdit';
import { user } from '../../Interfaces/user';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import { getUser, updateUser } from '../../api';
import styles from '../../styles/Account.module.scss';
import { Button } from '@mui/material';

interface currentUser {
	currentUser: object;
	setCurrentUser: Function;
	firstName: string;
	_id: string;
	lastName: string;
	email: string;
	phoneNo: string;
	address: {
		addressLineOne: string;
		city: string;
		county: string;
		country: string;
		postCode: string;
	};
}

const MyDetails = () => {
	//local state
	const [value, setValue] = useState<string>('');
	const [currentUser, setCurrentUser] = useState<currentUser | null>(null);
	const [isError, setIsError] = useState<boolean>(false);
	const [type, setType] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	//Redux state
	const user = useAppSelector((state: RootState) => state.auth.value);

	//General logic
	const handleUpdate = () => {
		if (currentUser) {
			updateUser(currentUser._id, currentUser, setIsLoading);
		}
	};

	//UseEffects

	useEffect(() => {
		getUser(user.token, setCurrentUser);
	}, []);

	useEffect(() => {
		if (currentUser) {
			if (currentUser === undefined) {
				setIsError(true);
			} else {
				setIsError(false);
			}
		}
	}, [value]);

	if (!isError) {
		return (
			<>
				<h3>My Personal and delivery details</h3>
				{currentUser ? (
					<div className={styles.gridContainer}>
						<div
							className={styles.itemOne}
							onClick={() => {
								setType('First');
							}}>
							<p className={styles.smallFont}>First Name:</p>{' '}
							<InLineEdit
								value={value}
								setValue={setValue}
								type={type}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								currentValue={currentUser.firstName}
							/>
						</div>
						<div
							className={styles.itemTwo}
							onClick={() => {
								setType('Second');
							}}>
							<p className={styles.smallFont}>Last Name:</p>{' '}
							<InLineEdit
								value={value}
								setValue={setValue}
								type={type}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								currentValue={currentUser.lastName}
							/>
						</div>
						<div
							onClick={() => {
								setType('Third');
							}}>
							<p className={styles.smallFont}>Email:</p>{' '}
							<InLineEdit
								value={value}
								setValue={setValue}
								type={type}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								currentValue={currentUser.email}
							/>
						</div>

						<div
							onClick={() => {
								setType('Fourth');
							}}>
							<p className={styles.smallFont}>Phone No:</p>{' '}
							<InLineEdit
								value={value}
								setValue={setValue}
								type={type}
								currentUser={currentUser}
								setCurrentUser={setCurrentUser}
								currentValue={currentUser.phoneNo}
							/>
						</div>
						<div>
							<p className={styles.smallFont}>Address:</p>{' '}
							<div
								onClick={() => {
									setType('Address One');
								}}>
								<span className={styles.smallFont}>
									House Number and road name:
								</span>
								<InLineEdit
									value={value}
									setValue={setValue}
									type={type}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
									currentValue={currentUser.address.addressLineOne}
								/>
							</div>
							<div
								onClick={() => {
									setType('Address Two');
								}}>
								<span className={styles.smallFont}>City:</span>
								<InLineEdit
									value={value}
									setValue={setValue}
									type={type}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
									currentValue={currentUser.address.city}
								/>
							</div>
							<div
								onClick={() => {
									setType('Address Three');
								}}>
								<span className={styles.smallFont}>County:</span>
								<InLineEdit
									value={value}
									setValue={setValue}
									type={type}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
									currentValue={currentUser.address.county}
								/>
							</div>
							<div
								onClick={() => {
									setType('Address Four');
								}}>
								<span className={styles.smallFont}>Postcode:</span>
								<InLineEdit
									value={value}
									setValue={setValue}
									type={type}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
									currentValue={currentUser.address.postCode}
								/>
							</div>
							<div
								onClick={() => {
									setType('Address Five');
								}}>
								<span className={styles.smallFont}>Country:</span>
								<InLineEdit
									value={value}
									setValue={setValue}
									type={type}
									currentUser={currentUser}
									setCurrentUser={setCurrentUser}
									currentValue={currentUser.address.country}
								/>
							</div>
						</div>
						<Button variant='contained' color='success' onClick={handleUpdate}>
							Update Details
						</Button>
					</div>
				) : (
					<p>loading</p>
				)}
			</>
		);
	} else {
		<p>An Error has occured try logging in again!</p>;
	}
};

export default MyDetails;
