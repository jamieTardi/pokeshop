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
import { productForm } from '../../Interfaces/Admin';
import { useStyles } from '../../styles/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { createProduct, getCategories, getExpansions } from '../../api';
import { getImageURL } from '../../api';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel';
import AddProduct from '../../Components/Admin/AddProduct';

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
							<AddProduct
								setOpenEdit={undefined}
								currentProduct={new Object()}
							/>
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
