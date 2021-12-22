import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setPriority } from 'os';
import {
	getAllProducts,
	getCategories,
	getExpansions,
	getProductByCat,
	getProductByExp,
} from '../../api';
import {
	Button,
	Container,
	Grid,
	Typography,
	Box,
	Stack,
	CardMedia,
	CardContent,
	CardActions,
	Card,
	Collapse,
} from '@mui/material';
import Loading from '../UIComponents/Loading';
import AdminModal from '../General/AdminModal';
import styles from '../../styles/Home.module.scss';
import FilterOptions from './FilterOptions';
import CustomPagination from '../UIComponents/CustomPagination';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import ProductModal from './ProductModal';
import { updateCart } from '../../Redux/slices/cartSlice';
import pokeShop from '../../Images/pokeShop.png';
import Image from 'next/image';

interface items {
	_id: string;
	image: string | Array<string>;
	description: string;
	title: string;
	key: string;
	expansion: string;
	category: string;
	price: number;
}

interface category {
	slug: string;
	category: string;
	image: string;
	expansion: string;
}

interface card {
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

interface item {
	_id: string;
	title: string;
	expansion: string;
	price: number;
}

const ShopItems = () => {
	const [products, setProducts] = useState<null | Array<items>>(null);
	const [expandedArr, setExpandedArr] = useState([]);
	const [currentPageTitle, setCurrentPageTitle] = useState<string>('');
	const [itemsPerPage, setItemsPerPage] = useState<number>(8);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentCat, setCurrentCat] = useState<string | null>(null);
	const [currentExp, setCurrentExp] = useState<string | null>(null);
	const [categories, setCategories] = useState<null | Array<category>>(null);
	const [expansions, setExpansions] = useState<null | Array<category>>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [cardItem, setCardItem] = useState<any | null>(null);
	const [currentCart, setCurrentCart] = useState<Array<typeof cardItem>>([]);
	const [isShowModal, setIsShowModal] = useState<boolean>(false);

	//General constants and variables
	const router = useRouter();
	const dispatch = useAppDispatch();
	const currentpage: any = router.query.param;
	const infoTxt: string = 'Item has been added to cart ✔️';

	//redux
	const page = useAppSelector((state: RootState) => state.currentPage.value);

	//logic for pagination
	const indexOfLastPage = currentPage * itemsPerPage;
	const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	const currentProducts = products?.slice(indexOfFirstPage, indexOfLastPage);

	//General functions

	const handleAddToCart = (item: card) => {
		// if(item.s)
		if (localStorage.getItem('poke-cart')) {
			let cart = JSON.parse(localStorage.getItem('poke-cart') || '{}');
			setCurrentCart([...cart, item]);
		} else {
			setCurrentCart([...currentCart, item]);
		}
		setIsShowModal(true);
		setTimeout(() => {
			setIsShowModal(false);
		}, 2000);
	};

	//useEffect section

	useEffect(() => {
		if (cardItem) {
			setOpen((prev) => !prev);
		}
	}, [cardItem]);

	useEffect(() => {
		if (currentCart.length !== 0) {
			localStorage.setItem('poke-cart', JSON.stringify(currentCart));
			dispatch({ type: updateCart, payload: currentCart });
		}
	}, [currentCart]);

	useEffect(() => {
		if (products) {
			let newArr: any = [];
			products.forEach((item, i) => {
				newArr.push({ id: i, expanded: false });
			});
			setExpandedArr(newArr);

			setTotalPages(Math.ceil(products.length / 8));
		}
	}, [products]);

	useEffect(() => {
		if (page === 'category') {
			getCategories(setCategories);
		} else {
			getExpansions(setExpansions);
		}
	}, [page]);

	useEffect(() => {
		if (currentpage !== 'all-products') {
			if (categories) {
				let filitered = categories.filter((item) => {
					return item.slug === currentpage;
				});
				setCurrentCat(filitered[0].category);
				setCurrentPageTitle(filitered[0].category);
			} else {
				if (expansions) {
					let filitered = expansions?.filter((item) => {
						return item.slug === currentpage;
					});

					setCurrentExp(filitered[0].expansion);
					setCurrentPageTitle(filitered[0].expansion);
				}
			}
		} else {
			getAllProducts(setProducts);
			setCurrentPageTitle('all products');
		}
	}, [categories, expansions]);

	useEffect(() => {
		if (currentCat) {
			getProductByCat(currentCat, setProducts);
		} else if (currentExp) {
			getProductByExp(currentExp, setProducts);
		}
	}, [currentCat, currentExp]);

	if (products) {
		return (
			<div>
				<div className={`${styles.container} ${styles.whiteText}`}>
					<main>
						{/* Hero unit */}
						<Box
							sx={{
								bgcolor: 'inherit',
								pt: 8,
								pb: 6,
							}}>
							<Container maxWidth='sm'>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<Image src={pokeShop} />
								</div>
								<Typography
									component='h4'
									variant='h4'
									align='center'
									color='text.secondary'
									gutterBottom>
									You are currently searching for {currentPageTitle}.
								</Typography>
							</Container>
							<FilterOptions />
						</Box>
						{/* End hero unit */}
						<Grid container spacing={4}>
							{currentProducts ? (
								currentProducts.map((card: any, i) => (
									<Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
										<Card
											sx={{
												height: '100%',
												display: 'flex',
												flexDirection: 'column',
												background: '#fff',
											}}>
											<CardMedia
												component='img'
												sx={{ height: '300px', objectFit: 'contain' }}
												image={
													card.image === '' ||
													!card.image ||
													card.image[0] === '' ||
													card.image.length === 0
														? 'https://dlair.net/houston-north/wp-content/uploads/2020/10/PokeVividVoltage_Banner-scaled.jpg'
														: card.image[0]
												}
												alt='random'
											/>
											<CardContent sx={{ flexGrow: 1 }}>
												<Typography
													variant='h5'
													component='h2'
													sx={{ maxHeight: '150px' }}>
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
														setCardItem(card);
													}}>
													View Details
												</Button>

												<Button
													size='small'
													color='success'
													disabled={card.stockAmount < 1}
													variant='contained'
													onClick={() => handleAddToCart(card)}>
													{card.stockAmount < 1
														? 'Out of Stock'
														: 'Add to basket'}
												</Button>
											</CardActions>
										</Card>
									</Grid>
								))
							) : (
								<Loading />
							)}
							<ProductModal open={open} setOpen={setOpen} cardItem={cardItem} />
							<AdminModal
								open={isShowModal}
								setOpen={setIsShowModal}
								infoText={infoTxt}
							/>
						</Grid>

						<CustomPagination
							setCurrentPage={setCurrentPage}
							totalPages={totalPages}
						/>
					</main>
				</div>
			</div>
		);
	} else if (cardItem === null) {
		return <Loading />;
	}
};

export default ShopItems;
