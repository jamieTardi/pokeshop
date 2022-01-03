import { Avatar } from '@mui/material';
import {
	FacebookOutlined,
	YouTube,
	Twitter,
	Instagram,
} from '@mui/icons-material';
import styles from '../../styles/Home.module.scss';
import visa from '../../Images/Visa.png';
import MasterCard from '../../Images/MasterCard.png';
import AmericanExpress from '../../Images/AmericanExpress.png';
import Image from 'next/image';
import Link from 'next/link';

interface Props {}

const date = new Date();

const logos = [
	<a href='' className={styles.footerSVG}>
		<FacebookOutlined key={1} />
	</a>,
	<a href='' className={styles.footerSVG}>
		<YouTube key={2} />
	</a>,
	<a href='' className={styles.footerSVG}>
		<Twitter key={3} />
	</a>,
	<a
		href='https://www.instagram.com/poke.decks.uk/'
		className={styles.footerSVG}>
		<Instagram key={4} />
	</a>,
];

const payments: Array<any> = [
	<Image src={visa} alt='card' width={50} height={20} />,
	<Image src={MasterCard} alt='card' width={50} height={30} />,
	<Image src={AmericanExpress} alt='card' width={50} height={30} />,
];

const Footer = (props: Props) => {
	return (
		<div style={{ position: 'relative', width: '90%' }}>
			<div className={styles.footerGrid}>
				<div className={styles.footerGridItem1}>
					<h4>Our Store</h4>
					<p>GirlCode trading as Poke-Decks</p>
					<p>
						5 fountain road,
						<br /> Harborne, <br /> Birmingham, <br /> B178NP
					</p>
					<p>&#169;{date.getFullYear()}</p>
				</div>

				<div className={styles.footerGridItem2}>
					<h5>Help and Information</h5>
					<ul>
						<li>
							<a
								href='/Cookie-Policy-Poke-Decks.pdf'
								rel='noopener noreferrer'
								download>
								Cookie Policy(Link to PDF)
							</a>
						</li>
						<li>
							<a href='/Privacy_policy.pdf' rel='noopener noreferrer' download>
								Privacy Policy(Link to PDF)
							</a>
						</li>
					</ul>
				</div>
				<div className={styles.footerGridItem3}>
					<h5>Your Order</h5>
					<ul>
						<li>
							<a
								href='/Terms_and_Conditions.pdf'
								rel='noopener noreferrer'
								download>
								Terms and Conditions(Link to PDF)
							</a>
						</li>

						<li>
							<a href='/Returns_policy.pdf' rel='noopener noreferrer' download>
								Returns Policy(Link to PDF)
							</a>
						</li>
					</ul>
				</div>
				<div className={styles.footerGridItem4}>
					<h5>Follow Us</h5>
					<div className={styles.footerGridItems}>
						{logos.map((logo, i) => (
							<Avatar key={i} sx={{ bgcolor: '#E84875', margin: '0% 2%' }}>
								{logo}
							</Avatar>
						))}
					</div>
				</div>
				<div className={styles.footerGridItem5}>
					<h5>We accept</h5>
					<div className={styles.footerGridItems}>
						{payments.map((logo, i) => (
							<div className={styles.payments}>{logo}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
