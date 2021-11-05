import React from 'react';
import styles from '../../../styles/Admin.module.scss';

interface Props {}

const Forbidden = (props: Props) => {
	return (
		<div>
			<div className={styles.app}>
				<div>403</div>
				<div className={styles.txt}>
					Forbidden<span className={styles.blink}>_</span>
				</div>
			</div>
		</div>
	);
};

export default Forbidden;
