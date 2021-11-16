import React, { useEffect, useState } from 'react';
import Nav from '../General/Nav';
import MobileNav from '../General/MobileNav';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Footer from '../Sections/Footer';
import styles from '../../styles/Home.module.scss';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../Redux/slices/userSlice';
import { getUsers } from '../../api';
import { useRouter } from 'next/router';
import { isMobileChange } from '../../Redux/slices/mobileSlice';

interface Props {}

const Layout = ({ children }: any) => {
	const [width, setWidth] = useState<number>(0);
	const [allUsers, SetAllUsers] = useState<any | null>(null);
	const router = useRouter();
	const dispatch = useAppDispatch();

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}
	const mobileSize = useAppSelector((state: RootState) => state.isMobile.value);

	//Event listener for mobile TS
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	let isMobile: boolean = width <= 900;

	useEffect(() => {
		dispatch({ type: isMobileChange, payload: isMobile });
	}, [width]);

	useEffect(() => {
		if (window.innerWidth > 900) {
			dispatch({ type: isMobileChange, payload: false });
		} else {
			dispatch({ type: isMobileChange, payload: true });
		}
	}, []);

	useEffect(() => {
		getUsers(SetAllUsers);
		if (allUsers) {
			if (localStorage.getItem('poke-decks')) {
				let userToken: string = JSON.parse(localStorage.getItem('poke-decks'))
					.userDetails.token;

				let filitered: any = allUsers.data.filter((user: any) => {
					return user.refreshToken === userToken;
				});
				const currentUser: any = filitered[0];
				if (currentUser !== undefined) {
					dispatch({
						type: updateUser,
						payload: {
							firstName: currentUser.firstName,
							lastName: currentUser.lastName,
							role: currentUser.role,
						},
					});
				}
			}
		}
	}, [allUsers !== null]);

	return (
		<>
			<div className={`${styles.backgroundcustom} ${styles.whiteText}`} />
			<div className={`${styles.container} ${styles.whiteText}`}>
				{mobileSize ? <MobileNav /> : <Nav />}
				{children}

				<footer className={`${styles.blackText} ${styles.footerContainer}`}>
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Layout;
