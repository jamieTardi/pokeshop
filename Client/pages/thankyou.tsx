import React from 'react';
import styles from '../styles/Home.module.scss';
import Link from 'next/link';

interface Props {}

const Thankyou = (props: Props) => {
	return (
		<div className={styles.thankYouContainer}>
			<div className={styles.wrapper1}>
				<div className={styles.wrapper2}>
					<h1>Thank you !</h1>
					<p>
						Thank you for shopping with us and we hope you enjoy your purchases.{' '}
					</p>
					<p>you should receive a confirmation email soon </p>
					<Link href='/'>
						<button className={styles.goHome}>go home</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Thankyou;
