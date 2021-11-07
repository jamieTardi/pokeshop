import axios from 'axios';
import { add } from 'date-fns';

const API = axios.create({
	baseURL: 'http://localhost:5000',
});

//users

export const signUp = (formData: object) =>
	API.post('/users/signup', formData)
		.then((res) => console.log(res))
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
	API.post('/products', formData)
		.then(() => setIsLoading(false))
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

export const getExpansions = (setExpansions: any) => {
	API.get('/expansion')
		.then((res) => setExpansions(res.data.expansions))
		.catch((err) => console.log(err.response.data.message));
};
