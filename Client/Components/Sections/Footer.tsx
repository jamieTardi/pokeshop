import { Avatar } from '@mui/material';
import {
	FacebookOutlined,
	YouTube,
	Twitter,
	Instagram,
} from '@mui/icons-material';
import styles from '../../styles/Home.module.scss';

interface Props {}

const date = new Date();

const logos = [<FacebookOutlined />, <YouTube />, <Twitter />, <Instagram />];

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
					<li>Privacy Policy</li>
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
