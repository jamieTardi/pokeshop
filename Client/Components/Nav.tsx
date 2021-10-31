import { Button } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

const Nav = () => {
	let navItems: string[] = [
		'Products',
		'New releases',
		'Coming Soon',
		'Members',
		'Customer Service',
	];

	return (
		<nav className={styles.nav}>
			<div>Logo</div>
			<ul className={styles.listContainer}>
				{navItems.map((item) => (
					<li className={styles.navitems}>{item}</li>
				))}
			</ul>
			<div>
				<Button variant='text' sx={{ color: 'white' }}>
					Login
				</Button>
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
