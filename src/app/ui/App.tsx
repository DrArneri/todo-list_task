import { AddTaskBar } from "../../widgets/AddTaskBar"
import { TaskList } from "../../widgets/TaskList"

const App = () => {
  return (
    <div className="bg-gray-300 w-screen min-h-screen flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="min-h-[40vh] w-full sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-1/2 2xl:w-[40%] max-w-[900px] bg-white rounded-xl py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8 flex flex-col items-center gap-6 sm:gap-8">
        <div className="w-full">
          <div className="text-center pb-2 sm:pb-3">
            <h1 className="font-inter font-bold text-xl sm:text-2xl lg:text-3xl">To Do List</h1>
          </div>
          <div className="flex flex-col w-full gap-4">
          <AddTaskBar/>
          </div>
        </div>
        <div className="w-full">
        <TaskList/>
        </div>
      </div>
    </div>
  )
}

export default App
