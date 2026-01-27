'use client';

import { addTask } from '@/app/actions';
import { Plus } from 'lucide-react';

export function CreateTaskForm() {
  return (
    <form className="flex gap-0.5" action={addTask}>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="新しいタスクを入力してください"
        className="grow rounded border border-gray-300 p-2 bg-white"
      />
      <button
        type="submit"
        className="rounded-e bg-blue-600 p-2 transition-colors hover:bg-blue-800"
        aria-label="タスクを作成する"
      >
        <Plus className="text-white" />
      </button>
    </form>
  );
}
