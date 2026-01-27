import { removeTaskById, restoreTaskById } from '@/app/actions';
import { TrashedTaskItemProps } from '@/lib/type';
import { ArchiveRestore, Trash2 } from 'lucide-react';

export function TrashedTaskItem({ task }: TrashedTaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded bg-slate-200 px-4 py-2">
      <p>{task.title}</p>
      <div className="flex items-center gap-2">
        <form action={restoreTaskById}>
          <input type="hidden" id="id" name="id" value={task.id} />
          <button
            type="submit"
            className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
            aria-label={`タスク「${task.title}」をゴミ箱から復元する`}
          >
            <ArchiveRestore className="size-5 text-gray-500" />
          </button>
        </form>
        <form action={removeTaskById}>
          <input type="hidden" id="id" name="id" value={task.id} />
          <button
            type="submit"
            className="rounded bg-gray-200 p-2 transition-colors hover:bg-gray-300"
            aria-label={`タスク「${task.title}」を完全に削除する`}
          >
            <Trash2 className="size-5 text-gray-500" />
          </button>
        </form>
      </div>
    </div>
  );
}
