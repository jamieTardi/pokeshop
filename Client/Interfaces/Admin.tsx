export interface productForm {
	title: string;
	price: HTMLTextAreaElement | any;
	image: string;
	description: string;
	expansion: string;
	category: string;
	SKU: string;
	releaseDate: Date | null;
	stockAmount: any;
	preOrder: boolean;
}
