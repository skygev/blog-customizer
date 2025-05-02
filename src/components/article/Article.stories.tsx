import { Article } from './Article';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Article> = {
	title: 'Components/Article',
	component: Article,
};

export default meta;
type Story = StoryObj<typeof Article>;

export const Default: Story = {};
