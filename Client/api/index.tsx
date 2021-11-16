import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:5001',
});

// const API = axios.create({
// 	baseURL: 'https://poke-decks-uk.herokuapp.com',
// });

//users

export const signUp = (formData: object, setIsLoading: any) =>
	API.post('/users/signup', formData)
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));

export const signInUser = (formData: object, setResponse: any) =>
	API.post('/users/signin', formData)
		.then((res) => setResponse(res))
		.catch((err) => console.log(err));

export const getUsers = (setAllUsers: any) =>
	API.get('/users')
		.then((res) => setAllUsers(res))
		.catch((err) => console.log(err));

//Products

export const createProduct = (
	formData: object,
	setIsLoading: any,
	setInfoText: any,
) => {
	API.post('/products', formData, setInfoText)
		.then(() => setIsLoading(false))
		.then(() => setInfoText('Product added you awesome person! ✨'))
		.catch((err) => setInfoText(err.response.data.message));
};

export const addExpansions = (
	expansion: object,
	setIsLoading: any,
	setInfoText: any,
) => {
	API.post('/expansion', expansion)
		.then(() => {
			setInfoText('Expansion added you awesome person! ✨');
		})
		.then(() => setIsLoading(false))

		.catch((err) => setInfoText(err.response.data.message));
};

export const addCategories = (
	addCategory: object,
	setIsLoading: any,
	setInfoText: any,
) => {
	API.post('/category', addCategory)
		.then(() => {
			setInfoText('Category added you awesome person! ✨');
		})
		.then(() => setIsLoading(false))
		.catch((err) => setInfoText(err.response.data.message));
};

export const getCategories = (setCategories: any) => {
	API.get('/category')
		.then((res) => setCategories(res.data.categories))
		.catch((err) => console.log(err.response.data.message));
};

export const updateCategories = (
	id: string,
	updateCategory: object,
	setInfoTxt: any,
) => {
	API.patch(`/category/${id}`, updateCategory)
		.then((res) => setInfoTxt('Updated item'))
		.catch((err) =>
			setInfoTxt('Something Went wrong, refresh the page and try again.'),
		);
};

export const updateExpansion = (id: string, updateExpansion: object) => {
	console.log(id);
	// API.patch(`/expansion/${id}`, updateExpansion)
	// 	.then((res) => console.log(res))
	// 	.catch((err) => console.log(err));
};

export const getExpansions = (setExpansions: any) => {
	API.get('/expansion')
		.then((res) => setExpansions(res.data.expansions))
		.catch((err) => console.log(err.response.data.message));
};

export const getAllProducts = (setProducts: any) => {
	API.get('/products')
		.then((res) => setProducts(res.data))
		.catch((err) => console.log(err));
};

export const deleteProduct = (id: any, setDeleteResponse: any) => {
	API.delete(`/products/${id}`)

		.then(() => setDeleteResponse(true))
		.catch((err) => console.log(err));
};

export const getProductByCat = (cat: string, setProducts: Function) => {
	API.get(`/products/${cat}`)
		.then((res) => setProducts(res.data))
		.catch((err) => console.log(err));
};

//updating

export const updateProduct = (
	id: string,
	formData: object,
	setIsLoading: Function,
) => {
	API.patch(`/products/${id}`, formData)
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));
};

//images

export const getImageURL = (setImageURL: any) => {
	API.get('/s3URL')
		.then((res) => setImageURL(res.data.url))
		.catch((err) => console.log(err));
};
