import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, CircularProgress } from '@mui/material';
import { getCategories, getExpansions } from '../../api/index';
import { useAppSelector, useAppDispatch } from '../../Redux/hooks';
import { currentPage } from '../../Redux/slices/pagesSlice';

interface Props {}

interface category {
	category: string;
	slug: string;
	expansion: string;
}

const CardLinkBtn = ({ card }: any) => {
	const dispatch = useAppDispatch();
	const [currentLink, setCurrentLink] = useState<string>('');
	const [cat, setcat] = useState<any>('');
	const [allCats, setAllCats] = useState<null | Array<category>>(null);
	const [allExps, setAllExps] = useState<null | Array<category>>(null);
	const [selectedCat, setSelectedCat] = useState<null | category>(null);

	const handleCurrentPage = (page: string) => {
		dispatch({ type: currentPage, payload: page });
	};

	//useEffect section
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
		setcat(card.category ? card.category : card.expansion);
		if (card.category) {
			getCategories(setAllCats);
		} else {
			getExpansions(setAllExps);
		}
	}, []);

	useEffect(() => {
		if (allCats) {
			let filitered = allCats.filter((item) => {
				return item.category === cat;
			});
			setSelectedCat(filitered[0]);
		}
	}, [allCats]);

	//Create editing section so that there is slugs added to db
	useEffect(() => {
		if (allExps) {
			let filitered = allExps.filter((item) => {
				return item.expansion === cat;
			});

			setSelectedCat(filitered[0]);
		}
	}, [allExps]);

	if (selectedCat) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
				<Link href={`/shop/${selectedCat?.slug}`}>
					{card.category ? (
						<Button
							size='medium'
							variant='contained'
							color='primary'
							onClick={() => handleCurrentPage('category')}>
							View Category
						</Button>
					) : (
						<Button
							size='medium'
							variant='contained'
							color='primary'
							onClick={() => handleCurrentPage('expansion')}>
							View Expansion
						</Button>
					)}
				</Link>
			</div>
		);
	} else {
		return <CircularProgress size={20} />;
	}
};

export default CardLinkBtn;
