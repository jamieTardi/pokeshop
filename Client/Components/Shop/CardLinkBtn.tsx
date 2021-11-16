import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

interface Props {}

const CardLinkBtn = ({ card }: any) => {
	const [currentLink, setCurrentLink] = useState<string>('');
	const [cat, setcat] = useState<any>('');

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
	}, []);

	return (
		<Link href={currentLink}>
			<Button size='small'>View Category</Button>
		</Link>
	);
};

export default CardLinkBtn;
