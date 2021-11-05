import React from 'react';
import Dashboard from '../../Components/Admin/DashboardItems/Dashboard';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Forbidden from '../../Components/Admin/DashboardItems/Forbidden';

interface Props {}

const admin = (props: Props) => {
	const isAdmin = useAppSelector((state: RootState) => state.isAdmin.value);
	return <>{isAdmin ? <Dashboard /> : <Forbidden />}</>;
};

export default admin;
