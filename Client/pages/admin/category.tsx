import React, { useEffect, useState } from 'react';
import { RootState } from '../../Redux/store';
import { useAppSelector } from '../../Redux/hooks';
import Forbidden from '../../Components/Admin/DashboardItems/Forbidden';
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
import { useStyles } from '../../styles/styles';
import styles from '../../styles/Admin.module.scss';
import { addExpansions, addCategories, getImageURL } from '../../api/index';
import AdminModal from '../../Components/General/AdminModal';
import axios from 'axios';
import EditExpansions from '../../Components/Admin/EditExpansions';
import slugify from 'react-slugify';

interface Props {}

interface categories {
	addCategory: object;
	category: any;
	image: string;
	slug: string;
}

const AddCategory = (props: Props) => {
	const [returnedImage, setReturnedImage] = useState<string>('');
	const [addCategory, setAddCategory] = useState<categories | any>({
		category: '',
		image: returnedImage,
		slug: '',
	});
	const [addExpansion, setAddExpansion] = useState<any>({
		expansion: '',
		image: returnedImage,
		slug: '',
	});
	const [open, setOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isUpload, setIsUpload] = useState<boolean>(false);
	const [infoText, setInfoText] = useState<any | null>(null);
	const [imageText, setImageText] = useState<string>('');
	const [openEditExp, setOpenEditExp] = useState<boolean>(false);
	const [imageURL, setImageURL] = useState<string>('');
	const [file, setFile] = useState<any>(null);
	const isAdmin: boolean = useAppSelector(
		(state: RootState) => state.isAdmin.value,
	);
	const classes = useStyles();

	const handleAddCategory = () => {
		setIsLoading(true);
		addCategories(addCategory, setIsLoading, setInfoText);
		if (!isLoading) {
			setOpen(true);
		}
		setTimeout(() => {
			setOpen(false);
		}, 4000);
		setIsLoading(false);
		setInfoText('');
	};

	const handleAddExpansion = (e: any) => {
		addExpansions(addExpansion, setIsLoading, setInfoText);
		if (!isLoading) {
			setOpen(true);
		}
		setTimeout(() => {
			setOpen(false);
		}, 4000);
		setIsLoading(false);
		setInfoText('');
		setAddCategory({
			expansion: '',
			image: returnedImage,
			slug: '',
		});
	};

	const handleAddCat = (e: any) => {
		setAddCategory({
			...addCategory,
			category: e.target.value,
			slug: slugify(e.target.value),
		});
	};

	const handleAddExp = (e: any) => {
		setAddExpansion({
			...addExpansion,
			expansion: e.target.value,
			slug: slugify(e.target.value),
		});
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
		if (returnedImage !== '') {
			setAddCategory({ ...addCategory, image: returnedImage });
			setAddExpansion({ ...addExpansion, image: returnedImage });
		}
	}, [returnedImage]);

	useEffect(() => {
		getImageURL(setImageURL);
	}, []);

	const handleOpenEdit = () => {
		setOpenEditExp((prev) => !prev);
	};

	if (isAdmin) {
		return (
			<div className={styles.categoryContainer}>
				<FormControl>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							'& > :not(style)': {
								m: 1,
								width: 600,
								height: 400,
							},
							['@media (max-width:780px)']: {
								flexWrap: 'wrap',
								flexDirection: 'column',
								'& > :not(style)': {
									m: 1,
									width: 400,
									height: 500,
								},
							},
						}}>
						<Paper elevation={3} className={classes.paper}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant='h5' component='h4'>
										Add a new category
									</Typography>
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
								<Grid item xs={12}>
									<TextField
										id='standard-basic'
										required
										fullWidth
										label='Title of category'
										value={addCategory.category}
										onChange={(e) => {
											handleAddCat(e);
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<p>Current URL slug: {addCategory.slug}</p>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='primary'
										onClick={handleAddCategory}>
										Add
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</FormControl>
				<FormControl>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							'& > :not(style)': {
								m: 1,
								width: 600,
								height: 300,
							},
							['@media (max-width:780px)']: {
								flexWrap: 'wrap',
								'& > :not(style)': {
									m: 1,
									width: 400,
									height: 300,
								},
							},
						}}>
						<Paper elevation={3} className={classes.paper}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant='h5' component='h4'>
										Add a new expansion
									</Typography>
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
								<Grid item xs={12}>
									<TextField
										id='standard-basic'
										required
										fullWidth
										label='Title of expansion'
										value={addExpansion.expansion}
										onChange={(e) => {
											handleAddExp(e);
										}}
									/>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant='contained'
										color='primary'
										onClick={handleAddExpansion}>
										Add
									</Button>
								</Grid>
								<Grid item xs={6}>
									<Button
										variant='contained'
										color='warning'
										onClick={handleOpenEdit}>
										Edit All
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</FormControl>
				<AdminModal open={open} setOpen={setOpen} infoText={infoText} />
				<EditExpansions
					openEditExp={openEditExp}
					setOpenEditExp={setOpenEditExp}
				/>
			</div>
		);
	} else {
		return <Forbidden />;
	}
};

export default AddCategory;
