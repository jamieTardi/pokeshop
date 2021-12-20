import styles from '../../styles/Home.module.scss';
import charmander from '../../Images/charmander.png';
import Image from 'next/image';
import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';
import Link from 'next/link';
import logo from '../../Images/welcome.png';

interface Props {}

export const GlassCardHero = (props: Props) => {
	const isMobile = useAppSelector((state: RootState) => state.isMobile.value);
	return (
		<div className={styles.glassCard}>
			<h1
				className={styles.whiteText}
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Image src={logo} alt='logo' width={350} height={50} />
			</h1>
			<p className={styles.largePara}>
				Make yourself comfortable and browse through our collection of Pokemon
				TCG products – whether you want to add to your existing collection or
				focus on the latest expansion we’ve got you covered!
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
