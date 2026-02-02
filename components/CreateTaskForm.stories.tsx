import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CreateTaskForm } from './CreateTaskForm';

const meta = {
  title: 'Components/CreateTaskForm',
  component: CreateTaskForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateTaskForm>;

export default meta;

type Story = StoryObj<typeof CreateTaskForm>;

export const Index: Story = {};
