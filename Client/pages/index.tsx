import type { NextPage } from 'next';
import Head from 'next/head';
import charmander from '../Images/charmander.png';
import Nav from '../Components/Nav';
import styles from '../styles/Home.module.scss';
import Image from 'next/Image';
import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Home: NextPage = () => {
	return (
		<div className={`${styles.container} ${styles.whiteText}`}>
			<div className={`${styles.backgroundcustom} ${styles.whiteText}`}></div>
			<Head>
				<title>Poke Cards | Boutique cards</title>
				<meta name='description' content='Pokemon card boutique store' />
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
			</Head>
			<div className={styles.canvas} />
			<div>
				<Nav />
				<h1>Home page</h1>
			</div>
			<div className={styles.glassCard}>
				<h1 className={styles.blackText}>Pokémon cards</h1>
				<p className={styles.largePara}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ipsa!
					Est quam minima voluptatum rerum quidem, vero, amet quae hic atque ex
					nihil animi! Saepe incidunt doloribus suscipit minus aliquam.
				</p>
				<Button
					variant='contained'
					sx={{ borderRadius: 25 }}
					endIcon={<ShoppingBagIcon />}>
					Shop now
				</Button>
				<div className={styles.cardImage}>
					<Image src={charmander} height={150} width={140} />
				</div>
			</div>
		</div>
	);
};

export default Home;
