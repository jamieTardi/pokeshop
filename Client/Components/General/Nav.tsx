import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import Image from 'next/Image';
import Logo from '../../Images/pokeLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/slices/userSlice';
import { RootState } from '../../Redux/store';

const Nav = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const currentUser = useSelector((state: RootState) => state.user.value);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	let navItems: string[] = [
		'Products',
		'New releases',
		'Coming Soon',
		'Members',
		'Customer Service',
	];

	const handleLogout = () => {
		dispatch({ type: logoutUser });
		router.push('/');
	};

	useEffect(() => {
		if (currentUser) {
			setIsSignedIn(true);
		} else {
			setIsSignedIn(false);
		}
	}, [currentUser]);

	return (
		<nav className={styles.nav}>
			<div>
				<Image src={Logo} alt='logo' height={40} width={140} />
			</div>
			<ul className={styles.listContainer}>
				{navItems.map((item) => (
					<li className={styles.navitems} key={item}>
						{item}
					</li>
				))}
			</ul>
			<div>
				{!isSignedIn ? (
					<>
						<Link href='/signIn'>
							<Button variant='text' sx={{ color: 'white' }}>
								Login
							</Button>
						</Link>
						<Link href='/register'>
							<Button variant='text' sx={{ color: 'white' }}>
								Register
							</Button>
						</Link>
					</>
				) : (
					<div className={styles.flexBetween} style={{ width: '100%' }}>
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
				)}
			</div>
		</nav>
	);
};

export default Nav;
