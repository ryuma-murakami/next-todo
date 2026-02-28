import {
  createTask,
  deleteAllTrashedTasks,
  deleteTaskById,
  updateTask,
} from '@/lib/commands';
import { revalidatePath } from 'next/cache';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  addTask,
  editTask,
  removeAllTrashedTasks,
  removeTaskById,
  restoreTaskById,
  toggleTaskStatus,
  trashTask,
} from './actions';
import { Status } from '@prisma/client';

vi.mock('@/lib/commands', () => ({
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTaskById: vi.fn(),
  deleteAllTrashedTasks: vi.fn(),
}));

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

function createFormData(fields: Record<string, string>) {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

  return formData;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('addTask', () => {
  it('creates a task when title is valid', async () => {
    const formData = createFormData({ title: 'Test Task' });
    await addTask(formData);

    expect(createTask).toHaveBeenCalledWith('Test Task');
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });
});

describe('toggleTaskStatus', () => {
  it('toggles status from notStarted to completed', async () => {
    const formData = createFormData({ id: '1', status: Status.notStarted });
    await toggleTaskStatus(formData);

    expect(updateTask).toHaveBeenCalledWith('1', { status: Status.completed });
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });
});

describe('editTask', () => {
  it('updates title when value is valid', async () => {
    const formData = createFormData({ id: '1', title: 'Updated Task' });
    await editTask(formData);

    expect(updateTask).toHaveBeenCalledWith('1', { title: 'Updated Task' });
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });
});

describe('trashTask', () => {
  it('moves the task to trash', async () => {
    const formData = createFormData({ id: '1' });
    await trashTask(formData);

    expect(updateTask).toHaveBeenCalledWith('1', { status: Status.trashed });
    expect(revalidatePath).toHaveBeenCalledWith('/');
  });
});

describe('restoreTaskById', () => {
  it('restores the trashed task', async () => {
    const formData = createFormData({ id: '1' });
    await restoreTaskById(formData);

    expect(updateTask).toHaveBeenCalledWith('1', { status: Status.notStarted });
    expect(revalidatePath).toHaveBeenCalledWith('/trash');
  });
});

describe('removeTaskById', () => {
  it('removes the trashed task', async () => {
    const formData = createFormData({ id: '1' });
    await removeTaskById(formData);

    expect(deleteTaskById).toHaveBeenCalledWith('1');
    expect(revalidatePath).toHaveBeenCalledWith('/trash');
  });
});

describe('removeAllTrashedTasks', () => {
  it('removes all trashed tasks', async () => {
    await removeAllTrashedTasks();

    expect(deleteAllTrashedTasks).toHaveBeenCalled();
    expect(revalidatePath).toHaveBeenCalledWith('/trash');
  });
});
