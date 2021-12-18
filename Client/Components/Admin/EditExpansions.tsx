import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
	Typography,
	TextField,
	MenuItem,
	Grid,
	Select,
	CircularProgress,
	InputLabel,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import AddProduct from '../../Components/Admin/AddProduct';
import axios from 'axios';
import {
	getCategories,
	getExpansions,
	getImageURL,
	updateCategories,
	updateExpansion,
} from '../../api';
import slugify from 'react-slugify';

const style = {
	modal: {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		overflow: 'scroll',
		width: '60%',
		height: '90%',
		bgcolor: 'white',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		['@media (max-width:780px)']: {
			width: '100%',
		},
	},
	box: {
		overflow: 'hidden',
		bgcolor: 'white',
	},
};

interface props {
	setOpenEditExp: Function;
	openEditExp: boolean;
}

interface items {
	id: string;
	category: string;
	image: string;
	slug: string;
}
interface expansions {
	id: string;
	expansion: string;
	image: string;
	slug: string;
}

interface update {
	item: object;
	category: string;
}

interface serverItems {
	expansion: string;
	image: string;
	id: string;
}

export default function EditExpansions({ setOpenEditExp, openEditExp }: props) {
	const editSelection: string[] = ['expansions', 'categories'];
	const [selectedCat, setSelectedCat] = useState<string>('');
	const [infoText, setInfoText] = useState<string>('');
	const [expansion, setExpansion] = useState<null | Array<expansions>>(null);
	const [returnedImage, setReturnedImage] = useState<string>('');
	const [isUpload, setIsUpload] = useState<boolean>(false);
	const [imageText, setImageText] = useState<string>('');
	const [category, setCategory] = useState<null | Array<string>>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const [file, setFile] = useState<any>(null);
	const [modifiedCat, setModifiedCat] = useState<items>({
		id: '',
		category: '',
		slug: '',
		image: '',
	});

	const [modifiedExp, setModifiedExp] = useState<expansions>({
		id: '',
		expansion: '',
		image: '',
		slug: '',
	});
	const handleOpen = () => setOpenEditExp(true);
	const handleClose = (event: any, reason: any) => {
		if (reason === 'backdropClick') {
			handleOpen();
		} else {
			setOpenEditExp(false);
		}
	};

	useEffect(() => {
		setModifiedExp({ ...modifiedExp, image: returnedImage });
		setModifiedCat({ ...modifiedCat, image: returnedImage });
	}, [returnedImage]);

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

	const handleClick = (e: any, item: any) => {
		if (item.category) {
			setModifiedCat({
				...modifiedCat,
				id: item._id,
				category: item.category,
				slug: item.slug,
				image: returnedImage,
			});
		} else {
			setModifiedExp({
				...modifiedExp,
				id: item._id,
				expansion: item.expansion,
				slug: item.slug,
				image: returnedImage,
			});
		}

		// setModifiedExp({ ...modifiedExp, id: e.currentTarget.dataset.id });
	};

	const handleUpdate = () => {
		if (selectedCat === 'categories') {
			updateCategories(modifiedCat.id, modifiedCat, setInfoText);
			setTimeout(() => {
				setInfoText('');
			}, 3000);
		} else {
			updateExpansion(modifiedExp.id, modifiedExp);
			setInfoText('Item updated');
			setTimeout(() => {
				setInfoText('');
			}, 3000);
		}
	};

	const handleModifyCat = (e: any) => {
		setModifiedCat({
			...modifiedCat,
			category: e.target.value,
			image: returnedImage,
			slug: slugify(e.target.value),
		});
	};

	const handleModifyExp = (e: any) => {
		setModifiedExp({
			...modifiedExp,
			expansion: e.target.value,
			image: returnedImage,
			slug: slugify(e.target.value),
		});
	};

	useEffect(() => {
		getCategories(setCategory);

		getExpansions(setExpansion);
	}, []);

	useEffect(() => {
		getImageURL(setImageURL);
	}, []);

	console.log(modifiedCat);

	return (
		<div>
			<Modal
				open={openEditExp}
				sx={style.modal}
				onClose={(event, reason) => handleClose(event, reason)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style.box}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<p>Category</p>
							<Select
								fullWidth
								sx={{ marginBottom: '5%' }}
								value={selectedCat}
								onChange={(e) => {
									setSelectedCat(e.target.value);
								}}>
								{editSelection.map((item: string) => (
									<MenuItem value={item} key={item} className='text-white'>
										{item}
									</MenuItem>
								))}
							</Select>
						</Grid>
					</Grid>
					{selectedCat !== '' && (
						<>
							{selectedCat === 'categories' ? (
								<>
									<Grid item xs={12}>
										<InputLabel>Select the category to edit</InputLabel>
										<select>
											<option value='' selected disabled hidden />
											{category?.map((item: any) => (
												<option
													value={item}
													key={item.category}
													onClick={(e) => {
														handleClick(e, item);
													}}>
													{item.category}
												</option>
											))}
										</select>
									</Grid>

									<Grid item xs={12} sm={6}>
										<p>Category</p>
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
									</Grid>
									<Grid item xs={12}>
										<TextField
											id='standard-basic'
											required
											fullWidth
											sx={{ marginBottom: '5%' }}
											label='Category'
											value={modifiedCat.category}
											onChange={(e) => {
												handleModifyCat(e);
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<p>Current slug is: {modifiedCat.slug}</p>
									</Grid>
								</>
							) : (
								<>
									<Grid item xs={12}>
										<InputLabel>Select the expansion to edit</InputLabel>
										<select>
											{expansion?.map((item) => (
												<option
													value={item.expansion}
													key={item.expansion}
													onClick={(e) => {
														handleClick(e, item);
													}}>
													{item.expansion}
												</option>
											))}
										</select>
									</Grid>
									<Grid item xs={12} sm={6}>
										<p>Expansion</p>
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
									</Grid>
									<Grid item xs={12}>
										<TextField
											id='standard-basic'
											required
											fullWidth
											sx={{ marginBottom: '5%' }}
											label='Expansion'
											value={modifiedExp.expansion}
											onChange={(e) => {
												handleModifyExp(e);
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<p>Current slug is: {modifiedExp.slug}</p>
									</Grid>
								</>
							)}
						</>
					)}

					<Grid item xs={12}>
						{infoText !== '' && <p style={{ color: 'black' }}>{infoText}</p>}
					</Grid>

					<Grid item xs={6} sx={{ marginBottom: '5%' }}>
						<Button
							variant='contained'
							color='primary'
							onClick={handleUpdate}
							disabled={selectedCat === ''}>
							Update
						</Button>
					</Grid>

					<Grid item xs={6}>
						<Button
							variant='contained'
							color='error'
							onClick={() => {
								setOpenEditExp(false);
							}}>
							Close
						</Button>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
}
