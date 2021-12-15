import cardStyle from '../../styles/PokeCard.module.scss';
import styles from '../../styles/Home.module.scss';
import eeveeThumb from '../../Images/eevee_thumbnail.png';
import Image from 'next/image';
import Zapdos from '../../Images/zapdos.png';
import Energy from '../../Images/energy.png';
import Charizard from '../../Images/charizard.png';
import Bulbasaur from '../../Images/bulbasaur.png';
import Link from 'next/link';

interface Props {}

export const HomeSectionTwo = (props: Props) => {
	return (
		<div className={styles.blackText} style={{ marginTop: '5%' }}>
			<Link href='/shop'>
				<figure className={`${cardStyle.card} ${cardStyle.cardfire}`}>
					<div className={cardStyle.cardimagecontainer}>
						<Image src={Charizard} alt='charizard' height={150} width={170} />
					</div>

					<figcaption className={cardStyle.cardcaption}>
						<h1 className={cardStyle.cardname}>Pokemon TCG products</h1>

						<h3 className={cardStyle.cardtype}>fire</h3>

						<div className={styles.flexBetween}>
							<div className={cardStyle.cardenergy}>
								<div
									className={styles.flexAround}
									style={{ marginBottom: '20%' }}>
									<Image src={Energy} alt='energy' height={20} width={20} />
									<Image src={Energy} alt='energy' height={20} width={20} />
								</div>
								<div className={styles.flexAround}>
									<Image src={Energy} alt='energy' height={20} width={20} />
									<Image src={Energy} alt='energy' height={20} width={20} />
								</div>
							</div>
							<div>
								<p style={{ paddingLeft: '3%' }}>
									Take a look at our full range of Pokemon TCG products and
									accessories
								</p>
							</div>
						</div>

						<div className={cardStyle.cardabilities}>
							<h4 className={cardStyle.cardability}>
								<span className={cardStyle.cardlabel}>Ability</span>
								Flamethrower
							</h4>
							<h4 className={cardStyle.cardability}>
								<span className={cardStyle.cardlabel}>Hidden Ability</span>
								Fly
							</h4>
						</div>
					</figcaption>
				</figure>
			</Link>
			<figure className={`${cardStyle.card} ${cardStyle.cardnormal}`}>
				<div className={cardStyle.cardimagecontainer}>
					<Image src={eeveeThumb} height={150} width={170} alt='pokemon' />
				</div>

				<figcaption className={cardStyle.cardcaption}>
					<h1 className={cardStyle.cardname}>Latest News</h1>

					<h3 className={cardStyle.cardtype}>normal</h3>

					<div className={styles.flexBetween}>
						<div className={cardStyle.cardenergy}>
							<div
								className={styles.flexAround}
								style={{ marginBottom: '20%' }}>
								<Image src={Energy} alt='energy' height={20} width={20} />
								<Image src={Energy} alt='energy' height={20} width={20} />
							</div>
							<div className={styles.flexAround}>
								<Image src={Energy} alt='energy' height={20} width={20} />
								<Image src={Energy} alt='energy' height={20} width={20} />
							</div>
						</div>
						<div>
							<p style={{ paddingLeft: '3%' }}>
								Keep up to date with upcoming launches and restocks!
							</p>
						</div>
					</div>

					<div className={cardStyle.cardabilities}>
						<h4 className={cardStyle.cardability}>
							<span className={cardStyle.cardlabel}>Ability</span>
							Run Away
						</h4>
						<h4 className={cardStyle.cardability}>
							<span className={cardStyle.cardlabel}>Hidden Ability</span>
							Anticipation
						</h4>
					</div>
				</figcaption>
			</figure>

			<figure className={`${cardStyle.card} ${cardStyle.cardelectric}`}>
				<div className={cardStyle.cardimagecontainer}>
					<Image src={Zapdos} alt='zapdos' height={150} width={170} />
				</div>

				<figcaption className={cardStyle.cardcaption}>
					<h1 className={cardStyle.cardname}>Members Area</h1>

					<h3 className={cardStyle.cardtype}>electric</h3>

					<div className={styles.flexBetween}>
						<div className={cardStyle.cardenergy}>
							<div
								className={styles.flexAround}
								style={{ marginBottom: '20%' }}>
								<Image src={Energy} alt='energy' height={20} width={20} />
								<Image src={Energy} alt='energy' height={20} width={20} />
							</div>
							<div className={styles.flexAround}>
								<Image src={Energy} alt='energy' height={20} width={20} />
								<Image src={Energy} alt='energy' height={20} width={20} />
							</div>
						</div>
						<div>
							<p style={{ paddingLeft: '3%' }}>
								Register to access exclusive discounts and member benefits!
							</p>
						</div>
					</div>

					<div className={cardStyle.cardabilities}>
						<h4 className={cardStyle.cardability}>
							<span className={cardStyle.cardlabel}>Ability</span>
							Flash Fire
						</h4>
						<h4 className={cardStyle.cardability}>
							<span className={cardStyle.cardlabel}>Hidden Ability</span>
							Guts
						</h4>
					</div>
				</figcaption>
			</figure>

			<figure className={`${cardStyle.card} ${cardStyle.cardgrass}`}>
				<div className={cardStyle.cardimagecontainer}>
					<Image src={Bulbasaur} height={150} width={170} alt='pokemon' />
				</div>

				<figcaption className={cardStyle.cardcaption}>
					<h1 className={cardStyle.cardname}>Pre Orders</h1>

					<h3 className={cardStyle.cardtype}>grass</h3>

					<div className={styles.flexBetween}>
						<div className={cardStyle.cardenergy}>
							<div
								className={styles.flexAround}
								style={{ marginBottom: '20%' }}>
								<Image src={Energy} alt='energy' height={20} width={20} />
								<Image src={Energy} alt='energy' height={20} width={20} />
							</div>
							<div className={styles.flexAround}>
								<Image src={Energy} alt='energy' height={20} width={20} />
								<Image src={Energy} alt='energy' height={20} width={20} />
							</div>
						</div>
						<div>
							<p style={{ paddingLeft: '3%' }}>Coming soon…</p>
						</div>
					</div>

					<div className={cardStyle.cardabilities}>
						<h4 className={cardStyle.cardability}>
							<span className={cardStyle.cardlabel}>Ability</span>
							Vine Whip
						</h4>
						<h4 className={cardStyle.cardability}>
							<span className={cardStyle.cardlabel}>Hidden Ability</span>
							Cut
						</h4>
					</div>
				</figcaption>
			</figure>
		</div>
	);
};
