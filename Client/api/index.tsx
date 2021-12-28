import axios from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:5001',
	headers: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
});

// const API = axios.create({
// 	baseURL: 'https://poke-decks-uk.herokuapp.com',
//headers: { apiKey: process.env.NEXT_PUBLIC_API_KEY },
// });

//users

export const getUserTotalSpend = (
	email: string,
	setTotal: Function,
	total: any,
) =>
	API.get('/users/total-spend', { params: { email } })
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));

export const signUp = (formData: object, setIsLoading: Function) =>
	API.post('/users/signup', formData)
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));

export const signInUser = (
	formData: object,
	setResponse: Function,
	setIsLoading: Function,
	setMessage: Function,
) =>
	API.post('/users/signin', formData)
		.then((res) => setResponse(res))
		.then(() => setIsLoading(false))
		.catch((err) => setMessage('Sign in failed, please refresh and try again'))
		.catch(() => setIsLoading(false));

export const getUsers = (setAllUsers: Function) =>
	API.get('/users')
		.then((res) => setAllUsers(res))
		.catch((err) => console.log(err));

export const checkUsers = (
	token: string,
	address: object,
	setReturnedDetails: Function,
) => {
	API.patch(`/users/check-users/${token}`, address)
		.then((res) => setReturnedDetails(res.data))
		.catch((err) => console.log(err));
};

export const getUser = (token: string, setCurrentUser: Function) => {
	API.get('/users/current-user', { params: { token } })
		.then((res) => setCurrentUser(res.data))
		.catch((err) => console.log(err));
};

export const getUserOrders = (token: string, setUserOrders: Function) => {
	API.get('/users/user-orders', { params: { token } })
		.then((res) => setUserOrders(res.data))
		.catch((err) => console.log(err));
};

export const updateUser = (
	id: string,
	details: object,
	setIsLoading: Function,
) => {
	API.patch(`/users/update-user/${id}`, details)
		.then((res) => console.log(res))
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));
};

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
	API.patch(`/expansion/${id}`, updateExpansion)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

export const getExpansions = (setExpansions: any) => {
	API.get('/expansion')
		.then((res) => setExpansions(res.data.expansions))
		.catch((err) => console.log(err.response.data.message));
};

export const deleteExpansion = (id: string, setInfoText: Function) => {
	API.delete(`/expansion/${id}`)
		.then((res) => setInfoText(res.data))
		.catch(() => setInfoText('Something went wrong'));
};

export const deleteCategory = (id: string, setInfoText: Function) => {
	API.delete(`/category/${id}`)
		.then((res) => setInfoText(res.data))
		.catch(() => setInfoText('Something went wrong'));
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

export const getProductByExp = (exp: string, setProducts: Function) => {
	API.get(`/products/expansions/${exp}`)
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

//cart

export const updateCart = (id: string, item: object) => {
	API.patch(`/users/cart/${id}`, item)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};

export const getCartTotal = (cart: Array<object>, setPrice: Function) => {
	API.get(`/cart/total`, { params: { cart } })
		.then((res) => setPrice(res.data))
		.catch((err) => console.log(err));
};

//Checkout

export const updateAddress = (email: string) => {
	API.patch(`/user/${email}`)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};

//change to axios

export const paymentIntent = (
	items: Array<object>,
	setClientData: Function,
) => {
	API.post('/create-payment-intent', items)
		.then((res) => setClientData(res.data))
		.catch((err) => console.log(err));
};

export const updatePaymentIntent = (
	total: object,
	setClientData: Function,
	paymentIntent: string,
) => {
	API.post('/create-payment-intent/update', total, {
		params: { paymentIntent },
	})
		.then((res) => setClientData(res.data))
		.catch((err) => console.log(err));
};

//Orders

export const createOrderToken = (
	token: object,
	address: object,
	order: string,
	total: string,
) => {
	API.post('/orders/orderToken', token, { params: { address, order, total } })
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err));
};

export const getTempOrder = (token: string, setOrderedItems: Function) => {
	API.get('/orders/orderToken', { params: { token } })
		.then((res) => res.data)
		.catch((err) => console.log(err));
};

// export const UpdateTempOrder = ()

export const createOrder = (
	order: Array<object>,
	address: object,
	total: string,
) => {
	API.post('/orders', order, {
		params: {
			address,
			total,
		},
	})
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};

export const deleteOrder = (id: string, setDeleteMessage: Function) => {
	API.delete(`/orders/delete/${id}`)
		.then(() => setDeleteMessage('Item deleted from database! 🔥'))
		.catch((err) => setDeleteMessage(err.message));
};

export const getAllOrders = (setOrders: Function, setIsLoading: Function) => {
	API.get('/orders')
		.then((res) => setOrders(res.data))
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));
};

export const getTotals = (setMonthTotal: Function, setIsLoading: Function) => {
	API.get('/orders/totals')
		.then((res) => setMonthTotal(res.data))
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));
};

export const getWeeklyTotals = (
	setWeeklyTotals: Function,
	setIsLoading: Function,
) => {
	API.get('/orders/weekly')
		.then((res) => setWeeklyTotals(res.data))
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err));
};

export const updateShipping = (
	id: string,
	customer: object,
	setCurrentCustomer: Function,
) => {
	API.patch(`/orders/shipping/${id}`, customer)
		.then((res) => console.log(res))
		.then(() => setCurrentCustomer({ ...customer, isShipped: true }))
		.catch((err) => console.log(err));
};

//Promtional offers

export const removePromo = (id: string) => {
	API.delete(`/promotions/${id}`)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err.response));
};

export const createPromotion = (promotion: object) => {
	API.post('/promotions', promotion)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err.response));
};

export const getPromotions = (setPromotions: Function) => {
	API.get('/promotions')
		.then((res) => setPromotions(res.data))
		.catch((err) => console.log(err));
};

export const updatePromotion = (
	id: string,
	promotion: object,
	setIsLoading: Function,
) => {
	API.patch(`/promotions/${id}`, promotion)
		.then((res) => console.log(res.data))
		.then(() => setIsLoading(false))
		.catch((err) => console.log(err.message));
};

export const applyPromoCode = (
	code: string,
	total: number,
	setUpdateTotal: Function,
	setErrorMsg: Function,
) => {
	API.get('/promotions/check', { params: { code, total } })
		.then((res) => setUpdateTotal(res.data))
		.catch((err) => setErrorMsg(err.response.data));
};

//General

export const sendContact = (form: object, setMessage: Function) => {
	API.post('/contact', form)
		.then((res) => setMessage(res.data))
		.catch((err) => setMessage(err));
};

export const checkIp = (ip: object, setResponse: Function) => {
	API.post('/ipcheck', ip)
		.then((res) => console.log(res.data))
		.catch((err) => console.log(err.response));
};
