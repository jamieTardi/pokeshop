import axios from 'axios';

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

export const refreshToken = (token: object) => {
	API.post('/users/token', token)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
};
