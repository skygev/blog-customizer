import { FC, useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	isOpen: boolean;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
	onToggle: () => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	isOpen,
	onApply,
	onReset,
	onToggle,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen, onToggle]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={containerRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase
						family='open-sans'
						className={styles.title}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<div className={styles.formControl}>
						<label className={styles.label}>Шрифт</label>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(val) =>
								setFormState({ ...formState, fontFamilyOption: val })
							}
						/>
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Размер шрифта</label>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(val) =>
								setFormState({ ...formState, fontSizeOption: val })
							}
						/>
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Цвет текста</label>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={(val) => setFormState({ ...formState, fontColor: val })}
						/>
					</div>

					<div className={styles.formControl}>
						<Separator />
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Цвет фона</label>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(val) =>
								setFormState({ ...formState, backgroundColor: val })
							}
						/>
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Ширина статьи</label>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(val) =>
								setFormState({ ...formState, contentWidth: val })
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
