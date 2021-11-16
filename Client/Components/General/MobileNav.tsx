import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Mobile.module.scss';
import Image from 'next/image';
import Logo from '../../Images/pokeLogo.png';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import { isNewAdmin } from '../../Redux/slices/isAdminSlice';
import { logoutUser } from '../../Redux/slices/userSlice';
import Link from 'next/link';
import { Button } from '@mui/material';

interface Props {}

const MobileNav = (props: Props) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const currentUser: any = useAppSelector(
		(state: RootState) => state.user.value,
	);
	const isAdmin = useAppSelector((state: RootState) => state.isAdmin.value);

	const toggleOpen = (): void => {
		setOpen((prev) => !prev);
	};

	const handleLogout = () => {
		dispatch({ type: logoutUser });
		dispatch({ type: isNewAdmin, payload: false });
		router.push('/');
		toggleOpen();
	};

	useEffect(() => {
		if (currentUser) {
			setIsSignedIn(true);

			if (currentUser.role === 'admin') {
				dispatch({ type: isNewAdmin, payload: true });
			} else {
				dispatch({ type: isNewAdmin, payload: false });
			}
		} else {
			setIsSignedIn(false);
			dispatch({ type: isAdmin, payload: false });
		}
	}, [currentUser]);

	return (
		<div style={{ marginTop: '5%' }}>
			<div className={styles.flexCenter}>
				<Image src={Logo} alt='logo' height={40} width={150} />
			</div>

			<nav className={open ? `${styles.nav} ${styles.active}` : styles.nav}>
				{isSignedIn ? (
					<div
						className={
							open
								? `${styles.nav__link} ${styles.active} ${styles.logout}`
								: styles.nav__link
						}
						style={{ width: '100%' }}>
						<p className={styles.welcome}>
							Hi{' '}
							{currentUser &&
								currentUser.firstName.charAt(0).toUpperCase() +
									currentUser.firstName.slice(1)}
							!
						</p>
						<Button
							variant='text'
							sx={{ color: 'white' }}
							onClick={handleLogout}>
							Logout
						</Button>
					</div>
				) : (
					<div className={styles.logout}>
						<Link href='/signIn'>
							<a
								onClick={() => {
									setOpen(false);
								}}
								className={
									open
										? `${styles.nav__link} ${styles.active}`
										: styles.nav__link
								}>
								Sign In
							</a>
						</Link>

						<Link href='/register'>
							<a
								onClick={() => {
									setOpen(false);
								}}
								className={
									open
										? `${styles.nav__link} ${styles.active}`
										: styles.nav__link
								}>
								Register
							</a>
						</Link>
					</div>
				)}
				<Link href='/'>
					<a
						onClick={() => {
							setOpen(false);
						}}
						className={
							open ? `${styles.nav__link} ${styles.active}` : styles.nav__link
						}>
						Home
					</a>
				</Link>
				<Link href='/'>
					<a
						className={
							open ? `${styles.nav__link} ${styles.active}` : styles.nav__link
						}>
						News
					</a>
				</Link>
				<Link href='/shop'>
					<a
						className={
							open ? `${styles.nav__link} ${styles.active}` : styles.nav__link
						}>
						Shop
					</a>
				</Link>
				<Link href='/'>
					<a
						className={
							open ? `${styles.nav__link} ${styles.active}` : styles.nav__link
						}>
						my Cart
					</a>
				</Link>
				{isAdmin && (
					<Link href='/admin'>
						<a
							onClick={() => {
								setOpen(false);
							}}
							className={
								open ? `${styles.nav__link} ${styles.active}` : styles.nav__link
							}>
							Dashboard
						</a>
					</Link>
				)}
			</nav>
			<div
				className={
					open ? `${styles.hamburger} ${styles.active} ` : styles.hamburger
				}
				onClick={toggleOpen}>
				<span className={styles.hamburger__patty}></span>
				<span className={styles.hamburger__patty}></span>
				<span className={styles.hamburger__patty}></span>
			</div>
		</div>
	);
};

export default MobileNav;