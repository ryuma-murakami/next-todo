import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getActiveTasks, getTrashedTasks } from './queries';
import prisma from './prisma';

vi.mock('./prisma', () => ({
  default: {
    tasks: {
      findMany: vi.fn(),
    },
  },
}));

describe('queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getActiveTasks', async () => {
    await getActiveTasks();

    expect(prisma.tasks.findMany).toHaveBeenCalledWith({
      where: {
        status: {
          not: 'trashed',
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

  it('getTrashedTasks', async () => {
    await getTrashedTasks();

    expect(prisma.tasks.findMany).toHaveBeenCalledWith({
      where: {
        status: 'trashed',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  });
});
