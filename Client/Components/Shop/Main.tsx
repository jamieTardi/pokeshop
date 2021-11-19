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
import Footer from '../Sections/Footer';
import { useEffect, useState } from 'react';
import { getAllProducts, getCategories, getExpansions } from '../../api';
import Loading from '../UIComponents/Loading';
import CardLinkBtn from './CardLinkBtn';
import { GlassCardHero } from '../UIComponents/GlassCardHero';

interface category {
	category: string;
	image: Array<string>;
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

	const handleSearchExpansions = () => {
		getExpansions(setCategories);
	};

	useEffect(() => {
		getCategories(setCategories);
	}, []);

	return (
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
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='text.primary'
							gutterBottom>
							Our Selection
						</Typography>
						<Typography
							variant='h5'
							align='center'
							color='text.secondary'
							paragraph>
							Welcome to our poké shop! Thanks for taking the time to visit us,
							check out the categories and expansions and see what we have to
							offer!
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
								{console.log(card.image[0])}
								<Card
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
									}}>
									<CardMedia
										component='img'
										sx={{ height: '250px' }}
										image={
											card.image === [] || !card.image
												? 'https://dlair.net/houston-north/wp-content/uploads/2020/10/PokeVividVoltage_Banner-scaled.jpg'
												: card.image[0]
										}
										alt='random'
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
	);
}
