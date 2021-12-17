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
	const [loaded, setLoaded] = useState<boolean>(false);

	const handleSearchExpansions = () => {
		getExpansions(setCategories);
	};

	useEffect(() => {
		getCategories(setCategories);
	}, []);

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
								color='text.secondary'
								paragraph>
								Welcome to our poké shop! Thanks for taking the time to visit
								us, check out the categories and expansions and see what we have
								to offer!
							</Typography>
							<Stack
								sx={{ pt: 4 }}
								direction='row'
								spacing={2}
								justifyContent='center'>
								<Link href='/shop/all-products'>
									<Button variant='contained' color='primary'>
										View all products
									</Button>
								</Link>

								<Button variant='outlined' onClick={handleSearchExpansions}>
									View Expansions
								</Button>
							</Stack>
						</Container>
					</Box>

					{/* End hero unit */}
					<Grid container spacing={4}>
						{categories ? (
							categories.map((card, i) => (
								<Grid item key={card.category} xs={12} sm={6} md={3}>
									<Card
										sx={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
										}}>
										<Image
											src={
												loaded
													? card.image === ''
														? 'https://pokedecks.s3.us-west-2.amazonaws.com/eevee.png'
														: card.image
													: loadingGif
											}
											width={200}
											height={250}
											onLoad={() => setLoaded(true)}
											alt='Poke Image'
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography gutterBottom variant='h5' component='h2'>
												{card.category ? card.category : card.expansion}
											</Typography>
										</CardContent>
										<CardActions>
											<CardLinkBtn card={card} />
										</CardActions>
									</Card>
								</Grid>
							))
						) : (
							<Loading />
						)}
					</Grid>
				</main>
			</ThemeProvider>
		</div>
	);
}
