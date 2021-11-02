import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

//users

export const signUp = (formData: object) =>
	API.post('/users/signup', formData)
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
