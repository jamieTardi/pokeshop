export interface user {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNo: string;
	createdOn: string;
	lastLogin: string;
	role: string;
	totalSpend: number;
	dob: string;
	address: {
		firstName: string;
		lastName: string;
		addressLineOne: string;
		email: string;
		city: string;
		county: string;
		postCode: string;
		country: string;
	};
	isPromtions: boolean;
	confirmPassword: string;
	refreshToken: string;
}
