import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from '../../styles/Stripe.module.scss';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import pokeBall from '../../Images/pokeBall.png';
import { CircularProgress } from '@mui/material';

const style: any = {
	position: 'absolute' as 'absolute',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

interface props {
	open: boolean;
	setOpen: Function;
}

export default function ProcessingPayment({ open, setOpen }: props) {
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<CircularProgress color='primary' />
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							Your payment is being processed please do not refresh the page...
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							You will be redirected shortly!
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
