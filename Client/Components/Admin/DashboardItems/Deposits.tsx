import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getAllOrders, getTotals } from '../../../api';
import Title from './Title';

interface total {
	total: number;
}

function preventDefault(event: React.MouseEvent) {
	event.preventDefault();
}

export default function Deposits() {
	const [monthTotal, setMonthTotal] = useState<total | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	let current = new Date();

	useEffect(() => {
		getTotals(setMonthTotal, setIsLoading);
	}, []);

	if (monthTotal) {
		return (
			<>
				<Title>Total This Month</Title>
				<Typography component='p' variant='h4'>
					£{monthTotal.total.toFixed(2).toString()}
				</Typography>
				<Typography color='text.secondary' sx={{ flex: 1 }}>
					{new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(current)}
				</Typography>
				<div>
					<Link href='https://stripe.com/en-gb'>Stripe Dashboard</Link>
				</div>
			</>
		);
	} else {
		return <CircularProgress />;
	}
}
