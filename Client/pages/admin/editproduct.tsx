import Forbidden from '../../Components/Admin/DashboardItems/Forbidden';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Button } from '@mui/material';
import Title from '../../Components/Admin/DashboardItems/Title';
import { Grid } from '@mui/material';
import styles from '../../styles/Admin.module.scss';
import { useState, useEffect } from 'react';
import { getAllProducts } from '../../api/index';
import Loading from '../../Components/UIComponents/Loading';
import CustomPagination from '../../Components/UIComponents/CustomPagination';

interface dataProducts {
	_id: string;
	title: string;
	category: string;
	expansion: string;
	SKU: string;
}

export default function EditProduct() {
	const [products, setProducts] = useState<null | Array<dataProducts>>(null);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const isAdmin: boolean = useAppSelector(
		(state: RootState) => state.isAdmin.value,
	);
	const length = 30;

	//logic for pagination
	const indexOfLastPage = currentPage * itemsPerPage;
	const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	const currentProducts = products?.slice(indexOfFirstPage, indexOfLastPage);

	useEffect(() => {
		getAllProducts(setProducts);
	}, []);

	useEffect(() => {
		if (products) {
			setTotalPages(Math.ceil(products.length / 10));
		}
	}, [products]);

	if (isAdmin) {
		return (
			<>
				{currentProducts ? (
					<div className={styles.productContainer}>
						<Grid maxWidth='lg' sx={{ mt: 4, mb: 4, background: '#F5F5F5' }}>
							<Grid item xs={12}>
								<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
									<Title>Products avalible in the database</Title>
									<Table size='small'>
										<TableHead>
											<TableRow>
												<TableCell>SKU</TableCell>

												<TableCell>Title</TableCell>
												<TableCell>Category</TableCell>
												<TableCell>Expansion</TableCell>
												<TableCell>Edit</TableCell>
												<TableCell>Delete</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{currentProducts.map((item) => (
												<TableRow key={item._id}>
													<TableCell>{item.SKU}</TableCell>

													<TableCell>
														{item.title.substring(
															0,
															Math.min(length, item.title.length),
														)}
														...
													</TableCell>
													<TableCell>{item.category}</TableCell>
													<TableCell>{item.expansion}</TableCell>
													<TableCell>
														<Button variant='contained' color='secondary'>
															Edit
														</Button>
													</TableCell>
													<TableCell>
														<Button variant='contained' color='warning'>
															Delete
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									<CustomPagination
										setCurrentPage={setCurrentPage}
										totalPages={totalPages}
									/>
								</Paper>
							</Grid>
						</Grid>
					</div>
				) : (
					<Loading />
				)}
			</>
		);
	} else {
		return <Forbidden />;
	}
}
