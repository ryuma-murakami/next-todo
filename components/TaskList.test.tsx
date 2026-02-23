import { getActiveTasks } from '@/lib/queries';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TaskList } from './TaskList';
import { Status } from '@prisma/client';

vi.mock('@/lib/queries', () => ({
  getActiveTasks: vi.fn(),
}));

describe('TaskList', () => {
  it('renders empty message when there are no tasks', async () => {
    vi.mocked(getActiveTasks).mockResolvedValue([]);

    render(await TaskList());

    const text = screen.getByText('タスクがありません');
    expect(text).toBeInTheDocument();
  });

  it('renders task items when tasks exist', async () => {
    vi.mocked(getActiveTasks).mockResolvedValue([
      {
        id: '1',
        title: 'Test Task',
        status: Status.notStarted,
      },
    ]);

    render(await TaskList());

    const title = screen.getByDisplayValue('Test Task');
    expect(title).toBeInTheDocument();
  });
});
