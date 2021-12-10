import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { TableRow, Button } from '@mui/material';
import Title from './Title';
import { getAllOrders } from '../../../api';
import { CircularProgress } from '@mui/material';
import CustomPagination from '../../UIComponents/CustomPagination';
import CustomerModal from './CustomerModal';
import { orders, item } from '../../../Interfaces/Orders';

// Generate Order Data
function createData(
	id: number,
	date: string,
	name: string,
	shipTo: string,

	amount: number,
) {
	return { id, date, name, shipTo, amount };
}

function preventDefault(event: React.MouseEvent) {
	event.preventDefault();
}

export default function Orders() {
	const [orders, setOrders] = useState<null | Array<orders>>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [open, setOpen] = useState<boolean>(false);
	const [currentCustomer, setCurrentCustomer] = useState<orders | null>(null);

	//logic for pagination
	const indexOfLastPage = currentPage * itemsPerPage;
	const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	const currentProducts = orders?.slice(indexOfFirstPage, indexOfLastPage);

	//General Logic

	const handleOpenModal = (customer: orders) => {
		setCurrentCustomer(customer);
		setOpen((prev: any) => !prev);
	};

	console.log(currentCustomer);

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
							<TableCell>View Order</TableCell>

							<TableCell>Sale Amount</TableCell>
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
								{/* <TableCell>
									{row.customer.addressLineOne +
										', \n' +
										row.customer.city +
										', \n' +
										row.customer.county +
										', \n' +
										row.customer.postCode +
										', \n' +
										row.customer.country}
								</TableCell> */}
								<TableCell>{`${row.total}`}</TableCell>
								<TableCell>
									<Button
										variant='contained'
										color='warning'
										onClick={() => handleOpenModal(row)}>
										View
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
					<CustomerModal
						open={open}
						setOpen={setOpen}
						currentCustomer={currentCustomer}
					/>
				)}
			</>
		);
	} else {
		return <CircularProgress />;
	}
}
