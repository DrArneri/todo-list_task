import { Input } from "../../../shared/ui/Input";
import { useTask } from "../../../store/TaskStore";

interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
}

const Task = ({ title, completed, id }: TaskProps) => {
  const { deleteTask, toggleComplete } = useTask();

  return (
    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <Input
        type="checkbox"
        className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-gray-300 cursor-pointer accent-gray-500 flex-shrink-0"
        checked={completed}
        onChange={() => toggleComplete(id)}
      />

      <span
        className={`flex-1 text-sm sm:text-base break-words ${completed ? "line-through text-gray-400" : "text-gray-800"}`}
      >
        {title}
      </span>

      <button
        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
        aria-label="Удалить задачу"
        onClick={() => deleteTask(id)}
      >
        <img src="/X.svg" alt="Delete" className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

export default Task;
