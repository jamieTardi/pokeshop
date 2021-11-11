import React, { useState, useEffect } from 'react';
import {
	Grid,
	TextField,
	Typography,
	Select,
	MenuItem,
	FormGroup,
	Checkbox,
	FormControlLabel,
	Button,
	CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Link from 'next/link';
import { productForm, productSelected } from '../../Interfaces/Admin';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {
	createProduct,
	getCategories,
	getExpansions,
	updateProduct,
} from '../../api';
import { getImageURL, getAllProducts } from '../../api';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';

interface Props {
	setOpenEdit: Function | any;
	currentProduct: productSelected;
	setProducts: Function;
}

interface items {
	expansion: string;
	category: string;
	item: object;
	_id: number | string;
}

const AddProduct = ({ setOpenEdit, currentProduct, setProducts }: Props) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<any>(false);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [infoText, setInfoText] = useState<string | null>(null);
	const [expansions, setExpansions] = useState<Array<items> | null>(null);
	const [categories, setCategories] = useState<Array<items> | null>(null);
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

	const imageArr = productDetails.image;

	useEffect(() => {
		getImageURL(setImageURL);
		if (router.pathname === '/admin/editproduct') {
			setIsEdit(true);
		}
	}, []);

	useEffect(() => {
		if (isEdit) {
			setProductDetails({
				title: currentProduct.title,
				price: currentProduct.price,
				image: currentProduct.image,
				description: currentProduct.description,
				expansion: currentProduct.expansion,
				category: currentProduct.category,
				SKU: currentProduct.SKU,
				releaseDate: currentProduct.releaseDate,
				stockAmount: currentProduct.stockAmount,
				preOrder: currentProduct.preOrder,
			});
		}
	}, [isEdit]);

	const handleSubmit = () => {
		setInfoText('');
		setIsLoading(true);
		createProduct(productDetails, setIsLoading, setInfoText);
	};

	const handleEdit = () => {
		setInfoText('');
		setIsLoading(true);
		updateProduct(currentProduct._id, productDetails, setIsLoading);

		setTimeout(() => {
			getAllProducts(setProducts);
		}, 1000);

		setOpenEdit(false);
	};

	console.log(isLoading);

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

	useEffect(() => {
		getCategories(setCategories);
		getExpansions(setExpansions);
	}, []);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h5' component='h4'>
					{isEdit ? 'Edit this product' : 'Add a new product'}
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<Carousel>
					{imageArr.map((item, i) => (
						<div
							key={i}
							style={{
								background: `url(${item})`,
								height: '300px',
								backgroundPosition: 'center',
								backgroundSize: 'cover',
							}}
						/>
					))}
				</Carousel>
			</Grid>

			<Grid item xs={12}>
				<input
					type='file'
					accept='image/*'
					onChange={(e: any) => {
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
						categories.map((item: items) => (
							<MenuItem
								value={item.category}
								key={item._id}
								className='text-white'>
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
						expansions.map((item: items) => (
							<MenuItem
								value={item.expansion}
								key={item._id}
								className='text-white'>
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
				{isEdit ? (
					<Button
						variant='contained'
						color='warning'
						onClick={() => {
							setOpenEdit(false);
						}}>
						close
					</Button>
				) : (
					<Link href='/admin'>
						<Button variant='contained' color='warning'>
							Back
						</Button>
					</Link>
				)}
			</Grid>
			<Grid item xs={6}>
				{isEdit ? (
					<Button
						variant='contained'
						color='primary'
						startIcon={
							isLoading ? <CircularProgress size={20} /> : <AddCircleIcon />
						}
						disabled={isLoading}
						onClick={handleEdit}>
						Edit Product
					</Button>
				) : (
					<Button
						variant='contained'
						color='primary'
						startIcon={
							isLoading ? <CircularProgress size={20} /> : <AddCircleIcon />
						}
						disabled={isLoading}
						onClick={handleSubmit}>
						Create Product
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default AddProduct;
