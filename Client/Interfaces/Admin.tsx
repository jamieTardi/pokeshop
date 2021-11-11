export interface productForm {
	title: string;
	price: HTMLTextAreaElement | any;
	image: Array<string>;
	description: string;
	expansion: string;
	category: string;
	SKU: string;
	releaseDate: Date | null;
	stockAmount: any;
	preOrder: boolean;
}

export interface productSelected {
	_id: string;
	title: string;
	price: HTMLTextAreaElement | any;
	image: Array<string>;
	description: string;
	expansion: string;
	category: string;
	SKU: string;
	releaseDate: Date | null;
	stockAmount: any;
	preOrder: boolean;
}
