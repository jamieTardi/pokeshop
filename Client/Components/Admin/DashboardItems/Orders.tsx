import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { TableRow, Button } from '@mui/material';
import Title from './Title';
import { deleteOrder, getAllOrders } from '../../../api';
import { CircularProgress } from '@mui/material';
import CustomPagination from '../../UIComponents/CustomPagination';
import CustomerModal from './CustomerModal';
import { orders, item } from '../../../Interfaces/Orders';
import AdminModal from '../../General/AdminModal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Orders() {
	const [orders, setOrders] = useState<null | Array<orders>>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [open, setOpen] = useState<boolean>(false);
	const [currentCustomer, setCurrentCustomer] = useState<orders | null>(null);
	const [deleteTxt, setDeleteTxt] = useState<string>('');
	const [adminOpen, setAdminOpen] = useState<boolean>(false);
	const [currentProducts, setCurrentProducts] = useState<any>(null);

	//logic for pagination
	useEffect(() => {
		if (orders) {
			const indexOfLastPage = currentPage * itemsPerPage;
			const indexOfFirstPage = indexOfLastPage - itemsPerPage;
			setCurrentProducts(orders.slice(indexOfFirstPage, indexOfLastPage));
		}
	}, [orders, currentPage]);

	//General Logic

	const handleOpenModal = (customer: orders) => {
		setCurrentCustomer(customer);
		setOpen((prev: any) => !prev);
	};

	const handleDelete = (customer: orders) => {
		setCurrentProducts(
			currentProducts.filter((item: orders) => customer._id !== item._id),
		);
		deleteOrder(customer._id, setDeleteTxt);
		setAdminOpen(true);
	};

	//UseEffects

	useEffect(() => {
		getAllOrders(setOrders, setIsLoading);
	}, []);

	useEffect(() => {
		if (orders) {
			setTotalPages(Math.ceil(orders.length / 10));
		}
	}, [orders]);

	if (currentProducts) {
		return (
			<>
				<Title>Recent Orders</Title>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell>Order No</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Ship To</TableCell>
							<TableCell>Sale Amount</TableCell>
							<TableCell>Shipped</TableCell>
							<TableCell>View Order</TableCell>
							<TableCell>Delete Order</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentProducts.map((row: orders) => (
							<TableRow key={row._id}>
								<TableCell>{row.orderNo}</TableCell>
								<TableCell>{row.customer.email}</TableCell>
								<TableCell>
									{row.customer.firstName + ' ' + row.customer.lastName}
								</TableCell>

								<TableCell>{`${row.total}`}</TableCell>
								<TableCell>
									{row.isShipped ? (
										<CheckCircleOutlineIcon color='success' />
									) : (
										<CancelIcon color='error' />
									)}
								</TableCell>
								<TableCell>
									<Button
										variant='contained'
										color='warning'
										onClick={() => handleOpenModal(row)}>
										View
									</Button>
								</TableCell>
								<TableCell>
									<Button
										variant='contained'
										color='error'
										onClick={() => handleDelete(row)}>
										Delete
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<CustomPagination
						setCurrentPage={setCurrentPage}
						totalPages={totalPages}
					/>
				</Table>
				{currentCustomer && currentCustomer !== undefined && (
					<>
						<CustomerModal
							open={open}
							setOpen={setOpen}
							currentCustomer={currentCustomer}
							setCurrentCustomer={setCurrentCustomer}
						/>
					</>
				)}
				<AdminModal
					open={adminOpen}
					setOpen={setAdminOpen}
					infoText={deleteTxt}
				/>
			</>
		);
	} else {
		return <CircularProgress />;
	}
}
