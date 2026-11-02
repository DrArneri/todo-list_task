import { Button } from "../../../shared/ui/Button"

export type FilterType = 'all' | 'active' | 'completed'

type Props = {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const TaskFilters = ({ filter, onFilterChange }: Props) => {
  return (
   <div className="flex gap-1 bg-gray-200 p-1 rounded-xl w-full sm:w-auto">
          <Button
            buttonText="Все"
            onClick={() => onFilterChange('all')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm border-0 rounded-lg transition ${
              filter === 'all'
                ? 'bg-white shadow-sm text-black'
                : 'bg-transparent text-gray-600 hover:text-black hover:bg-white/50'
            }`}
          />
          <Button
            buttonText="Активные"
            onClick={() => onFilterChange('active')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm border-0 rounded-lg transition ${
              filter === 'active'
                ? 'bg-white shadow-sm text-black'
                : 'bg-transparent text-gray-600 hover:text-black hover:bg-white/50'
            }`}
          />
          <Button
            buttonText="Сделанные"
            onClick={() => onFilterChange('completed')}
            className={`flex-1 sm:flex-none px-2 sm:px-3 py-1.5 sm:py-1 text-xs sm:text-sm border-0 rounded-lg transition ${
              filter === 'completed'
                ? 'bg-white shadow-sm text-black'
                : 'bg-transparent text-gray-600 hover:text-black hover:bg-white/50'
            }`}
          />
    </div>
  )
}

export default TaskFilters
