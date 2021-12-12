import React, { useEffect, useState } from 'react';
import Nav from '../General/Nav';
import MobileNav from '../General/MobileNav';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Footer from '../Sections/Footer';
import styles from '../../styles/Home.module.scss';
import { updateUser } from '../../Redux/slices/userSlice';
import { getUsers } from '../../api';
import { useRouter } from 'next/router';
import { isMobileChange } from '../../Redux/slices/mobileSlice';
import { updateCart } from '../../Redux/slices/cartSlice';
import { KeepSignedIn } from '../../Redux/slices/authSlice';

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
	const user = useAppSelector((state: RootState) => state.user.value);

	// cart logic on login

	useEffect(() => {
		if (user) {
			if (localStorage.getItem('poke-decks')) {
				let user = JSON.parse(localStorage.getItem('poke-decks') || '{}');
				const { token } = user.userDetails;
				dispatch({ type: KeepSignedIn, payload: token });
			}
		}
	}, [user]);

	useEffect(() => {
		if (localStorage.getItem('poke-cart')) {
			let cart = JSON.parse(localStorage.getItem('poke-cart') || '{}');
			dispatch({ type: updateCart, payload: cart });
		}
	}, []);

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
				let userToken: string = JSON.parse(
					localStorage.getItem('poke-decks') || '{}',
				).userDetails.token;

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
			<div>
				<div className={`${styles.whiteText} ${styles.containerPadding}`}>
					{mobileSize ? <MobileNav /> : <Nav />}
					{children}
				</div>
				<footer className={`${styles.blackText} ${styles.footerContainer}`}>
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Layout;
