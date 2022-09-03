import * as React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Typography, Grid, cardActionAreaClasses } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Carousel from "react-material-ui-carousel";
import Image from "next/image";
import cardImage from "../../Images/trading-card-placeholder.png";
import styles from "../../styles/Products.module.scss";
import Loading from "../UIComponents/Loading";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { RootState } from "../../Redux/store";
import { v4 as uuidv4 } from "uuid";
import { updateCart } from "../../Redux/slices/cartSlice";
import { item } from "../../Interfaces/Item";
const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	["@media (max-width:900px)"]: {
		height: "80%",
		width: "90%",
		overflow: "scroll",
	},
};

interface props {
	open: boolean;
	setOpen: Function;
	cardItem: item;
}

export default function TransitionsModal({ open, setOpen, cardItem }: props) {
	const dispatch = useAppDispatch();
	const isCart = Boolean(localStorage.getItem("poke-cart"));
	const [currentCart, setCurrentCart] = useState<any>(isCart ? JSON.parse(localStorage.getItem("poke-cart")!) : []);
	const [cartTxt, setCartTxt] = useState<string>("");
	const [inStock, setInStock] = useState<boolean | null>(cardItem.stockAmount > 0);

	const handleClose = () => setOpen(false);

	const handleAddToCart = (item: typeof cardItem) => {
		let newItem = { ...item, localID: uuidv4() };
		if (localStorage.getItem("poke-cart")) {
			let cart = JSON.parse(localStorage.getItem("poke-cart") || "{}");
			setCurrentCart([...cart, newItem]);
		} else {
			setCurrentCart([...currentCart, newItem]);
		}
		setCartTxt(`${item.title} has been added to your cart ✔️`);
		setTimeout(() => {
			setCartTxt("");
		}, 2000);
	};

	useEffect(() => {
		if (currentCart.length === 0) {
			return;
		}

		const currentItemsInCart = currentCart.filter((element: item) => {
			return element._id === cardItem._id;
		}).length;
		setInStock(currentItemsInCart < cardItem.stockAmount);
		if (!inStock) {
			return;
		}
		localStorage.setItem("poke-cart", JSON.stringify(currentCart));
		dispatch({ type: updateCart, payload: currentCart });
	}, [currentCart, dispatch, cardItem._id, cardItem.stockAmount, inStock]);

	if (cardItem) {
		return (
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									justifyContent: "end",
									alignItems: "top",
									cursor: "pointer",
								}}
							>
								<div onClick={handleClose}>
									<CloseIcon />
								</div>
							</Grid>
							<div className={styles.modalContainer}>
								{cardItem.image.length !== 0 ? (
									<>
										<Grid item xs={12} sm={6}>
											<Carousel autoPlay={false}>
												{/* @ts-ignore */}
												{cardItem.image.map((item, i) => (
													<div
														key={i}
														style={{
															background: `url(${item})`,
															height: "500px",
															width: "100%",
															marginLeft: "5%",
															backgroundPosition: "center",
															backgroundSize: "contain",
															backgroundRepeat: "no-repeat",
														}}
													/>
												))}
											</Carousel>
										</Grid>
									</>
								) : (
									<Grid
										item
										xs={12}
										sm={6}
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<Image src={cardImage} height={300} width={250} alt="card" />
									</Grid>
								)}

								<Grid item xs={12} sm={6}>
									<Typography id="transition-modal-title" variant="h6" component="h2">
										{cardItem.title}
									</Typography>
									<div className={styles.divider} />

									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<Typography id="transition-modal-description" sx={{ mt: 2 }}>
												Product code: <span style={{ color: "#989898" }}>{cardItem.SKU}</span>
											</Typography>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Typography id="transition-modal-description" sx={{ mt: 2 }}>
												Product category: <span style={{ color: "#989898" }}>{cardItem.category}</span>
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography
												gutterBottom
												component="p"
												sx={{
													display: "flex",
													alignItems: "center",
												}}
											>
												<LocalOfferIcon />
												Price:
												<span style={{ color: "#989898", marginLeft: "2%" }}>
													£{cardItem.price.toFixed(2).toString()}
												</span>
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography
												gutterBottom
												component="p"
												sx={{
													display: "flex",
													alignItems: "center",
												}}
											>
												{inStock ? (
													<span
														style={{
															color: "#0fbe1d",
															display: "flex",
															alignItems: "center",
														}}
													>
														<CheckIcon />
														Available
													</span>
												) : (
													<span
														style={{
															color: "#da0e0e",
															display: "flex",
															alignItems: "center",
														}}
													>
														<NotInterestedIcon />
														Unavailable
													</span>
												)}
											</Typography>
										</Grid>
										<Grid item xs={12}>
											<div className={styles.divider} />
										</Grid>
										<Grid item xs={12}>
											<Typography
												id="transition-modal-description"
												dangerouslySetInnerHTML={{
													__html: "Description:<br>" + `<span style='color: #989898'>${cardItem.description}</span>`,
												}}
												sx={{ mt: 2 }}
											/>
										</Grid>
										<Grid item xs={12}>
											<div className={styles.divider} />
										</Grid>

										<Grid item xs={12}>
											<Button
												variant="contained"
												color="success"
												onClick={() => handleAddToCart(cardItem)}
												disabled={!inStock}
												startIcon={<ShoppingBagIcon />}
											>
												{!inStock ? "Unavailable" : "Add to cart"}
											</Button>
										</Grid>
										{cartTxt !== "" && (
											<Grid item xs={12}>
												<Typography id="transition-modal-description" sx={{ mt: 2 }}>
													Info: <span style={{ color: "#989898" }}>{cartTxt}</span>
												</Typography>
											</Grid>
										)}
										<Grid item xs={12}>
											<Typography id="transition-modal-description" sx={{ mt: 2 }}>
												Shipping: <br />
												<span style={{ color: "#989898" }}>
													Items are usually shipped in 2-3 working days, if the item is out of stock contact us for
													details.
												</span>
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</div>
						</Grid>
					</Box>
				</Fade>
			</Modal>
		);
	} else {
		// return <Loading />;
		return <></>;
	}
}
