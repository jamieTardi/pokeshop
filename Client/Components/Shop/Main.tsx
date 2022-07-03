import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container, ButtonGroup } from '@mui/material';
import Link from 'next/link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loadingGif from '../../Images/pokeBallLoading.gif';
import { useEffect, useState } from 'react';
import { getAllProducts, getCategories, getExpansions } from '../../api';
import Loading from '../UIComponents/Loading';
import CardLinkBtn from './CardLinkBtn';
import styles from '../../styles/Home.module.scss';
import pokeShop from '../../Images/pokeShop.png';
import Image from 'next/image';
import Search from '../General/Search';
import ShopItem from '../General/ShopItem';

interface category {
	category: string;
	image: string;
	key: string;
	slug: string;
	expansion: string;
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#673ab7',
		},
		secondary: {
			main: '#8561c5',
		},
	},
});

export default function Album() {
	const [categories, setCategories] = useState<null | Array<category>>(null);
	const [products, setProducts] = useState(null);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		getAllProducts(setProducts);
		getCategories(setCategories);
	}, [getAllProducts, getCategories]);

	if (!categories) {
		return <Loading />;
	}

	console.log({products})
	console.log({searchResults})
	return (
		<div className={`${styles.container} ${styles.whiteText}`}>
			<ThemeProvider theme={theme}>
				<CssBaseline />

				<main style={{ marginBottom: '5%' }}>
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
								variant='h5'
								align='center'
								paragraph
								style={{ color: '#425466' }}>
								Welcome to our poké shop! Thanks for taking the time to visit
								us, check out the categories and expansions and see what we have
								to offer!
							</Typography>
							<Stack
								sx={{ pt: 4 }}
								direction='column-reverse'
								spacing={2}
								justifyContent='center'>
								{products && (
									<Search
										products={products}
										setSearchResults={setSearchResults}
									/>
								)}
								<Link href='/shop/all-products'>
									<Button variant='contained' color='primary'>
										View all products
									</Button>
								</Link>
							</Stack>
						</Container>
					</Box>

					{/* End hero unit */}
					<Grid container spacing={4}>
						{searchResults.length > 0 && products ? (
							<ShopItem products={searchResults} />
						) : (
							categories.map((card, i) => (
								<Grid item key={card.category} xs={12} sm={6} md={3}>
									<Card
										sx={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
										}}>
										<CardMedia
											component='img'
											sx={{ height: '300px', objectFit: 'contain' }}
											image={
												card.image === ''
													? 'https://pokedecks.s3.us-west-2.amazonaws.com/eevee.png'
													: card.image
											}
											alt=''
										/>
										<CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
											<Typography gutterBottom variant='h5' component='h2'>
												{card.category ? card.category : ''}
											</Typography>
										</CardContent>
										<CardActions>
											<CardLinkBtn card={card} />
										</CardActions>
									</Card>
								</Grid>
							))
						)}
					</Grid>
				</main>
			</ThemeProvider>
		</div>
	);
}
