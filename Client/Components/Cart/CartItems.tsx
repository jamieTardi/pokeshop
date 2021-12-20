import React, { useEffect, useState } from 'react';
import { item } from '../../Interfaces/Item';
import cartStyles from '../../styles/Cart.module.scss';
import styles from '../../styles/Home.module.scss';
import Loading from '../UIComponents/Loading';
import CartItem from './CartItem';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { updateCart } from '../../Redux/slices/cartSlice';
import { v4 as uuidv4 } from 'uuid';
import CartNoItems from './CartNoItems';
import CardTotal from './CartTotal';

interface Props {}

const CartItems = (props: Props) => {
	const dispatch = useAppDispatch();

	const [items, setItems] = useState<Array<item> | null>(null);

	//Redux State

	//General logic

	const handleRemoveItem = (item: item) => {
		if (items) {
			let filitered: Array<item> = items.filter(
				(el) => el.title !== item.title,
			);

			setItems(filitered);
		}
	};

	const handleAddItem = (item: item) => {
		if (items) {
			setItems([...items, item]);
		}
	};

	//useEffects

	useEffect(() => {
		if (items) {
			localStorage.setItem('poke-cart', JSON.stringify(items));
			dispatch({ type: updateCart, payload: items });
		}
	}, [items]);

	useEffect(() => {
		setItems(JSON.parse(localStorage.getItem('poke-cart') || '{}'));
	}, []);

	if (items && items.length !== 0) {
		return (
			<div className={`${styles.container} ${styles.whiteText}`}>
				<div className={cartStyles.container}>
					<div className={cartStyles.gridItem1}>
						<div>
							{items ? (
								items.map((item) => (
									<CartItem
										key={uuidv4()}
										item={item}
										handleRemoveItem={handleRemoveItem}
										handleAddItem={handleAddItem}
									/>
								))
							) : (
								<Loading />
							)}
						</div>
					</div>
					<div className={cartStyles.gridItem2}>
						<CardTotal items={items} />
					</div>
				</div>
			</div>
		);
	} else if (!items) {
		return <Loading />;
	} else {
		return <CartNoItems />;
	}
};

export default CartItems;
