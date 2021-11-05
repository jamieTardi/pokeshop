import React from 'react';
import { Paper, Box, Grid, TextField } from '@mui/material';
import styles from '../../styles/Admin.module.scss';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Forbidden from '../../Components/Admin/DashboardItems/Forbidden';

interface Props {}

const AddProducts = (props: Props) => {
	const isAdmin: boolean = useAppSelector(
		(state: RootState) => state.isAdmin.value,
	);

	if (isAdmin) {
		return (
			<div className={styles.productContainer}>
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
					<Paper elevation={3}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField defaultValue='item' />
							</Grid>
						</Grid>
					</Paper>
				</Box>
			</div>
		);
	} else {
		return <Forbidden />;
	}
};

export default AddProducts;
