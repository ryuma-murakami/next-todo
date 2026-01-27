import { getActiveTasks } from '@/lib/queries';
import { CreateTaskForm } from './CreateTaskForm';
import { TaskItem } from './TaskItem';

export async function TaskList() {
  const activeTaskList = await getActiveTasks();

  return (
    <>
      <div className="sticky top-0 bg-slate-100 px-10 py-5">
        <CreateTaskForm />
      </div>
      <div className="space-y-3 px-10 pb-10">
        {activeTaskList.length === 0 ? (
          <p className="text-center text-sm">タスクがありません</p>
        ) : (
          activeTaskList.map(task => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </>
  );
}
