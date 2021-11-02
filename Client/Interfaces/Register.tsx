export interface newUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNo: string;
	createdOn: string;
	lastLogin: string;
	role: string;
	dob: string;
	address: object;
	isPromtions: boolean;
	confirmPassword: string;
}

export interface passwords {
	first: string;
	second: string;
	error: string;
	confirmed: string;
	isMatched: boolean;
}

export interface email {
	isCorrect: boolean;
	errorMsg: string;
	newEmail: string;
}
