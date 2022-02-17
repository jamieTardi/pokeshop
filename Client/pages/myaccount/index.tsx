import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import MyDetails from '../../Components/MyAccount/MyDetails';
import NoUser from '../../Components/General/NoUser';
import MyOrders from '../../Components/MyAccount/MyOrders';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs() {
	const [value, setValue] = React.useState(0);
	const user = useAppSelector((state: RootState) => state.auth.value);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	if (user.token !== '') {
		return (
			<Box sx={{ maxWidth: '100vw', margin: '5% 0%' }}>
				<Paper>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label='basic tabs example'>
							<Tab label='My Details' {...a11yProps(0)} />
							<Tab label='My Orders' {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<MyDetails />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<MyOrders />
					</TabPanel>
				</Paper>
			</Box>
		);
	} else {
		return <NoUser />;
	}
}
