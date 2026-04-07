import type { Dispatch, SetStateAction } from "react";
import type { TodoStructure } from "../assets/types";
interface PropType {
  tasks: TodoStructure[];
  setTodos: Dispatch<SetStateAction<TodoStructure[]>>;
}

function Todo({ tasks, setTodos }: PropType) {
  console.log(tasks);
  return (
    <>
      {tasks.length !== 0 ? (
        tasks.map((todo, index) => {
          const { task, isDone } = todo;
          return (
            <div key={index} id="index" className="input-group">
              <label htmlFor={task}>{task}</label>
              <input type="checkbox" name="task-checkbox" id={task} />
            </div>
          );
        })
      ) : (
        <p>No Tasks yet</p>
      )}
    </>
  );
}

export default Todo;
