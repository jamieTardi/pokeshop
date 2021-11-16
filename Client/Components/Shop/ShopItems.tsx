import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setPriority } from 'os';
import {
	getAllProducts,
	getCategories,
	getExpansions,
	getProductByCat,
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
import Link from 'next/link';
import styles from '../../styles/Home.module.scss';
import FilterOptions from './FilterOptions';
import CustomPagination from '../UIComponents/CustomPagination';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface Props {}

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
}

const ShopItems = (props: Props) => {
	const router = useRouter();
	const currentpage: any = router.query.param;
	const [products, setProducts] = useState<null | Array<items>>(null);
	const [expanded, setExpanded] = useState<boolean>(false);
	const [expandedArr, setExpandedArr] = useState([]);
	const [currentPageTitle, setCurrentPageTitle] = useState<string>('');
	const [itemsPerPage, setItemsPerPage] = useState<number>(8);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentCat, setCurrentCat] = useState<string | null>(null);
	const [categories, setCategories] = useState<null | Array<category>>(null);

	//logic for pagination
	const indexOfLastPage = currentPage * itemsPerPage;
	const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	const currentProducts = products?.slice(indexOfFirstPage, indexOfLastPage);

	const handleExpandClick = (i: any) => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		if (products) {
			let newArr: any = [];
			products.forEach((item, i) => {
				newArr.push({ id: i, expanded: false });
			});
			setExpandedArr(newArr);

			setTotalPages(Math.ceil(products.length / 10));
		}
	}, [products]);

	useEffect(() => {
		getCategories(setCategories);
	}, []);

	useEffect(() => {
		if (currentpage !== 'all-products') {
			if (categories) {
				let filitered = categories.filter((item) => {
					return item.slug === currentpage;
				});
				setCurrentCat(filitered[0].category);
				setCurrentPageTitle(filitered[0].category);
			}
		} else {
			getAllProducts(setProducts);
			setCurrentPageTitle('all products');
		}
	}, [categories]);

	useEffect(() => {
		if (currentCat) {
			getProductByCat(currentCat, setProducts);
		}
	}, [currentCat]);

	return (
		<div>
			<div className={`${styles.backgroundcustom} ${styles.whiteText}`}></div>

			<main>
				{/* Hero unit */}
				<Box
					sx={{
						bgcolor: 'inherit',
						pt: 8,
						pb: 6,
					}}>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='white'
							gutterBottom>
							Our Poké Shop
						</Typography>
						<Typography
							component='h4'
							variant='h4'
							align='center'
							color='white'
							gutterBottom>
							You are currently searching for {currentPageTitle}.
						</Typography>
					</Container>
					<FilterOptions />
				</Box>
				{/* End hero unit */}
				<Grid container spacing={4}>
					{currentProducts ? (
						currentProducts.map((card, i) => (
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
										sx={{ height: '250px' }}
										image={
											card.image === '' ||
											!card.image ||
											card.image[0] === '' ||
											card.image.length === 0
												? 'https://dlair.net/houston-north/wp-content/uploads/2020/10/PokeVividVoltage_Banner-scaled.jpg'
												: card.image
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
											Price: £
											{card.price - Math.floor(card.price) === 0
												? card.price.toString() + '.00'
												: card.price.toString()}
										</Typography>
									</CardActions>
									<CardActions>
										<Typography
											gutterBottom
											component='p'
											sx={{ color: '#989898' }}>
											{card.description.substring(0, 100)}...
										</Typography>
									</CardActions>

									<CardActions>
										<Button size='small' variant='contained'>
											View Details
										</Button>

										<Button size='small' color='success' variant='contained'>
											Add to basket
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))
					) : (
						<Loading />
					)}
				</Grid>
				<CustomPagination
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</main>
		</div>
	);
};

export default ShopItems;
