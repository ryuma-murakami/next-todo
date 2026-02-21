import type { Task } from '@/lib/type';
import { Status } from '@prisma/client';
import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { TrashedTaskItem } from './TrashedTaskItem';

it('TrashedTaskItem', () => {
  const task: Task = {
    id: '1',
    title: 'Test Task',
    status: Status.trashed,
  };

  render(<TrashedTaskItem task={task} />);

  const title = screen.getByText('Test Task');
  expect(title).toBeInTheDocument();

  const restoreButton = screen.getByRole('button', {
    name: 'タスク「Test Task」をゴミ箱から復元する',
  });
  expect(restoreButton).toBeInTheDocument();

  const removeButton = screen.getByRole('button', {
    name: 'タスク「Test Task」を完全に削除する',
  });
  expect(removeButton).toBeInTheDocument();
});
