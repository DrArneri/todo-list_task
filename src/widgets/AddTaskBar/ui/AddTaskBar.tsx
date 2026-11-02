import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import { useState } from "react";
import { useTask } from "../../../store/TaskStore";
import { nanoid } from "nanoid";
const AddTaskBar = () => {
  const [title, setTitle] = useState<string>("");
  const { addTask } = useTask();

  const handleClick = () => {
    if (title === "" || !title.trim()) {
      return;
    }

    addTask({
      id: nanoid(),
      title,
      isDone: false,
    });
    setTitle("");
  };

  return (
    <div className="h-12 sm:h-14 w-full flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
      <Input
        placeholder="New task title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Button
        type="button"
        variant={"addButton"}
        buttonText="Add"
        onClick={handleClick}
        className="sm:min-w-[80px]"
      />
    </div>
  );
};

export default AddTaskBar;
