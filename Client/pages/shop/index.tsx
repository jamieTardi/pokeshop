import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import Nav from '../../Components/General/Nav';
import MobileNav from '../../Components/General/MobileNav';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import { isMobileChange } from '../../Redux/slices/mobileSlice';
import Main from '../../Components/Shop/Main';

interface Props {}

const ShopHome = (props: Props) => {
	const dispatch = useAppDispatch();
	const [width, setWidth] = useState<number>(0);

	const mobileSize = useAppSelector((state: RootState) => state.isMobile.value);

	//Event listener for mobile TS

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	let isMobile: boolean = width <= 900;

	useEffect(() => {
		dispatch({ type: isMobileChange, payload: isMobile });
	}, [width]);

	useEffect(() => {
		if (window.innerWidth > 900) {
			dispatch({ type: isMobileChange, payload: false });
		} else {
			dispatch({ type: isMobileChange, payload: true });
		}
	}, []);

	return (
		<Box sx={{ width: '100vw' }}>
			{!mobileSize ? <Nav /> : <MobileNav />}
			<Main />
		</Box>
	);
};

export default ShopHome;
