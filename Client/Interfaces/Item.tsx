export interface item {
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
