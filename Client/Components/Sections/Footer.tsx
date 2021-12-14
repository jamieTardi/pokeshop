import { Avatar } from '@mui/material';
import {
	FacebookOutlined,
	YouTube,
	Twitter,
	Instagram,
} from '@mui/icons-material';
import styles from '../../styles/Home.module.scss';
import Link from 'next/link';

interface Props {}

const date = new Date();

const logos = [
	<a href=''>
		<FacebookOutlined key={1} />
	</a>,
	<YouTube key={2} />,
	<Twitter key={3} />,
	<a href='https://www.instagram.com/poke.decks.uk/'>
		<Instagram key={4} />
	</a>,
];

const Footer = (props: Props) => {
	return (
		<div className={styles.footerGrid}>
			<div className={styles.footerGridItem1}>
				<h4>Poke-decks</h4>
				<p>&#169;{date.getFullYear()}</p>
			</div>

			<div className={styles.footerGridItem2}>
				<h5>Poke-decks</h5>
				<ul>
					<li>About Us</li>
					<li>Contact Us</li>
				</ul>
			</div>
			<div className={styles.footerGridItem3}>
				<h5>Further Information</h5>
				<ul>
					<li>
						<a href='/Privacy_policy.pdf' rel='noopener noreferrer' download>
							Privacy Policy
						</a>
					</li>
					<li>Terms and Conditions</li>
				</ul>
			</div>
			<div className={styles.footerGridItem4}>
				<h5>Follow Us</h5>
				<div className={styles.footerGridItems}>
					{logos.map((logo, i) => (
						<Avatar key={i} sx={{ bgcolor: '#E84875' }}>
							{logo}
						</Avatar>
					))}
				</div>
			</div>
		</div>
	);
};

export default Footer;
