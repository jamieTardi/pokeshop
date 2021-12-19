import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { item } from '../../Interfaces/Item';
import Divider from '@mui/material/Divider';
import { getCartTotal } from '../../api';
import Link from 'next/link';

interface prices {
	cartTotal: number;
	shipping: number;
	finalTotal: number;
}

export default function CardTotal({ items }: any) {
	const [price, setPrice] = useState<prices>({
		cartTotal: 0,
		shipping: 4,
		finalTotal: 0,
	});

	useEffect(() => {
		getCartTotal(items, setPrice);
	}, [items]);

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 20 }} color='text.secondary' gutterBottom>
					Total
				</Typography>
				<Divider />
				<Typography
					sx={{ fontSize: 16, marginTop: '5%' }}
					color='text.primary'
					gutterBottom
					component='div'>
					Total items in cart: {items.length}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color='text.secondary'>
					Cart Total: £{price.cartTotal.toFixed(2).toString()}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color='text.secondary'>
					Shipping: £{price.shipping.toFixed(2).toString()}
				</Typography>
				<Typography
					sx={{ fontSize: 16 }}
					color='text.primary'
					gutterBottom
					component='div'>
					Cart grand total: £{price.finalTotal.toFixed(2).toString()}
				</Typography>

				<Typography variant='body2'>
					Items will be expected to arrive in 5-7 working days.
				</Typography>
			</CardContent>

			<Divider />
			<CardActions>
				<Link href='/checkout'>
					<Button variant='contained' color='primary'>
						Continue to Payment
					</Button>
				</Link>
			</CardActions>
		</Card>
	);
}
