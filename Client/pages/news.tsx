import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import { useAppSelector } from '../Redux/hooks';
import useContentful from '../CustomHooks/useContentful';
import { RootState } from '../Redux/store';
import news from '../Images/pokeNews.png';

type fields = {
	fields: {
		newsEntry: {
			content: Array<any>;
		};
		newsImage: {
			fields: {
				file: {
					url: string;
				};
			};
		};
		newsItemHeading: string;
	};
};

const News = () => {
	const [newsItems, setNewsItems] = useState<Array<fields> | undefined>([]);
	const { getNews } = useContentful();
	const isMobile = useAppSelector((state: RootState) => state.isMobile.value);

	useEffect(() => {
		getNews()
			.then((res: any) => setNewsItems(res?.items))
			.catch((err) => console.log(err));
	}, []);

	if (!newsItems) {
		return <p>Loading....</p>;
	} else {
		return (
			<>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '5%',
					}}>
					<Image src={news} />
				</div>
				{newsItems.map((item) => (
					<React.Fragment key={item.fields.newsItemHeading}>
						<div className={styles.aboutGrid}>
							<div className={styles.aboutItem1}>
								<Image
									src={`https:${item.fields.newsImage.fields.file.url}`}
									alt='pokemon'
									width={420}
									height={300}
								/>
							</div>

							<div className={`${styles.whiteText} ${styles.aboutItem2}`}>
								<p
									style={{
										textAlign: 'center',
										fontSize: '3rem',
										letterSpacing: '10px',
									}}>
									{item.fields.newsItemHeading}
								</p>
								<p className={styles.aboutText}>
									{item.fields.newsEntry.content.map((content: any) => {
										return content.content.map(
											(innerContent: any, i: number) => (
												<p key={i}>{innerContent.value}</p>
											),
										);
									})}
								</p>
							</div>
						</div>
					</React.Fragment>
				))}
			</>
		);
	}
};

export default News;
