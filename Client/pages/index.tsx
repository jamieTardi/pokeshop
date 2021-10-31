import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Nav from '../Components/Nav';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Poke Cards | Boutique cards</title>
				<meta name='description' content='Pokemon card boutique store' />
				<link rel='icon' href='/favicon.ico' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
				/>
			</Head>
			<div>
				<Nav />
				<h1>Home page</h1>
			</div>
		</div>
	);
};

export default Home;
