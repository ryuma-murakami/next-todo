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
  onChange: (id: string, update: Partial<Task>) => void;
};

export type CreateTaskFormProps = {
  onSubmit: (title: string) => void;
};

export type TrashedTaskItemProps = {
  task: Task;
  onRestore: (id: string, update: Partial<Task>) => void;
  onDelete: (id: string) => void;
};
