import Image from 'next/image';
import Venusaur from '../../Images/pokeGroup.png';
import styles from '../../styles/Home.module.scss';
import Cards from '../../Images/pokemon-card-image.png';
import { useAppSelector } from '../../Redux/hooks';
import { RootState } from '../../Redux/store';

interface Props {}

const About = (props: Props) => {
	const isMobile = useAppSelector((state: RootState) => state.isMobile.value);

	return (
		<>
			<div className={styles.aboutGrid}>
				<div className={styles.aboutItem1}>
					<Image src={Venusaur} alt='pokemon' height={350} width={600} />
				</div>

				<div
					className={
						isMobile
							? `${styles.whiteText} ${styles.aboutItem2}`
							: `${styles.blackText} ${styles.aboutItem2}`
					}>
					<p
						style={{
							textAlign: 'center',
							fontSize: '3rem',
							letterSpacing: '10px',
						}}>
						Why Choose Us
					</p>
					<p className={styles.aboutText}>
						Poke-Decks is an online retail store specialising in the Pokemon
						trading card game. We have over 15 years’ experience in collecting,
						playing, and enjoying the Pokemon franchise and our website is a
						true reflection of our dedication to Pokemon TCG! We work hard to
						provide a wide range of sealed products alongside a fantastic range
						of trading card accessories at fair prices. We aim to support your
						hobby and keep the fun alive with our smooth order process, reliable
						delivery, and professional services whilst we reward dedicated
						customers with regular offers – be sure to create an account to
						access the exclusive benefits available to our members! We value
						your custom and hope you enjoy shopping with us as much as we enjoy
						providing to the Pokemon TCG community!
					</p>
				</div>
			</div>
		</>
	);
};

export default About;
