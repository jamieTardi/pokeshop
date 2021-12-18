import React from 'react';
import Image from 'next/image';
import emptyPic from '../../Images/emptyCart.png';
import cart from '../../Images/cart.png';
import styles from '../../styles/Cart.module.scss';
import { Button } from '@mui/material';
import Link from 'next/link';

interface Props {}

const CartNoItems = (props: Props) => {
	return (
		<div>
			<div className={styles.center}>
				<Image src={cart} alt='cart' />
				<Image src={emptyPic} alt='empty cart' width={500} height={400} />
				<h3>
					It appears your cart is empty! Click the button to go to our shop.
				</h3>
				<Link href='/shop'>
					<Button variant='contained' color='primary'>
						Back to Shop
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default CartNoItems;
