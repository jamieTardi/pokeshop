import React from 'react';
import { createClient } from 'contentful';
const useContentful = () => {
	const client = createClient({
		space: 'mzr3bp9ov2gi',
		accessToken: 'tlXC_uUgI2S-ibYR7q2CX1f3YgCb7GvTt2qdx_vtosY',
		host: 'cdn.contentful.com',
	});
	const getNews = async () => {
		try {
			const entries = await client.getEntries();
			return entries;
		} catch (err) {
			console.log(`Error fetching stuff: ${err}`);
		}
	};
	return { getNews };
};

export default useContentful;
