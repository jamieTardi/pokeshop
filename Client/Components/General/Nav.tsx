import { useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import Image from 'next/Image';
import Logo from '../../Images/pokeLogo.png';
import { useSelector, useDispatch } from 'react-redux';
import { incrementByAmount } from '../../Redux/slices/counterSlice';
import { RootState } from '../../Redux/store';

const Nav = () => {
	const dispatch = useDispatch();
	// const count = useSelector((state: RootState) => state.counter.value);
	let navItems: string[] = [
		'Products',
		'New releases',
		'Coming Soon',
		'Members',
		'Customer Service',
	];
	// useEffect(() => {
	// 	dispatch(incrementByAmount(3));
	// }, []);
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
			</div>
		</nav>
	);
};

export default Nav;
