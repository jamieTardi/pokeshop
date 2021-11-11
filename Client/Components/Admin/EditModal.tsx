import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddProduct from '../../Components/Admin/AddProduct';

const style = {
	modal: {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		overflow: 'scroll',
		width: '60%',
		height: '90%',
		bgcolor: 'white',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	},
	box: {
		overflow: 'hidden',
		bgcolor: 'white',
	},
};

interface props {
	setOpenEdit: Function;
	openEdit: boolean;
	currentProduct: object;
}

export default function EditModal({
	openEdit,
	setOpenEdit,
	currentProduct,
}: props) {
	const handleOpen = () => setOpenEdit(true);
	const handleClose = (event: any, reason: any) => {
		if (reason === 'backdropClick') {
			handleOpen();
		} else {
			setOpenEdit(false);
		}
	};

	return (
		<div>
			<Modal
				open={openEdit}
				sx={style.modal}
				onClose={(event, reason) => handleClose(event, reason)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style.box}>
					<AddProduct
						setOpenEdit={setOpenEdit}
						currentProduct={currentProduct}
					/>
				</Box>
			</Modal>
		</div>
	);
}
