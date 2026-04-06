import { useActionState, useState } from "react";
import Todo from "./component/Todo";
import { type TodoStructure } from "./assets/types";

function App() {
  const [todos, setTodos] = useState<TodoStructure[]>([]);
  const [_, actionToTrigger, isPending] = useActionState(addTodo, null);

  function addTodo(_: unknown, formData: FormData): unknown {
    const task = formData.get("task") as string;
    if (!task) return alert("can not set empty todo please add one");
    const obj = { isDone: false, task };
    setTodos((prev) => [...prev, obj]);
  }

  return (
    <>
      <form action={actionToTrigger}>
        <input
          type="text"
          name="task"
          id="input"
          placeholder="Add Todo..."
          disabled={isPending}
        />

        <button> +</button>
      </form>

      <main>
        {todos.length !== 0 ? (
          todos.map((task, index) => {
            return (
              <div key={index}>
                <Todo {...task} />
              </div>
            );
          })
        ) : (
          <p>No tasks</p>
        )}
      </main>
    </>
  );
}

export default App;
