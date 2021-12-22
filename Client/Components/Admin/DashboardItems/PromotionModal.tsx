import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Grid, TextField } from '@mui/material';
import { promotion } from '../../../pages/admin/promotional';
import { createPromotion, getPromotions } from '../../../api';

const style = {
	position: 'absolute' as 'absolute',
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
	newPromotion: promotion;
	setNewPromotion: Function;
}

export default function PromotionModal({
	open,
	setOpen,
	newPromotion,
	setNewPromotion,
}: props) {
	const handleClose = () => setOpen(false);

	const handleSubmit = () => {
		createPromotion(newPromotion);

		handleClose();
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Add a new promotion
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name='title'
								required
								fullWidth
								id='firstName'
								label='Promotion Title'
								autoFocus
								onChange={(e) =>
									setNewPromotion({ ...newPromotion, title: e.target.value })
								}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name='discount'
								required
								type='number'
								fullWidth
								id='firstName'
								label='Promotion Discount (number)'
								onChange={(e) =>
									setNewPromotion({
										...newPromotion,
										discount: Number(e.target.value),
									})
								}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button
								variant='contained'
								color='success'
								onClick={handleSubmit}>
								Add
							</Button>
						</Grid>
						<Grid item xs={12} md={6}>
							<Button variant='contained' color='error' onClick={handleClose}>
								close
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
}
