import type { Dispatch, SetStateAction } from "react";
import type { TodoStructure } from "../assets/types";
import type React from "react";
import filterTodos from "../utils/CheckedTodosFiltering";
interface PropType {
  tasks: TodoStructure[];
  setTodos: Dispatch<SetStateAction<TodoStructure[]>>;
}

function Todo({ tasks, setTodos }: PropType) {
  function deleteCompletedTodo(e: React.MouseEvent<HTMLButtonElement>) {
    const { getUncheckedTodos } = filterTodos(tasks, e.currentTarget.id);
    setTodos([...getUncheckedTodos]);
  }

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

                  const { getUncheckedTodos, getCheckedTodos } = filterTodos(
                    tasks,
                    e.currentTarget.id,
                  );

                  setTodos([...getUncheckedTodos, ...getCheckedTodos]);
                }}
              />
              <button id={task} onClick={deleteCompletedTodo}>
                delete
              </button>
            </div>
          );
        })
      ) : (
        <p className="big-one">No Task(s) yet</p>
      )}
    </>
  );
}

export default Todo;
