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
      <section className="grid place-content-center h-screen gap-4">
        <h1 className="font-bold text-6xl tracking-[1rem] opacity-20 text-center mb-4">
          todos
        </h1>

        <form action={actionToTrigger} className="">
          <input
            type="text"
            name="task"
            id="input"
            placeholder="Add Todo..."
            disabled={isPending}
            className="border-none w-130 py-3 px-4 rounded-4xl focus-within:shadow-sm focus-within:shadow-gray-500 outline-none shadow-md shadow-gray-400"
          />
          <button className="relative right-16 text-2xl font-bold text-white bg-green-500/70 text-center pb-1 px-2 rounded-full">
            {" "}
            +
          </button>
        </form>

        <main className="grid gap-4 divide-y divide-black/50">
          <Todo tasks={todos} setTodos={setTodos} />
        </main>
      </section>
    </>
  );
}

export default App;
