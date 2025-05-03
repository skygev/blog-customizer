import { useEffect, useState } from 'react';
import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

export const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// Применение CSS-переменных
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty(
			'--font-family',
			articleState.fontFamilyOption.value
		);
		root.style.setProperty('--font-size', articleState.fontSizeOption.value);
		root.style.setProperty('--font-color', articleState.fontColor.value);
		root.style.setProperty('--bg-color', articleState.backgroundColor.value);
		root.style.setProperty(
			'--container-width',
			articleState.contentWidth.value
		);
	}, [articleState]);

	const handleApply = (newState: ArticleStateType) => {
		setArticleState(newState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<Article />
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onApply={handleApply}
				onReset={handleReset}
				onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
		</>
	);
};
