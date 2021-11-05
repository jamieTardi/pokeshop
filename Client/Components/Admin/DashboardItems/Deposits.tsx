import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event: React.MouseEvent) {
	event.preventDefault();
}

export default function Deposits() {
	return (
		<React.Fragment>
			<Title>Total This Month</Title>
			<Typography component='p' variant='h4'>
				£222.32
			</Typography>
			<Typography color='text.secondary' sx={{ flex: 1 }}>
				November
			</Typography>
			<div>
				<Link color='primary' href='#' onClick={preventDefault}>
					Stripe Dashboard
				</Link>
			</div>
		</React.Fragment>
	);
}
