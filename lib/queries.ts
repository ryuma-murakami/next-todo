import { Status } from '@prisma/client';
import prisma from './prisma';
import type { Task } from './type';

export function getActiveTasks(): Promise<Task[]> {
  return prisma.tasks.findMany({
    where: {
      status: {
        not: Status.trashed,
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
      status: Status.trashed,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
