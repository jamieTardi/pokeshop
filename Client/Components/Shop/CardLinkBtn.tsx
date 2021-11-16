import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, CircularProgress } from '@mui/material';
import { getCategories } from '../../api/index';

interface Props {}

interface category {
	category: string;
	slug: string;
}

const CardLinkBtn = ({ card }: any) => {
	const [currentLink, setCurrentLink] = useState<string>('');
	const [cat, setcat] = useState<any>('');
	const [allCats, setAllCats] = useState<null | Array<category>>(null);
	const [selectedCat, setSelectedCat] = useState<null | category>(null);

	useEffect(() => {
		switch (cat) {
			case 'Battle Decks':
				setCurrentLink('/shop/battle-decks');
				break;
			default:
				setCurrentLink('/shop');
		}
	}, [cat]);

	useEffect(() => {
		setcat(card.category);
		getCategories(setAllCats);
	}, []);

	useEffect(() => {
		if (allCats) {
			let filitered = allCats.filter((item) => {
				return item.category === cat;
			});
			setSelectedCat(filitered[0]);
		}
	}, [allCats]);

	if (selectedCat) {
		return (
			<Link href={`/shop/${selectedCat?.slug}`}>
				<Button size='small'>View Category</Button>
			</Link>
		);
	} else {
		return <CircularProgress size={20} />;
	}
};

export default CardLinkBtn;
