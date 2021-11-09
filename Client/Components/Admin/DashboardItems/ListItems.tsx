import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Link from 'next/dist/client/link';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export const mainListItems = (
	<div>
		<ListItem button>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary='Dashboard' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary='Orders' />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary='Customers' />
		</ListItem>

		<ListItem button>
			<ListItemIcon>
				<LayersIcon />
			</ListItemIcon>
			<ListItemText primary='Integrations' />
		</ListItem>
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Products Section</ListSubheader>
		<Link href='/admin/category'>
			<ListItem button>
				<ListItemIcon>
					<AddTaskIcon />
				</ListItemIcon>
				<ListItemText primary='Add Catergory' />
			</ListItem>
		</Link>
		<Link href='/admin/products'>
			<ListItem button>
				<ListItemIcon>
					<AddBusinessIcon />
				</ListItemIcon>
				<ListItemText primary='Add Product' />
			</ListItem>
		</Link>
		<Link href='/admin/edit-product'>
			<ListItem button>
				<ListItemIcon>
					<ModeEditIcon />
				</ListItemIcon>
				<ListItemText primary='Edit Product' />
			</ListItem>
		</Link>
	</div>
);
