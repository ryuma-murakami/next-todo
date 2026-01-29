import { ReactNode } from 'react';
import type { Status } from '@prisma/client';

export type Task = {
  id: string;
  title: string;
  status: Status;
};

export type LayoutProps = {
  children: ReactNode;
};

export type TaskItemProps = {
  task: Task;
};

export type TrashedTaskItemProps = {
  task: Task;
};
