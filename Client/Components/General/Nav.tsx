import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Tooltip, ClickAwayListener, makeStyles } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import Image from 'next/image';
import { Badge } from '@mui/material';
import Logo from '../../Images/pokeDecksNew.png';
import { logoutUser } from '../../Redux/slices/userSlice';
import { RootState } from '../../Redux/store';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { isNewAdmin } from '../../Redux/slices/isAdminSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Nav = ({ isOpen, setIsOpen }: any) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const currentUser: any = useAppSelector(
		(state: RootState) => state.user.value,
	);
	const cart: any = useAppSelector((state: RootState) => state.cart.value);
	const isUser = useAppSelector((state: RootState) => state.user.value);
	const isAdmin = useAppSelector((state: RootState) => state.isAdmin.value);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	let navItems: string[] = ['News', 'shop', 'Contact'];

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
		<div style={{ position: 'relative' }}>
			<nav className={styles.nav}>
				<div style={{ cursor: 'pointer' }}>
					<Link href='/'>
						<Image src={Logo} alt='logo' height={40} width={140} />
					</Link>
				</div>
				<ul className={styles.listContainer}>
					{navItems.map((item) => (
						<Link
							key={`/${item}`}
							href={`/${item.toLowerCase().replace(/\s+/g, '')}`}>
							<li className={styles.navitems} key={item}>
								{item}
							</li>
						</Link>
					))}

					{isUser && (
						<li className={styles.navitems}>
							<Link href='/myaccount'>My Account</Link>
						</li>
					)}
					<Link href='/cart'>
						<li className={styles.navitems}>
							<Badge badgeContent={cart && cart.length} color='primary'>
								<ShoppingCartIcon />
							</Badge>
						</li>
					</Link>
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
								<Tooltip
									title={
										<span style={{ fontSize: '1.1rem' }}>
											Register with us for faster checkout and exclusive
											discounts. It is free, fast and secure! 📣
										</span>
									}
									open={isOpen}
									componentsProps={{
										tooltip: {
											sx: {
												color: '#425466',
												backgroundColor: 'white',
												fontSize: '1.2em',
											},
										},
										arrow: {
											sx: {
												color: 'white',
											},
										},
									}}
									arrow>
									<Button variant='text' sx={{ color: 'white' }}>
										Register
									</Button>
								</Tooltip>
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
		</div>
	);
};

export default Nav;
