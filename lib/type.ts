import { ReactNode } from 'react';

export type Task = {
  id: string;
  title: string;
  status: 'notStarted' | 'completed' | 'trashed';
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
