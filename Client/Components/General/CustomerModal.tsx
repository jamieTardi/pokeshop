import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { orders, item } from '../../Interfaces/Orders';
import MiniTable from './MiniTable';
import CloseIcon from '@mui/icons-material/Close';
import { updateShipping } from '../../api';
import { useRouter } from 'next/router';

interface props {
	open: boolean;
	setOpen: Function;
	currentCustomer: orders;
	setCurrentCustomer: Function;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function TransitionsModal({
	open,
	setOpen,
	currentCustomer,
	setCurrentCustomer,
}: props) {
	const router = useRouter();
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleShipping = () => {
		updateShipping(currentCustomer._id, currentCustomer, setCurrentCustomer);
	};

	const pathName = router.pathname;

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'end',
								cursor: 'pointer',
							}}>
							<div onClick={handleClose}>
								<CloseIcon />
							</div>
						</div>
						<Typography id='transition-modal-title' variant='h6' component='h2'>
							Customer Details
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							Name: {currentCustomer.customer.firstName}{' '}
							{currentCustomer.customer.lastName}
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							Address:{' '}
							{currentCustomer.customer.addressLineOne +
								', \n' +
								currentCustomer.customer.city +
								', \n' +
								currentCustomer.customer.county +
								', \n' +
								currentCustomer.customer.postCode +
								', \n' +
								currentCustomer.customer.country}
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							Email: {currentCustomer.customer.email}
						</Typography>
						<Typography id='transition-modal-description' sx={{ mt: 2 }}>
							Order
						</Typography>
						<MiniTable currentCustomer={currentCustomer.items} />
						{pathName !== '/myaccount' && (
							<>
								{currentCustomer.isShipped ? (
									<Typography id='transition-modal-description' sx={{ mt: 2 }}>
										This order has shipped!
									</Typography>
								) : (
									<Button
										variant='contained'
										color='primary'
										onClick={handleShipping}
										sx={{ marginTop: '5%' }}>
										Ship Items
									</Button>
								)}
							</>
						)}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
