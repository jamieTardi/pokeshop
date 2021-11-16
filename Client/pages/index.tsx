import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Nav from '../Components/General/Nav';
import styles from '../styles/Home.module.scss';
import { GlassCardHero } from '../Components/UIComponents/GlassCardHero';
import Image from 'next/image';
import HeroPic from '../Images/hero.png';
import Eevee from '../Images/eevee.png';
import { HomeSectionTwo } from '../Components/Sections/HomeSectionTwo';
import About from '../Components/Sections/About';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/slices/userSlice';
import { getUsers } from '../api';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import { RootState } from '../Redux/store';
import { isMobileChange } from '../Redux/slices/mobileSlice';

const Home: NextPage = () => {
	const router = useRouter();
	const mobileSize = useAppSelector((state: RootState) => state.isMobile.value);
	const [width, setWidth] = useState<number>(0);
	const [allUsers, SetAllUsers] = useState<any | null>(null);

	const dispatch = useAppDispatch();

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

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
			<Head>
				<title>Poke Decks | Boutique cards</title>
				<meta name='description' content='Pokemon card boutique store' />
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
			</Head>
			{/* <div className={`${styles.backgroundcustom} ${styles.whiteText}`} /> */}

			<div className={styles.canvas} />

			<div style={{ marginTop: '5%' }}>
				<GlassCardHero />
			</div>
			<div className={styles.heroContainer}>
				<div className={styles.flexBetween}>
					<Image src={Eevee} height={250} width={270} />
				</div>
				<div>
					<Image src={HeroPic} height={350} width={340} />
				</div>
			</div>
			<div>
				<HomeSectionTwo />
			</div>
			<div>
				<About />
			</div>

			<div className={`${styles.backgroundcustom2} ${styles.whiteText}`}></div>
		</>
	);
};

export default Home;
