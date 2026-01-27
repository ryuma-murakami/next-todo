'use server';

import {
  createTask,
  deleteAllTrashedTasks,
  deleteTaskById,
  updateTask,
} from '@/lib/commands';
import { revalidatePath } from 'next/cache';

export async function addTask(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title.trim()) {
    return;
  }
  await createTask(title.trim());

  revalidatePath('/');
}

export async function toggleTaskStatus(formData: FormData) {
  const status = formData.get('status') as string;
  await updateTask(formData.get('id') as string, {
    status: status === 'notStarted' ? 'completed' : 'notStarted',
  });

  revalidatePath('/');
}

export async function editTask(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title.trim()) {
    return;
  }
  await updateTask(formData.get('id') as string, {
    title: title.trim(),
  });

  revalidatePath('/');
}

export async function trashTask(formData: FormData) {
  await updateTask(formData.get('id') as string, {
    status: 'trashed',
  });

  revalidatePath('/');
}

export async function restoreTaskById(formData: FormData) {
  await updateTask(formData.get('id') as string, { status: 'notStarted' });

  revalidatePath('/trash');
}

export async function removeTaskById(formData: FormData) {
  await deleteTaskById(formData.get('id') as string);

  revalidatePath('/trash');
}

export async function removeAllTrashedTasks() {
  await deleteAllTrashedTasks();

  revalidatePath('/trash');
}
