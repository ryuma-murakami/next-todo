'use client';

import { editTask, toggleTaskStatus, trashTask } from '@/app/actions';
import type { TaskItemProps } from '@/lib/type';
import { Status } from '@prisma/client';
import { Trash2 } from 'lucide-react';

export function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 rounded bg-white px-4 py-2">
      <form action={toggleTaskStatus}>
        <input type="hidden" id="id" name="id" value={task.id} />
        <input type="hidden" id="status" name="status" value={task.status} />
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          defaultChecked={task.status === Status.completed}
          onChange={event => event.currentTarget.form?.requestSubmit()}
        />
      </form>
      <form action={editTask} className="flex-1">
        <input type="hidden" id="id" name="id" value={task.id} />
        <input
          type="text"
          className="w-full border px-2 py-1 border-gray-300 bg-white disabled:text-gray-400 disabled:line-through disabled:cursor-not-allowed"
          defaultValue={task.title}
          disabled={task.status === Status.completed}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing || event.key !== 'Enter') {
              return;
            }
            event.currentTarget.form?.requestSubmit();
          }}
        />
      </form>
      <form action={trashTask}>
        <input type="hidden" id="id" name="id" value={task.id} />
        <button
          type="submit"
          className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
          aria-label={`タスク「${task.title}」をゴミ箱へ移動する`}
        >
          <Trash2 className="size-5 text-gray-500" />
        </button>
      </form>
    </div>
  );
}
