import React from 'react';
import Image from 'next/image';
import loadingGif from '../../Images/loading.gif';
import styles from '../../styles/Admin.module.scss';

interface Props {}

const Loading = (props: Props) => {
	return (
		<div className={styles.loading}>
			<Image src={loadingGif} alt='loading' />
		</div>
	);
};

export default Loading;
