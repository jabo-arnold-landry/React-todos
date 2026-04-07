import type { Dispatch, SetStateAction } from "react";
import type { TodoStructure } from "../assets/types";
interface PropType {
  tasks: TodoStructure[];
  setTodos: Dispatch<SetStateAction<TodoStructure[]>>;
}

function Todo({ tasks, setTodos }: PropType) {
  return (
    <>
      {tasks.length !== 0 ? (
        tasks.map((todo) => {
          const { task, isDone } = todo;

          return (
            <div key={task} id="index" className="input-group">
              <label
                htmlFor={task}
                className={isDone ? "text-gray-400 line-through" : "big-one"}
              >
                {task}
              </label>
              <input
                type="checkbox"
                name="task-checkbox"
                id={task}
                disabled={isDone}
                onChange={(e) => {
                  e.currentTarget.checked = !isDone;

                  const checkedTodo = tasks.find(
                    (task) => task.task === e.currentTarget.id,
                  ) as TodoStructure;

                  checkedTodo.isDone = !checkedTodo.isDone;
                  const getUncheckedTodos = tasks.filter(
                    (task) => task.task !== checkedTodo.task,
                  );

                  const getCheckedTodos = tasks.filter(
                    (task) => task.task === checkedTodo.task,
                  );

                  setTodos([...getUncheckedTodos, ...getCheckedTodos]);
                }}
              />
            </div>
          );
        })
      ) : (
        <p className="big-one">No Tasks yet</p>
      )}
    </>
  );
}

export default Todo;
