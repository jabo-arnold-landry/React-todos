import type { TodoStructure } from "../assets/types";

function filterTodos(todoList: TodoStructure[], todo: string) {
  const checkedTodo = todoList.find(
    (task) => task.task === todo,
  ) as TodoStructure;

  checkedTodo.isDone = !checkedTodo.isDone;

  const getUncheckedTodos = todoList.filter(
    (task) => task.task !== checkedTodo.task,
  );

  const getCheckedTodos = todoList.filter(
    (task) => task.task === checkedTodo.task,
  );
  return { getCheckedTodos, getUncheckedTodos };
}
export default filterTodos;
