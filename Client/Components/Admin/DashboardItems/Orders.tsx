import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

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

const rows = [
	createData(
		0,
		'16 Mar, 2019',
		'Elvis Presley',
		'Tupelo, MS',

		12.44,
	),
	createData(
		1,
		'16 Mar, 2019',
		'Paul McCartney',
		'London, UK',

		66.99,
	),
	createData(
		2,
		'16 Mar, 2019',
		'Tom Scholz',
		'Boston, MA',

		10.81,
	),
	createData(
		3,
		'16 Mar, 2019',
		'Michael Jackson',
		'Gary, IN',

		65.39,
	),
	createData(
		4,
		'15 Mar, 2019',
		'Bruce Springsteen',
		'Long Branch, NJ',

		22.79,
	),
];

function preventDefault(event: React.MouseEvent) {
	event.preventDefault();
}

export default function Orders() {
	return (
		<>
			<Title>Recent Orders</Title>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Ship To</TableCell>

						<TableCell>Sale Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{`£${row.amount}`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
				See more orders
			</Link>
		</>
	);
}
