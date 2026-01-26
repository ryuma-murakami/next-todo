import prisma from './prisma';
import type { Task } from './type';

export function createTask(title: string): Promise<Task> {
  return prisma.tasks.create({
    data: { title },
  });
}

export function updateTask(
  id: string,
  update: { title?: string; status?: string },
) {
  return prisma.tasks.update({
    where: { id },
    data: update,
  });
}

export function deleteTaskById(id: string): Promise<Task> {
  return prisma.tasks.delete({
    where: { id },
  });
}

export function deleteAllTrashedTasks(): Promise<{ count: number }> {
  return prisma.tasks.deleteMany({
    where: {
      status: 'trashed',
    },
  });
}
