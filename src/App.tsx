import { useEffect, useRef, useState } from 'react';
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
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	// Закрытие при клике вне формы
	useEffect(() => {
		const handleMouseDownOutside = (event: MouseEvent) => {
			if (
				isSidebarOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleMouseDownOutside);
		return () =>
			document.removeEventListener('mousedown', handleMouseDownOutside);
	}, [isSidebarOpen]);

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

	const handleApply = () => {
		setArticleState(formState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<Article />
			<div ref={sidebarRef}>
				<ArticleParamsForm
					state={formState}
					isOpen={isSidebarOpen}
					onChange={setFormState}
					onApply={handleApply}
					onReset={handleReset}
					onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
				/>
			</div>
		</>
	);
};
