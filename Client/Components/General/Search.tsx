import React, { useEffect, useState } from 'react';
import { item } from '../../Interfaces/Item';
import Fuse from 'fuse.js';
import { Input, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
			<Input id="outlined-basic" placeholder='Search for products'  type='text' sx={{background: "white", borderRadius: "5px", width: "100%"}}  startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          } onChange={(e) => setSearchTerm(e.target.value)} />
		</div>
	);
};

export default Search;
