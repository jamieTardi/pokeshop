import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Button } from '@mui/material';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import { getUserOrders } from '../../api';
import { orders } from '../../Interfaces/Orders';
import Loading from '../UIComponents/Loading';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomerModal from '../General/CustomerModal';

import CustomPagination from '../UIComponents/CustomPagination';

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}

export default function MyOrders() {
	const [userOrders, setUserOrders] = useState<Array<orders> | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [currentOrder, setCurrentOrder] = useState<null | orders>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [currentProducts, setCurrentProducts] = useState<any>(null);
	const itemsPerPage: number = 10;

	//Redux state
	const token = useAppSelector((state: RootState) => state.auth.value);

	//General Logic
	const handleOpen = (order: orders) => {
		setOpen(true);
		setCurrentOrder(order);
	};

	//UseEffects
	useEffect(() => {
		getUserOrders(token.token, setUserOrders);
	}, [token]);

	useEffect(() => {
		if (userOrders) {
			setTotalPages(Math.ceil(userOrders.length / 10));
			const indexOfLastPage = currentPage * itemsPerPage;
			const indexOfFirstPage = indexOfLastPage - itemsPerPage;
			setCurrentProducts(userOrders.slice(indexOfFirstPage, indexOfLastPage));
		}
	}, [userOrders, currentPage]);

	if (currentProducts) {
		return (
			<div style={{ position: 'relative' }}>
				<TableContainer
					component={Paper}
					style={{ width: '100%', zIndex: 100 }}>
					<Table aria-label='simple table' sx={{ minWidth: 650 }}>
						<TableHead>
							<TableRow>
								<TableCell>Order Number</TableCell>
								<TableCell align='right'>Order Date</TableCell>
								<TableCell align='right'>Shipped</TableCell>
								<TableCell align='right'>View Order</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentProducts.map((row: orders) => (
								<TableRow
									key={row.orderNo}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
									<TableCell align='left'>{row.orderNo}</TableCell>
									<TableCell align='right'>
										{new Date(row.orderDate).toLocaleDateString('en-GB', {
											weekday: 'long',
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</TableCell>
									<TableCell align='right'>
										{row.isShipped ? (
											<CheckCircleIcon color='success' />
										) : (
											<CancelIcon color='error' />
										)}
									</TableCell>
									<TableCell align='right'>
										<Button
											variant='contained'
											color='warning'
											onClick={() => handleOpen(row)}>
											View Order
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<CustomPagination
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>

				{currentOrder && (
					<CustomerModal
						open={open}
						setOpen={setOpen}
						currentCustomer={currentOrder}
						setCurrentCustomer={setCurrentOrder}
					/>
				)}
			</div>
		);
	} else {
		return <Loading />;
	}
}
