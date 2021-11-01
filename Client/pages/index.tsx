import type { NextPage } from 'next';
import Head from 'next/head';
import Nav from '../Components/Nav';
import styles from '../styles/Home.module.scss';
import { GlassCardHero } from '../Components/UIComponents/GlassCardHero';
import Image from 'next/Image';
import HeroPic from '../Images/hero.png';
import Eevee from '../Images/eevee.png';
import { HomeSectionTwo } from '../Components/Sections/HomeSectionTwo';
import About from '../Components/Sections/About';

const Home: NextPage = () => {
	return (
		<>
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
				<GlassCardHero />
				<div className={styles.heroContainer}>
					<Image src={HeroPic} height={350} width={340} />
				</div>
				<div>
					<Image src={Eevee} height={250} width={270} />
				</div>
				<div>
					<HomeSectionTwo />
				</div>
				<div>
					<About />
				</div>
			</div>
		</>
	);
};

export default Home;
