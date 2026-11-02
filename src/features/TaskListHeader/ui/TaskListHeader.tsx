import { Button } from "../../../shared/ui/Button";
import { TaskFilters, type FilterType } from "../../TaskFilters";

type Props = {
  totalCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onDeleteAll: () => void;
};

const TaskListHeader = ({
  totalCount,
  filter,
  onFilterChange,
  onDeleteAll,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between sm:items-center">
      <h1 className="font-inter text-base sm:text-lg lg:text-xl font-semibold">
        Total Tasks: {totalCount}
      </h1>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
        <TaskFilters filter={filter} onFilterChange={onFilterChange} />
        <Button
          buttonText="Delete All"
          onClick={onDeleteAll}
          className="sm:min-w-[100px]"
        />
      </div>
    </div>
  );
};

export default TaskListHeader;
