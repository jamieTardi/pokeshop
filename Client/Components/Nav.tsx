import { Button } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';

interface Props {}

const Nav = (props: Props) => {
	return (
		<nav className={styles.nav}>
			<div>Logo</div>
			<div>
				<Button>Login</Button>
				<Link href='/register'>
					<Button>Register</Button>
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
