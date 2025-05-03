import type { Meta, StoryObj } from '@storybook/react';
import { ArticleParamsForm } from './ArticleParamsForm';

const meta: Meta<typeof ArticleParamsForm> = {
	title: 'Components/ArticleParamsForm',
	component: ArticleParamsForm,
	decorators: [
		(Story) => (
			<div
				style={{
					position: 'relative',
					width: '100vw',
					height: '100vh',
					padding: '48px',
					backgroundColor: '#ffffff',
					boxSizing: 'border-box',
				}}>
				<Story />
			</div>
		),
	],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof ArticleParamsForm>;

export const Default: Story = {
	args: {
		isOpen: true,
		onApply: () => alert('Применено'),
		onReset: () => alert('Сброшено'),
		onToggle: () => alert('Открытие/Закрытие'),
	},
};
