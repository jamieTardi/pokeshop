import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import styles from '../../styles/Admin.module.scss';

interface props {
	setCurrentPage: any;
	totalPages: number;
}

export default function CustomPagination({
	setCurrentPage,
	totalPages,
}: props) {
	return (
		<div className={styles.pagination}>
			<Stack spacing={2}>
				<Pagination
					count={totalPages}
					color='primary'
					onChange={(event: React.ChangeEvent<unknown>, page: number) => {
						setCurrentPage(page);
					}}
				/>
			</Stack>
		</div>
	);
}
