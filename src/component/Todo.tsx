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
            <>
              <section className="flex items-center justify-between pr-16 pl-1">
                <div
                  key={task}
                  id="index"
                  className="flex items-center gap-2 pb-5 group"
                >
                  <input
                    type="checkbox"
                    name="task-checkbox"
                    id={task}
                    disabled={isDone}
                    className="peer group-has-[.two:checked]:self-start"
                    onChange={(e) => {
                      e.currentTarget.checked = !isDone;

                      const { getUncheckedTodos, getCheckedTodos } =
                        filterTodos(tasks, e.currentTarget.id);

                      setTodos([...getUncheckedTodos, ...getCheckedTodos]);
                    }}
                  />
                  <label
                    htmlFor={task}
                    className="text-xl first-letter:uppercase line-clamp-1 text-gray-500 peer-disabled:line-through max-inline-48 break-all group-has-[.two:checked]:line-clamp-none"
                  >
                    {task}
                  </label>
                  <input
                    type="checkbox"
                    name="readmore"
                    className="two appearance-none after:content-['expand'] after:underline after:cursor-pointer checked:after:content-['collapse'] checked:self-end"
                  />
                </div>

                <button
                  id={task}
                  onClick={deleteCompletedTodo}
                  className="cursor-pointer bg-red-400 text-white rounded-full px-3 py-2 transition-colors duration-300 hover:bg-red-300"
                >
                  🗑️
                </button>
              </section>
            </>
          );
        })
      ) : (
        <p className="big-one">No Task(s) yet</p>
      )}
    </>
  );
}

export default Todo;
