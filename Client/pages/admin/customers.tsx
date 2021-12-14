import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { TableRow, Button, Paper } from '@mui/material';
import Title from '../../Components/Admin/DashboardItems/Title';
import { getUsers, getUserTotalSpend } from '../../api';
import { CircularProgress } from '@mui/material';
import CustomPagination from '../../Components/UIComponents/CustomPagination';
import { CSVLink, CSVDownload } from 'react-csv';
import axios from 'axios';
import { user } from '../../Interfaces/user';
import AdminModal from '../../Components/General/AdminModal';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

interface customers {
	customers: object;
	data: Array<user>;
}

interface csvUser {
	FirstName: string;
	LastName: string;
	Email: string;
	PromtionalMaterial: boolean;
	TotalSpend: number;
}

export default function Customers() {
	const [customers, setCustomers] = useState<null | customers>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [csvData, setCsvData] = useState<Array<csvUser>>([]);
	const [total, setTotal] = useState<any>({});
	const [newTotal, setNewTotal] = useState<any>({});

	//logic for pagination

	//General Logic

	//UseEffects

	useEffect(() => {
		getUsers(setCustomers);
	}, []);

	useEffect(() => {
		if (customers) {
			let emails: Array<string> = [];
			customers.data.forEach((person) =>
				getUserTotalSpend(person.email, setTotal, total),
			);
		}
	}, [customers]);

	useEffect(() => {
		setNewTotal({ ...newTotal, Email: total.email, Total: total.total });
	}, [total]);

	useEffect(() => {
		if (customers) {
			setTotalPages(Math.ceil(customers.data.length / 10));
			let data: Array<csvUser> = [];
			customers.data.forEach((person) => {
				data.push({
					FirstName: person.firstName,
					LastName: person.lastName,
					Email: person.email,
					PromtionalMaterial: person.isPromtions,
					TotalSpend: person.totalSpend,
				});
			});
			setCsvData(data);
		}
	}, [customers]);

	const indexOfLastPage = currentPage * itemsPerPage;
	const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	const currentCustomers = customers?.data.slice(
		indexOfFirstPage,
		indexOfLastPage,
	);

	console.log(csvData);

	if (currentCustomers) {
		return (
			<>
				<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
					<Title>All Customers</Title>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Customer Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Accepts Promtions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{currentCustomers.map((row: user) => (
								<TableRow key={row._id}>
									<TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
									<TableCell>{row.email}</TableCell>

									<TableCell>
										{row.isPromtions ? (
											<CheckCircleOutlineIcon color='success' />
										) : (
											<CancelIcon color='error' />
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
						<Button variant='contained' color='primary'>
							<CSVLink data={csvData}>Download CSV File</CSVLink>
						</Button>
					</div>
				</Paper>
			</>
		);
	} else {
		return <CircularProgress />;
	}
}
