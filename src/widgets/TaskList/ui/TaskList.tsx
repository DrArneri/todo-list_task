import { useMemo, useState } from "react"
import { Task } from "../../../entity/Task"
import { useTask } from "../../../store/TaskStore"
import { type FilterType } from "../../../features/TaskFilters"
import { TaskListHeader } from "../../../features/TaskListHeader"
import { TaskSearch } from "../../../features/TaskSearch"

const TaskList = () => {
  const {tasks, deleteAllTasks} = useTask()
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = useMemo(() => {
    let result = tasks
    switch (filter) {
      case 'active':
        result = result.filter(t => !t.isDone)
        break
      case 'completed':
       result = result.filter(t => t.isDone)
        break
      case 'all':
        break
    }

    if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    result = result.filter(t => t.title.toLowerCase().includes(query))
  }
  
  return result
}, [tasks, filter, searchQuery])

  return (
    <div className="flex flex-col w-full gap-4 sm:gap-5">
     <TaskListHeader
     totalCount={filteredTasks.length}
     filter={filter}
     onFilterChange={setFilter}
     onDeleteAll={
      () => {
        deleteAllTasks()
        setFilter('all')
      }}
      />
      <TaskSearch value={searchQuery} onChange={setSearchQuery}/>
        <ul className="flex flex-col gap-2 sm:gap-3">
          {filteredTasks.map(t => {
            const {title, id, isDone} = t
            return <li key={id}>
              <Task id={id} title={title} completed={isDone}/>
            </li>
          })}
        </ul>
    </div>
  )
}

export default TaskList
