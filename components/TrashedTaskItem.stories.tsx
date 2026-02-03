import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TrashedTaskItem } from './TrashedTaskItem';

const meta = {
  title: 'Components/TrashedTaskItem',
  component: TrashedTaskItem,
  tags: ['autodocs'],
} satisfies Meta<typeof TrashedTaskItem>;

export default meta;

type Story = StoryObj<typeof TrashedTaskItem>;

export const Index: Story = {
  args: {
    task: {
      id: '1',
      title: 'Trashed Task',
      status: 'trashed',
    },
  },
};
