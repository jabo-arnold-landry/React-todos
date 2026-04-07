import { useActionState, useState } from "react";
import Todo from "./component/Todo";
import { type TodoStructure } from "./assets/types";

function App() {
  const [todos, setTodos] = useState<TodoStructure[]>([]);
  const [_, actionToTrigger, isPending] = useActionState(addTodo, null);

  function addTodo(_: unknown, formData: FormData): unknown {
    const task = formData.get("task") as string;

    const isTaskExists = todos.find((todo) => todo.task === task);

    if (!task) {
      return alert("can not set empty todo please add one");
    }

    if (isTaskExists?.task) {
      return alert("The task already exists please try another task");
    }

    const obj = { isDone: false, task };
    setTodos((prev) => [...prev, obj]);
  }

  return (
    <>
      <h1 className="big-one">todos</h1>
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
        <Todo tasks={todos} setTodos={setTodos} />
      </main>
    </>
  );
}

export default App;
