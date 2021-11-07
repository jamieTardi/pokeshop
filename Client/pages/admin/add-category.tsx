import { useState } from 'react';
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
import { addExpansions, addCategories } from '../../api/index';
import AdminModal from '../../Components/General/adminModal';

interface Props {}

interface categories {
	addCategory: object;
	category: string;
}

const AddCategory = (props: Props) => {
	const [addCategory, setAddCategory] = useState<categories>({ category: '' });
	const [addExpansion, setAddExpansion] = useState<object>({ expansion: '' });
	const [open, setOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [infoText, setInfoText] = useState<string | null>(null);
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

	const handleAddExpansion = () => {
		addExpansions(addExpansion, setIsLoading, setInfoText);
		if (!isLoading) {
			setOpen(true);
		}
		setTimeout(() => {
			setOpen(false);
		}, 4000);
		setIsLoading(false);
		setInfoText('');
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
								height: 200,
							},
							['@media (max-width:780px)']: {
								flexWrap: 'wrap',
								flexDirection: 'column',
								'& > :not(style)': {
									m: 1,
									width: 400,
									height: 200,
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
									<TextField
										id='standard-basic'
										required
										fullWidth
										label='Title of category'
										value={addCategory.category}
										onChange={(e) => {
											setAddCategory({ category: e.target.value });
										}}
									/>
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
								height: 200,
							},
							['@media (max-width:780px)']: {
								flexWrap: 'wrap',
								'& > :not(style)': {
									m: 1,
									width: 400,
									height: 200,
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
									<TextField
										id='standard-basic'
										required
										fullWidth
										label='Title of category'
										value={addExpansion.expansion}
										onChange={(e) => {
											setAddExpansion({ expansion: e.target.value });
										}}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant='contained'
										color='primary'
										onClick={handleAddExpansion}>
										Add
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</FormControl>
				<AdminModal open={open} setOpen={setOpen} infoText={infoText} />
			</div>
		);
	} else {
		return <Forbidden />;
	}
};

export default AddCategory;
