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
} from '@mui/material';
import Modal from '@mui/material/Modal';
import AddProduct from '../../Components/Admin/AddProduct';
import axios from 'axios';
import { getCategories, getExpansions, getImageURL } from '../../api';

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
	category: string;
	image: string;
}
interface expansions {
	expansion: string;
	image: string;
}

interface serverItems {
	expansion: string;
	image: string;
	_id: string;
}

export default function EditExpansions({ setOpenEditExp, openEditExp }: props) {
	const editSelection: string[] = ['expansions', 'categories'];
	const [selectedCat, setSelectedCat] = useState<string>('');
	const [expansion, setExpansion] = useState<null | Array<string>>(null);
	const [returnedImage, setReturnedImage] = useState<string>('');
	const [isUpload, setIsUpload] = useState<boolean>(false);
	const [imageText, setImageText] = useState<string>('');
	const [category, setCategory] = useState<null | Array<string>>(null);
	const [imageURL, setImageURL] = useState<string>('');
	const [file, setFile] = useState<any>(null);
	const [modifiedCat, setModifiedCat] = useState<items>({
		category: '',
		image: '',
	});

	const [modifiedExp, setModifiedExp] = useState<expansions>({
		expansion: '',
		image: '',
	});
	const handleOpen = () => setOpenEditExp(true);
	const handleClose = (event: any, reason: any) => {
		if (reason === 'backdropClick') {
			handleOpen();
		} else {
			setOpenEditExp(false);
		}
	};

	const handleImageSend = () => {
		setIsUpload(true);
		setReturnedImage('');
		axios
			.put(imageURL, file)
			.then((res) => setReturnedImage(res.request.responseURL.split('?')[0]))
			.then(() => setIsUpload(false))
			.then(() => setModifiedCat({ ...modifiedCat, image: returnedImage }))
			.then(() => setModifiedExp({ ...modifiedExp, image: returnedImage }))
			.then(() => setImageText('Upload successful 🎉'))
			.then(() =>
				setTimeout(() => {
					setImageText('');
				}, 2000),
			)

			.catch((err) => console.log(err));
	};
	useEffect(() => {
		if (selectedCat !== '') {
			if (selectedCat === 'categories') {
				getCategories(setCategory);
			} else {
				getExpansions(setExpansion);
			}
		}
	}, [selectedCat]);

	useEffect(() => {
		getImageURL(setImageURL);
	});

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
					{selectedCat === 'categories' ? (
						<>
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
								<Select
									fullWidth
									sx={{ marginBottom: '5%' }}
									value={modifiedCat.category}
									onChange={(e) => {
										setModifiedCat({
											...modifiedCat,
											category: e.target.value,
										});
									}}>
									{category &&
										category.map((item: any) => (
											<MenuItem
												value={item.category}
												key={item._id}
												className='text-white'>
												{item.category}
											</MenuItem>
										))}
								</Select>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='standard-basic'
									// className={classes.input}
									required
									fullWidth
									sx={{ marginBottom: '5%' }}
									label='Category'
									value={modifiedCat.category}
									onChange={(e) => {
										setModifiedCat({
											...modifiedCat,
											category: e.target.value,
										});
									}}
								/>
							</Grid>
						</>
					) : (
						<>
							<p>Expansions</p>
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
								<Select
									fullWidth
									sx={{ marginBottom: '5%' }}
									value={modifiedCat.category}
									onChange={(e) => {
										setModifiedExp({
											...modifiedExp,
											expansion: e.target.value,
										});
									}}>
									{expansion &&
										expansion.map((item: any) => (
											<MenuItem
												value={item.expansion}
												key={item._id}
												className='text-white'>
												{item.expansion}
											</MenuItem>
										))}
								</Select>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id='standard-basic'
									// className={classes.input}
									required
									sx={{ marginBottom: '5%' }}
									fullWidth
									label='Expansion'
									value={modifiedExp.expansion}
									onChange={(e) => {
										setModifiedExp({
											...modifiedExp,
											expansion: e.target.value,
										});
									}}
								/>
							</Grid>
						</>
					)}

					<Button variant='contained' color='error'>
						Update
					</Button>

					<Button variant='contained' color='error'>
						Close
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
