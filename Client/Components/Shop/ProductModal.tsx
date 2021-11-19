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
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';
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
	['@media (max-width:900px)']: {
		height: '80%',
		width: '90%',
		overflow: 'scroll',
	},
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
							<Grid
								item
								xs={12}
								sx={{
									display: 'flex',
									justifyContent: 'end',
									alignItems: 'top',
									cursor: 'pointer',
								}}>
								<div onClick={handleClose}>
									<CloseIcon />
								</div>
							</Grid>
							<div className={styles.modalContainer}>
								{cardItem.image.length !== 0 ? (
									<>
										<Grid item xs={12} sm={6}>
											<Carousel autoPlay={false}>
												{cardItem.image.map((item, i) => (
													<div
														key={i}
														style={{
															background: `url(${item})`,
															height: '500px',
															width: '90%',
															marginLeft: '5%',
															backgroundPosition: 'center',
															backgroundSize: 'cover',
														}}
													/>
												))}
											</Carousel>
										</Grid>
									</>
								) : (
									<Grid
										item
										xs={12}
										sm={6}
										sx={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Image src={cardImage} height={300} width={250} />
									</Grid>
								)}

								<Grid item xs={12} sm={6}>
									<Typography
										id='transition-modal-title'
										variant='h6'
										component='h2'>
										{cardItem.title}
									</Typography>
									<div className={styles.divider} />

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
												Product category:{' '}
												<span style={{ color: '#989898' }}>
													{cardItem.category}
												</span>
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography
												gutterBottom
												component='p'
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}>
												<LocalOfferIcon />
												Price:
												<span style={{ color: '#989898', marginLeft: '2%' }}>
													£
													{cardItem.price - Math.floor(cardItem.price) === 0
														? cardItem.price.toString() + '.00'
														: cardItem.price.toString()}
												</span>
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography
												gutterBottom
												component='p'
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}>
												{cardItem.stockAmount !== 0 ? (
													<span
														style={{
															color: '#0fbe1d',
															display: 'flex',
															alignItems: 'center',
														}}>
														<CheckIcon />
														Available
													</span>
												) : (
													<span
														style={{
															color: '#da0e0e',
															display: 'flex',
															alignItems: 'center',
														}}>
														<NotInterestedIcon />
														Unavailable
													</span>
												)}
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<div className={styles.divider} />
										</Grid>
										<Grid item xs={12}>
											<Typography
												id='transition-modal-description'
												sx={{ mt: 2 }}>
												Description:{' '}
												<span style={{ color: '#989898' }}>
													{cardItem.description}
												</span>
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<div className={styles.divider} />
										</Grid>

										<Grid item xs={12}>
											<Button
												variant='contained'
												color='success'
												disabled={cardItem.stockAmount === 0}
												startIcon={<ShoppingBagIcon />}>
												{cardItem.stockAmount === 0
													? 'Unavailable'
													: 'Add to cart'}
											</Button>
										</Grid>
										<Grid item xs={12}>
											<Typography
												id='transition-modal-description'
												sx={{ mt: 2 }}>
												Shipping:{' '}
												<span style={{ color: '#989898' }}>
													Items are usually shipped in 2-3 working days, if the
													item is out of stock contact us for details.
												</span>
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</div>
						</Grid>
					</Box>
				</Fade>
			</Modal>
		);
	} else {
		return <Loading />;
	}
}
