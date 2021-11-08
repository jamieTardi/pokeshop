import React, { useState, useEffect } from 'react';
import {
	Paper,
	Box,
	Grid,
	TextField,
	Typography,
	Select,
	InputLabel,
	MenuItem,
	FormGroup,
	FormControl,
	Checkbox,
	FormControlLabel,
	Button,
	CircularProgress,
} from '@mui/material';
import styles from '../../styles/Admin.module.scss';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Forbidden from '../../Components/Admin/DashboardItems/Forbidden';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';
import Image from 'next/Image';
import { productForm } from '../../Interfaces/Admin';
import { useStyles } from '../../styles/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { createProduct, getCategories, getExpansions } from '../../api';
import { getImageURL } from '../../api';
import image from 'next/image';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';

const AddProducts = () => {
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState<any>(false);
	const [infoText, setInfoText] = useState<string | null>(null);
	const [expansions, setExpansions] = useState<Array<object> | null>(null);
	const [categories, setCategories] = useState<Array<object> | null>(null);
	const [file, setFile] = useState<any>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const [isUpload, setIsUpload] = useState<boolean>(false);
	const [imageText, setImageText] = useState<string>('');
	const [returnedImage, setReturnedImage] = useState<string | undefined>('');
	const [productDetails, setProductDetails] = useState<productForm>({
		title: '',
		price: 0,
		image: [],
		description: '',
		expansion: '',
		category: '',
		SKU: '',
		releaseDate: new Date(),
		stockAmount: 20,
		preOrder: false,
	});
	const isAdmin: boolean = useAppSelector(
		(state: RootState) => state.isAdmin.value,
	);
	const imageArr = productDetails.image;

	useEffect(() => {
		getImageURL(setImageURL);
	}, []);

	const handleSubmit = () => {
		setInfoText('');
		setIsLoading(true);
		createProduct(productDetails, setIsLoading, setInfoText);
	};

	const handleImageSend = () => {
		setIsUpload(true);
		setReturnedImage('');
		axios
			.put(imageURL, file)
			.then((res) => setReturnedImage(res.request.responseURL.split('?')[0]))
			.then(() => setIsUpload(false))
			.then(() => setImageText('Upload successful 🎉'))
			.then(() =>
				setTimeout(() => {
					setImageText('');
				}, 2000),
			)

			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (returnedImage) {
			setProductDetails({
				...productDetails,
				image: [...productDetails.image, returnedImage],
			});
		}
		getImageURL(setImageURL);
	}, [returnedImage]);
	console.log(returnedImage);
	useEffect(() => {
		getCategories(setCategories);
		getExpansions(setExpansions);
	}, []);

	if (isAdmin) {
		return (
			<div className={styles.productContainer}>
				<FormControl>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							'& > :not(style)': {
								m: 1,
								width: 600,
								minHeight: 800,
							},
							['@media (max-width:780px)']: {
								flexWrap: 'wrap',
								'& > :not(style)': {
									m: 1,
									width: 400,
									minHeight: 800,
								},
							},
						}}>
						<Paper elevation={3} className={classes.paper}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant='h5' component='h4'>
										Add a new product
									</Typography>
								</Grid>

								<Grid item xs={12}>
									<Carousel>
										{imageArr.map((item, i) => (
											<div
												style={{
													background: `url(${item})`,
													height: '300px',
													backgroundPosition: 'center',
													backgroundSize: 'cover',
												}}
												alt='uploaded Image'
											/>
										))}
									</Carousel>
								</Grid>

								<Grid item xs={12}>
									<input
										type='file'
										accept='image/*'
										onChange={(e) => {
											const file = e.target.files[0];
											setFile(file);
										}}
									/>
									<Button
										variant='contained'
										onClick={handleImageSend}
										disabled={isUpload}
										startIcon={isUpload && <CircularProgress size={20} />}>
										{isUpload ? 'Uploading...' : 'Upload Image'}
									</Button>
									<p>{imageText !== '' && imageText}</p>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										id='standard-basic'
										required
										fullWidth
										label='Title of product'
										value={productDetails.title}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												title: e.target.value,
											});
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id='standard-basic'
										// className={classes.input}
										required
										fullWidth
										label='Price (number)'
										value={productDetails.price}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												price: e.target.value,
											});
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<p>Category</p>
									<Select
										fullWidth
										value={productDetails.category}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												category: e.target.value,
											});
										}}>
										{categories &&
											categories.map((item) => (
												<MenuItem value={item.category} className='text-white'>
													{item.category}
												</MenuItem>
											))}
									</Select>
								</Grid>

								<Grid item xs={12} sm={6}>
									<p>Expansion</p>
									<Select
										fullWidth
										value={productDetails.expansion}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												expansion: e.target.value,
											});
										}}>
										{expansions &&
											expansions.map((item) => (
												<MenuItem value={item.expansion} className='text-white'>
													{item.expansion}
												</MenuItem>
											))}
									</Select>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										id='standard-basic'
										// className={classes.input}
										required
										fullWidth
										label='SKU'
										value={productDetails.SKU}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												SKU: e.target.value,
											});
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<DatePicker
											label='Release Date'
											value={productDetails.releaseDate}
											onChange={(newValue) => {
												setProductDetails({
													...productDetails,
													releaseDate: newValue,
												});
											}}
											renderInput={(params) => <TextField {...params} />}
										/>
									</LocalizationProvider>
								</Grid>
								<Grid item xs={12} sm={6}>
									<p>Amount of stock</p>
									<Select
										fullWidth
										value={productDetails.stockAmount}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												stockAmount: e.target.value,
											});
										}}>
										{Array.from(Array(21), (e, i) => (
											<MenuItem value={i} className='text-white'>
												{i}
											</MenuItem>
										))}
									</Select>
								</Grid>
								<Grid item xs={12} sm={6}>
									<FormGroup>
										<FormControlLabel
											control={
												<Checkbox
													required
													value={productDetails.preOrder}
													onChange={(e) => {
														setProductDetails({
															...productDetails,
															preOrder: e.target.checked,
														});
													}}
												/>
											}
											label='Preorder'
										/>
									</FormGroup>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id='standard-basic'
										// className={classes.input}
										multiline
										rows={12}
										required
										fullWidth
										label='Description'
										value={productDetails.description}
										onChange={(e) => {
											setProductDetails({
												...productDetails,
												description: e.target.value,
											});
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									{infoText && <p>{infoText}</p>}
								</Grid>
								<Grid item xs={6}>
									<Link href='/admin'>
										<Button variant='contained' color='warning'>
											Back
										</Button>
									</Link>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant='contained'
										color='primary'
										startIcon={
											isLoading ? (
												<CircularProgress size={20} />
											) : (
												<AddCircleIcon />
											)
										}
										disabled={isLoading}
										onClick={handleSubmit}>
										Create Product
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</FormControl>
			</div>
		);
	} else {
		return <Forbidden />;
	}
};

export default AddProducts;
