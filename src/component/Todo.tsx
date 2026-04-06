import type { TodoStructure } from "../assets/types";

function Todo({ task }: TodoStructure) {
  return (
    <>
      <label htmlFor={task}>{task}</label>
      <input type="checkbox" name="task-checkbox" id={task} />
    </>
  );
}

export default Todo;
