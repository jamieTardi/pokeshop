import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import Image from 'next/image';
import Logo from '../../Images/pokeLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/slices/userSlice';
import { RootState } from '../../Redux/store';
import Dashboard from '../Admin/DashboardItems/Dashboard';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { isNewAdmin } from '../../Redux/slices/isAdminSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Nav = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const currentUser: any = useAppSelector(
		(state: RootState) => state.user.value,
	);
	const isAdmin = useAppSelector((state: RootState) => state.isAdmin.value);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	let navItems: string[] = ['Products', 'News', 'shop', 'Contact'];

	const handleLogout = () => {
		dispatch({ type: logoutUser });
		dispatch({ type: isNewAdmin, payload: false });
		router.push('/');
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
		<nav className={styles.nav}>
			<div style={{ cursor: 'pointer' }}>
				<Link href='/'>
					<Image src={Logo} alt='logo' height={40} width={140} />
				</Link>
			</div>
			<ul className={styles.listContainer}>
				{navItems.map((item) => (
					<Link href={`/${item}`}>
						<li className={styles.navitems} key={item}>
							{item}
						</li>
					</Link>
				))}
				{isAdmin && (
					<li className={styles.navitems}>
						<Link href='/admin'>Dashboard</Link>
					</li>
				)}
				<li className={styles.navitems}>
					<ShoppingCartIcon />
				</li>
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
