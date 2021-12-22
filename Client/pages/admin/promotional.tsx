import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { TableRow, Button, Paper } from '@mui/material';
import Title from '../../Components/Admin/DashboardItems/Title';
import { getPromotions, updatePromotion } from '../../api';
import { CircularProgress } from '@mui/material';
import CustomPagination from '../../Components/UIComponents/CustomPagination';
import PromotionModal from '../../Components/Admin/DashboardItems/PromotionModal';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

export interface promotion {
	title: string;
	isActive: boolean;
	discount: number;
	_id: string;
}

export default function Customers() {
	const [promotions, setPromotions] = useState<Array<promotion>>([]);
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [newPromotion, setNewPromotion] = useState<promotion>({
		_id: '',
		title: '',
		discount: 0,
		isActive: false,
	});

	//logic for pagination

	//General Logic

	const handleUpdate = (promotion: promotion) => {
		let newPromotion = {
			...promotion,
			isActive: promotion.isActive ? false : true,
		};
		console.log(newPromotion);
		setIsLoading(true);
		updatePromotion(newPromotion._id, newPromotion, setIsLoading);
	};

	//UseEffects

	useEffect(() => {
		getPromotions(setPromotions);
	}, [newPromotion, isLoading]);

	// const indexOfLastPage = currentPage * itemsPerPage;
	// const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	// const currentCustomers = customers?.data.slice(
	// 	indexOfFirstPage,
	// 	indexOfLastPage,
	// );

	if (promotions) {
		return (
			<>
				<Paper
					sx={{
						p: 2,
						display: 'flex',
						flexDirection: 'column',
						margin: '5% 0%',
						minHeight: '50vh',
					}}>
					<Title>All Promotions</Title>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Promotion Title</TableCell>
								<TableCell>Percentage</TableCell>
								<TableCell>Currently Active</TableCell>
								<TableCell>Toggle Promotion</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{promotions.map((row: promotion) => (
								<TableRow key={row.title}>
									<TableCell>{row.title}</TableCell>
									<TableCell>
										{row.discount.toFixed().toString() + '%'}
									</TableCell>

									<TableCell>
										{row.isActive ? (
											<CheckCircleOutlineIcon color='success' />
										) : (
											<CancelIcon color='error' />
										)}
									</TableCell>
									<TableCell>
										{row.isActive ? (
											<Button
												color='error'
												variant='contained'
												onClick={() => handleUpdate(row)}>
												Disable
											</Button>
										) : (
											<Button
												color='success'
												variant='contained'
												onClick={() => handleUpdate(row)}>
												Make Active
											</Button>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<CustomPagination
							setCurrentPage={setCurrentPage}
							totalPages={totalPages}
						/>
					</Table>
					<div>
						<Button
							variant='contained'
							color='success'
							onClick={() => setOpen(true)}>
							Add New
						</Button>
					</div>
				</Paper>
				<PromotionModal
					open={open}
					setOpen={setOpen}
					newPromotion={newPromotion}
					setNewPromotion={setNewPromotion}
				/>
			</>
		);
	} else {
		return <CircularProgress />;
	}
}
