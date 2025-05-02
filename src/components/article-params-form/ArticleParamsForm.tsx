import { FC } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	state: ArticleStateType;
	isOpen: boolean;
	onChange: (newState: ArticleStateType) => void;
	onApply: () => void;
	onReset: () => void;
	onToggle: () => void;
};

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	state,
	isOpen,
	onChange,
	onApply,
	onReset,
	onToggle,
}) => {
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply();
					}}
					onReset={(e) => {
						e.preventDefault();
						onReset();
					}}>
					<h2 className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

					<div className={styles.formControl}>
						<label className={styles.label}>Шрифт</label>
						<Select
							options={fontFamilyOptions}
							selected={state.fontFamilyOption}
							onChange={(val) => onChange({ ...state, fontFamilyOption: val })}
						/>
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Размер шрифта</label>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={state.fontSizeOption}
							onChange={(val) => onChange({ ...state, fontSizeOption: val })}
						/>
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Цвет текста</label>
						<Select
							options={fontColors}
							selected={state.fontColor}
							onChange={(val) => onChange({ ...state, fontColor: val })}
						/>
					</div>

					<div className={styles.formControl}>
						<Separator />
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Цвет фона</label>
						<Select
							options={backgroundColors}
							selected={state.backgroundColor}
							onChange={(val) => onChange({ ...state, backgroundColor: val })}
						/>
					</div>

					<div className={styles.formControl}>
						<label className={styles.label}>Ширина статьи</label>
						<Select
							options={contentWidthArr}
							selected={state.contentWidth}
							onChange={(val) => onChange({ ...state, contentWidth: val })}
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
