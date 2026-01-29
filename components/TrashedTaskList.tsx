import { getTrashedTasks } from '@/lib/queries';
import { Trash2 } from 'lucide-react';
import { TrashedTaskItem } from './TrashedTaskItem';
import { removeAllTrashedTasks } from '@/app/actions';

export async function TrashedTaskList() {
  const trashedTaskList = await getTrashedTasks();

  return (
    <>
      <form
        action={removeAllTrashedTasks}
        className="sticky top-0 flex justify-end bg-slate-100 px-10 py-5"
      >
        <button
          type="submit"
          className="flex items-center gap-1 rounded-md p-2 text-sm text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed"
          disabled={trashedTaskList.length === 0}
        >
          <Trash2 className="size-5" />
          ゴミ箱を空にする
        </button>
      </form>
      <div className="space-y-3 px-10 pb-10">
        {trashedTaskList.length === 0 && (
          <p className="text-center text-sm">ゴミ箱にタスクはありません</p>
        )}
        {trashedTaskList.map(task => (
          <TrashedTaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
