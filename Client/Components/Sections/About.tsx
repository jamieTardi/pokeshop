import Image from 'next/image';
import Venusaur from '../../Images/pokeGroup.png';
import styles from '../../styles/Home.module.scss';

interface Props {}

const About = (props: Props) => {
	return (
		<>
			<div className={styles.aboutGrid}>
				<div className={styles.aboutItem1}>
					<Image src={Venusaur} alt='pokemon' height={350} width={600} />
				</div>

				<div className={`${styles.blackText} ${styles.aboutItem2}`}>
					<p
						style={{
							textAlign: 'center',
							fontSize: '3rem',
							letterSpacing: '10px',
						}}>
						Just a bunch of Pokémon fans...
					</p>
					<p className={styles.aboutText}>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
						esse illum, dolores, unde vel ad voluptatem nemo consequatur, nam
						neque sint nobis adipisci laudantium officiis vero at in fuga quae.
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo
						esse illum, dolores, unde vel ad voluptatem nemo consequatur, nam
						neque sint nobis adipisci laudantium officiis vero at in fuga quae.
					</p>
				</div>
			</div>
		</>
	);
};

export default About;
