import React, { useState, useEffect } from 'react';
import CartItems from '../../Components/Cart/CartItems';
import CartNoItems from '../../Components/Cart/CartNoItems';

interface Props {}

const index = (props: Props) => {
	const [hasItems, setHasItems] = useState<boolean>(false);
	useEffect(() => {
		if (localStorage.getItem('poke-cart')) {
			setHasItems(true);
		} else {
			setHasItems(false);
		}
	}, []);
	if (hasItems) {
		return <CartItems />;
	} else {
		return <CartNoItems />;
	}
};

export default index;
