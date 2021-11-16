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
import { getAllProducts, getCategories } from '../../api';
import Loading from '../UIComponents/Loading';
import CardLinkBtn from './CardLinkBtn';

interface category {
	category: string;
	image: string;
	key: string;
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
							<Link href='/shop/expansions'>
								<Button variant='outlined'>View Expansions</Button>
							</Link>
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
									<CardMedia
										component='img'
										sx={{ height: '250px' }}
										image={
											card.image === '' || !card.image
												? 'https://dlair.net/houston-north/wp-content/uploads/2020/10/PokeVividVoltage_Banner-scaled.jpg'
												: card.image
										}
										alt='random'
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant='h5' component='h2'>
											{card.category}
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
