import Input from "../../../shared/ui/Input/ui/Input"

type Props = {
  value: string
  onChange: (value: string) => void
}

const TaskSearch = ({ value, onChange }: Props) => {
  return (
    <div className="h-11 sm:h-12 w-full">
            <Input placeholder="Search Task" value={value} onChange={(e) => onChange(e.target.value)}>
              <img src="/Search.svg" alt="Search Task.svg" className="size-4 sm:size-5"/>
            </Input>
    </div>
  )
}

export default TaskSearch