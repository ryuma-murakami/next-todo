import prisma from './prisma';
import type { Task } from './type';

export function getActiveTasks(): Promise<Task[]> {
  return prisma.tasks.findMany({
    where: {
      status: {
        not: 'trashed',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export function getTrashedTasks(): Promise<Task[]> {
  return prisma.tasks.findMany({
    where: {
      status: 'trashed',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
