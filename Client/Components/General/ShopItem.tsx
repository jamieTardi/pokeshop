import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { item } from '../../Interfaces/Item';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Loading from '../UIComponents/Loading';
import ProductModal from '../Shop/ProductModal';
import { v4 as uuidv4 } from 'uuid';

type TProps = {
	products: item[];
};

const ShopItem = ({ products }: TProps) => {
	const [card, setCard] = useState(null);
	const [currentCart, setCurrentCart] = useState<item[] | []>([]);
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [cardItem, setCardItem] = useState<item | null>(null);
	const [open, setOpen] = useState(false);

	const handleOpenModal = () => {
		setCardItem(card);
		setOpen(true);
	};

	const handleAddToCart = (item: item) => {
		let newItem = { ...item, localID: uuidv4() };

		if (localStorage.getItem('poke-cart')) {
			let cart = JSON.parse(localStorage.getItem('poke-cart') || '{}');
			setCurrentCart([...cart, newItem]);
		} else {
			setCurrentCart([...currentCart, newItem]);
		}
		setIsShowModal(true);
		setTimeout(() => {
			setIsShowModal(false);
		}, 2000);
	};
	return (
		<div>
			<Grid container spacing={4}>
				{products ? (
					products.map((card: any, i) => (
						<Grid item key={card._id} xs={12} sm={6} lg={4} xl={3}>
							<Card
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									background: '#fff',
								}}>
								<CardMedia
									component='img'
									sx={{ height: '350px', objectFit: 'contain' }}
									image={
										card.image === '' ||
										!card.image ||
										card.image[0] === '' ||
										card.image.length === 0
											? 'https://dlair.net/houston-north/wp-content/uploads/2020/10/PokeVividVoltage_Banner-scaled.jpg'
											: card.image[0]
									}
									alt=''
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										variant='h5'
										component='h2'
										sx={{ maxHeight: '200px' }}>
										{card.title ? card.title : card.expansion}
									</Typography>
								</CardContent>
								<CardActions>
									<Typography
										gutterBottom
										component='p'
										sx={{
											display: 'flex',
											alignItems: 'center',
											color: '#989898',
										}}>
										<LocalOfferIcon />
										Price: £{card.price.toFixed(2).toString()}
									</Typography>
								</CardActions>

								<CardActions>
									<Button
										size='small'
										variant='contained'
										onClick={() => {
											handleOpenModal();
										}}>
										View Details
									</Button>

									<Button
										size='small'
										color='success'
										disabled={card.stockAmount < 1}
										variant='contained'
										onClick={() => handleAddToCart(card)}>
										{card.stockAmount < 1 ? 'Out of Stock' : 'Add to basket'}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))
				) : (
					<Loading />
				)}
				<ProductModal open={open} setOpen={setOpen} cardItem={cardItem} />
			</Grid>
		</div>
	);
};

export default ShopItem;
