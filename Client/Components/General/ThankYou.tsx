import React from 'react';
import styles from '../../styles/Home.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createOrder } from '../../api/index';

interface Props {}

const Thankyou = (props: Props) => {
	const router = useRouter();

	const page = router.pathname;

	return (
		<div className={styles.thankYouContainer}>
			<div className={styles.wrapper1}>
				<div className={styles.wrapper2}>
					<h1>Thank you !</h1>
					{page === '/registration' ? (
						<>
							<p>
								Thank you for registering with us and we hope you enjoy shopping
								with us. Please click login to go to our login page!{' '}
							</p>
							<Link href='/signIn'>
								<button className={styles.goHome}>Sign In</button>
							</Link>
						</>
					) : (
						<>
							<p>
								Thank you for shopping with us and we hope you enjoy your
								purchases.{' '}
							</p>
							<p>you should receive a confirmation email soon </p>
							<Link href='/'>
								<button className={styles.goHome}>go home</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Thankyou;
