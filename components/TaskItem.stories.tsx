import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TaskItem } from './TaskItem';

const meta = {
  title: 'Components/TaskItem',
  component: TaskItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TaskItem>;

export default meta;

type Story = StoryObj<typeof TaskItem>;

export const NotStarted: Story = {
  args: {
    task: {
      id: '1',
      title: 'Incomplete Task',
      status: 'notStarted',
    },
  },
};

export const Completed: Story = {
  args: {
    task: {
      id: '2',
      title: 'Completed Task',
      status: 'completed',
    },
  },
};
