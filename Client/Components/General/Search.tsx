import React, { useEffect, useState } from 'react';
import { item } from '../../Interfaces/Item';
import Fuse from 'fuse.js';

type TProps = {
	products: item[];
	setSearchResults: Function;
};

const Search = ({ products, setSearchResults }: TProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const fuse = new Fuse(products, {
		keys: ['title', 'expansion', 'category'],
	});
	const result = fuse.search(searchTerm);
	useEffect(() => {
		setSearchResults(result);
	}, [result.length]);
	return (
		<div>
			<input type='text' onChange={(e) => setSearchTerm(e.target.value)} />
		</div>
	);
};

export default Search;
