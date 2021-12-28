import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
) {
	return { name, calories, fat, carbs, protein };
}

export default function BasicTable({ currentCustomer }: any) {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>Title</TableCell>
						<TableCell align='left'>SKU</TableCell>
						<TableCell align='left'>Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{currentCustomer.map((row: any) => (
						<TableRow
							key={row.title}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component='th' scope='row'>
								{row.title}
							</TableCell>
							<TableCell component='th' scope='row'>
								{row.SKU}
							</TableCell>
							<TableCell component='th' scope='row'>
								{row.price}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
