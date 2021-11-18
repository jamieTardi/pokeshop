import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { Typography, Grid, cardActionAreaClasses } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image';
import cardImage from '../../Images/trading-card-placeholder.png';
import styles from '../../styles/Products.module.scss';
import Loading from '../UIComponents/Loading';
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

interface props {
	open: boolean;
	setOpen: Function;
	cardItem: {
		image: Array<string>;
		SKU: string;
		description: string;
		category: string;
		price: number;
		stockAmount: number;
		title: string;
		expansion: string;
	};
}

export default function TransitionsModal({ open, setOpen, cardItem }: props) {
	const handleClose = () => setOpen(false);

	if (cardItem) {
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
							<Grid container spacing={3}>
								<div className={styles.modalContainer}>
									<Grid item xs={12} sm={6}>
										{cardItem.image.length !== 0 ? (
											cardItem.image.map((item, i) => (
												<Carousel>
													<div
														key={i}
														style={{
															background: `url(${item})`,
															height: 'auto',
															backgroundPosition: 'center',
															backgroundSize: 'cover',
														}}
													/>
												</Carousel>
											))
										) : (
											<Image src={cardImage} height={300} width={250} />
										)}
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography
											id='transition-modal-title'
											variant='h6'
											component='h2'>
											{cardItem.title}
										</Typography>
										<Grid container spacing={3}>
											<Grid item xs={12} sm={6}>
												<Typography
													id='transition-modal-description'
													sx={{ mt: 2 }}>
													Product code: {cardItem.SKU}
												</Typography>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Typography
													id='transition-modal-description'
													sx={{ mt: 2 }}>
													Product category: <span>{cardItem.category}</span>
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography
													gutterBottom
													component='p'
													sx={{
														display: 'flex',
														alignItems: 'center',
														color: '#989898',
													}}>
													<LocalOfferIcon />
													Price: £
													{cardItem.price - Math.floor(cardItem.price) === 0
														? cardItem.price.toString() + '.00'
														: cardItem.price.toString()}
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography
													id='transition-modal-description'
													sx={{ mt: 2 }}>
													Description:
												</Typography>
												<Typography
													id='transition-modal-description'
													sx={{ mt: 2, color: '#989898' }}>
													{cardItem.description}
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</div>
							</Grid>
						</Box>
					</Fade>
				</Modal>
			</div>
		);
	} else {
		return <Loading />;
	}
}
