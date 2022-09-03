import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import cartStyles from "../../styles/Cart.module.scss";
import pokeCard from "../../Images/trading-card-placeholder.png";

interface cartItem {
	item: {
		title: string;
		price: number;
		image: Array<string> | any;
		SKU: string;
	};
	handleRemoveItem: any;
	handleAddItem: any;
}

export default function CardItem({ item, handleRemoveItem, handleAddItem }: cartItem) {
	return (
		<Card sx={{ minWidth: "100%", display: "flex", marginBottom: "3%" }}>
			<div>
				<CardMedia
					component="img"
					sx={{ objectFit: "contain", height: "200px" }}
					image={item.image[0] !== "" ? item.image[0] : pokeCard}
					alt="Cart Picture"
				/>
			</div>
			<div className={cartStyles.cardContent}>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{item.title}
					</Typography>
					<div className={cartStyles.cartCardTypography}>
						<Typography variant="body2" color="text.secondary">
							Price: £{item.price.toFixed(2).toString()}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							SKU number: {item.SKU}
						</Typography>
					</div>
				</CardContent>

				<CardActions>
					<Button size="small" onClick={() => handleRemoveItem(item)}>
						Remove item
					</Button>
					{/* <Button
						size="small"
						onClick={() => {
							handleAddItem(item);
						}}
					>
						Add Another
					</Button> */}
				</CardActions>
			</div>
		</Card>
	);
}
