export interface orders {
	orderNo: string;
	setOrders: Function;
	_id: string;
	orderDate: string;
	total: string;
	name: string;
	isShipped: boolean;
	customer: {
		addressLineOne: string;
		firstName: string;
		lastName: string;
		city: string;
		county: string;
		email: string;
		postCode: string;
		country: string;
	};
	items: Array<item>;
}

export interface item {
	SKU: string;
	price: string;
	title: string;
	currentCustomer: object;
}
