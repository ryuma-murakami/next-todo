import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createTask,
  deleteAllTrashedTasks,
  deleteTaskById,
  updateTask,
} from './commands';
import prisma from './prisma';
import { Status } from '@prisma/client';

vi.mock('./prisma', () => ({
  default: {
    tasks: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

describe('commands', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createTask', async () => {
    const title = 'Test Task';
    await createTask(title);

    expect(prisma.tasks.create).toHaveBeenCalledWith({
      data: { title },
    });
  });

  it('updateTask', async () => {
    const id = '1';
    const update = {
      title: 'Updated Task',
      status: Status.completed,
    };
    await updateTask(id, update);

    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id },
      data: update,
    });
  });

  it('deleteTaskById', async () => {
    const id = '1';
    await deleteTaskById(id);

    expect(prisma.tasks.delete).toHaveBeenCalledWith({
      where: { id },
    });
  });

  it('deleteAllTrashedTasks', async () => {
    await deleteAllTrashedTasks();

    expect(prisma.tasks.deleteMany).toHaveBeenCalledWith({
      where: {
        status: 'trashed',
      },
    });
  });
});
