import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { item } from "../../Interfaces/Item";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Loading from "../UIComponents/Loading";
import ProductModal from "../Shop/ProductModal";
import { v4 as uuidv4 } from "uuid";
import AdminModal from "./AdminModal";
import { useAppDispatch } from "../../Redux/hooks";
import { updateCart } from "../../Redux/slices/cartSlice";

type TProps = {
	products: item[];
};

const ShopItem = ({ products }: TProps) => {
	const [currentCart, setCurrentCart] = useState<item[] | []>([]);
	const [isShowModal, setIsShowModal] = useState<boolean>(false);
	const [cardItem, setCardItem] = useState<item | null>(null);
	const [open, setOpen] = useState(false);
	const infoTxt: string = "Item has been added to cart ✔️";
	const dispatch = useAppDispatch();

	const handleOpenModal = (item: item) => {
		setCardItem(item);
	};

	const handleAddToCart = (item: item) => {
		let newItem = { ...item, localID: uuidv4() };
		if (localStorage.getItem("poke-cart")) {
			let cart = JSON.parse(localStorage.getItem("poke-cart") || "{}");
			setCurrentCart([...cart, newItem]);
		} else {
			setCurrentCart([...currentCart, newItem]);
		}
		setIsShowModal(true);
		setTimeout(() => {
			setIsShowModal(false);
		}, 2000);
	};

	useEffect(() => {
		if (cardItem) {
			setOpen((prev) => !prev);
		}
	}, [cardItem]);

	useEffect(() => {
		if (currentCart.length !== 0) {
			localStorage.setItem("poke-cart", JSON.stringify(currentCart));
			dispatch({ type: updateCart, payload: currentCart });
		}
	}, [currentCart]);

	return (
		<Grid container spacing={4} sx={{ padding: "32px 0 0 32px" }}>
			{products ? (
				products.map((card: any, i) => (
					<Grid item key={card.item._id} xs={12} sm={6} lg={4} xl={3}>
						<Card
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								background: "#fff",
							}}
						>
							<CardMedia
								component="img"
								sx={{ height: "350px", objectFit: "contain" }}
								image={
									card.item.image === "" ||
									!card.item.image ||
									card.item.image[0] === "" ||
									card.item.image.length === 0
										? "https://dlair.net/houston-north/wp-content/uploads/2020/10/PokeVividVoltage_Banner-scaled.jpg"
										: card.item.image[0]
								}
								alt=""
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography variant="h5" component="h2" sx={{ maxHeight: "200px" }}>
									{card.item.title ? card.item.title : card.item.expansion}
								</Typography>
							</CardContent>
							<CardActions>
								<Typography
									gutterBottom
									component="p"
									sx={{
										display: "flex",
										alignItems: "center",
										color: "#989898",
									}}
								>
									<LocalOfferIcon />
									Price: £{card.item.price.toFixed(2).toString()}
								</Typography>
							</CardActions>

							<CardActions>
								<Button size="small" variant="contained" onClick={() => handleOpenModal(card.item)}>
									View Details
								</Button>

								<Button
									size="small"
									color="success"
									disabled={card.item.stockAmount < 1}
									variant="contained"
									onClick={() => handleAddToCart(card.item)}
								>
									{card.item.stockAmount < 1 ? "Out of Stock" : "Add to basket"}
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))
			) : (
				<Loading />
			)}
			{cardItem && <ProductModal open={open} setOpen={setOpen} cardItem={cardItem} />}
			<AdminModal open={isShowModal} setOpen={setIsShowModal} infoText={infoTxt} />
		</Grid>
	);
};

export default ShopItem;
