import React from 'react';
import ShopItems from '../../Components/Shop/ShopItems';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';

interface Props {}

const DefaultShop = (props: Props) => {
	const mobileSize = useAppSelector((state: RootState) => state.isMobile.value);

	return (
		<div>
			<ShopItems />
		</div>
	);
};

export default DefaultShop;
