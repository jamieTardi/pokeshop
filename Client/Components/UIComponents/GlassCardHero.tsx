import styles from '../../styles/Home.module.scss';
import charmander from '../../Images/charmander.png';
import Image from 'next/image';
import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Link from 'next/link';

interface Props {}

export const GlassCardHero = (props: Props) => {
	const isMobile = useAppSelector((state: RootState) => state.isMobile.value);
	return (
		<div className={styles.glassCard}>
			<h1 className={!isMobile ? styles.blackText : styles.whiteText}>
				Pokémon cards
			</h1>
			<p className={styles.largePara}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ipsa! Est
				quam minima voluptatum rerum quidem, vero, amet quae hic atque ex nihil
				animi! Saepe incidunt doloribus suscipit minus aliquam.
			</p>

			<Button
				variant='contained'
				color='primary'
				sx={{ borderRadius: 25 }}
				endIcon={<ShoppingBagIcon />}>
				<Link href='/shop'>Shop now</Link>
			</Button>

			<div className={styles.cardImage}>
				{!isMobile && <Image src={charmander} height={150} width={140} />}
			</div>
		</div>
	);
};
