import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import clsx from 'clsx';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<StrictMode>
		<main className={clsx(styles.main)}>
			<App />
		</main>
	</StrictMode>
);
