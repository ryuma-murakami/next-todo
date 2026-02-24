import { getTrashedTasks } from '@/lib/queries';
import { describe, expect, it, vi } from 'vitest';
import { TrashedTaskList } from './TrashedTaskList';
import { render, screen } from '@testing-library/react';
import { Status } from '@prisma/client';

vi.mock('@/lib/queries', () => ({
  getTrashedTasks: vi.fn(),
}));

describe('TrashedTaskList', () => {
  it('renders empty message when there are no trashed tasks', async () => {
    vi.mocked(getTrashedTasks).mockResolvedValue([]);

    render(await TrashedTaskList());

    const text = screen.getByText('ゴミ箱にタスクはありません');
    expect(text).toBeInTheDocument();
  });

  it('renders trashed task items when trashed tasks exist', async () => {
    vi.mocked(getTrashedTasks).mockResolvedValue([
      {
        id: '1',
        title: 'Trashed Task',
        status: Status.trashed,
      },
    ]);

    render(await TrashedTaskList());

    const title = screen.getByText('Trashed Task');
    expect(title).toBeInTheDocument();
  });
});
