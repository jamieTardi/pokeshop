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
import { getAllProducts, deleteProduct } from '../../api/index';
import Loading from '../../Components/UIComponents/Loading';
import CustomPagination from '../../Components/UIComponents/CustomPagination';
import AdminModal from '../../Components/General/AdminModal';
import EditModal from '../../Components/Admin/EditModal';

interface dataProducts {
	_id: string;
	title: string;
	category: string;
	expansion: string;
	SKU: string;
}

export default function EditProduct() {
	const [products, setProducts] = useState<null | Array<dataProducts>>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [deleteResponse, setDeleteResponse] = useState<boolean>(false);
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [currentProduct, setCurrentProduct] = useState<object>({});
	const isAdmin: boolean = useAppSelector(
		(state: RootState) => state.isAdmin.value,
	);
	const length: number = 30;
	const infoText: string =
		'Item has been removed from the database..its gone FOREEEVER! 💨';

	//logic for pagination
	const indexOfLastPage = currentPage * itemsPerPage;
	const indexOfFirstPage = indexOfLastPage - itemsPerPage;
	const currentProducts = products?.slice(indexOfFirstPage, indexOfLastPage);

	//General logic

	const handleDeleteProduct = (id: string) => {
		setDeleteResponse(false);
		deleteProduct(id, setDeleteResponse);
		setOpen(true);
	};

	const handleEdit = (item: object) => {
		setCurrentProduct(item);
		setOpenEdit(true);
	};

	//useEffects

	useEffect(() => {
		getAllProducts(setProducts);
	}, [deleteResponse]);

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
														<Button
															variant='contained'
															color='secondary'
															onClick={() => handleEdit(item)}>
															Edit
														</Button>
													</TableCell>
													<TableCell>
														<Button
															variant='contained'
															color='warning'
															onClick={() => {
																handleDeleteProduct(item._id);
															}}>
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
						<AdminModal setOpen={setOpen} open={open} infoText={infoText} />
						<EditModal
							openEdit={openEdit}
							setOpenEdit={setOpenEdit}
							currentProduct={currentProduct}
						/>
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
