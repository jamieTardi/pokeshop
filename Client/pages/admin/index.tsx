import React, { useEffect, useState } from 'react';
import Dashboard from '../../Components/Admin/DashboardItems/Dashboard';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Forbidden from '../../Components/Admin/DashboardItems/Forbidden';
import axios from 'axios';
import { checkIp } from '../../api/index';

interface Props {}

const key = 'a776beca365a790ed6801d9700574f03ab8c37acb5ba73ff1a739c2c';

const Admin = (props: Props) => {
	const [userIp, setUserIp] = useState(null);
	useEffect(() => {
		axios
			.get(
				`https://api.ipdata.co?api-key=a776beca365a790ed6801d9700574f03ab8c37acb5ba73ff1a739c2c`,
			)
			.then((res) => {
				// checkIp({ ip: res.data.ip });
				setUserIp(res.data.ip);
				// so many more properties
			});
	}, []);
	const isAdmin = useAppSelector((state: RootState) => state.isAdmin.value);
	console.log(process.env.ALLOWED_IP);
	if (userIp) {
		return (
			<>
				{isAdmin && process.env.NEXT_PUBLIC_ALLOWED_IP ? (
					<Dashboard />
				) : (
					<Forbidden />
				)}
			</>
		);
	} else {
		return <p>Loading...</p>;
	}
};

export default Admin;
