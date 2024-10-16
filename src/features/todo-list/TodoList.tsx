import { FC, useMemo, useState } from "react";
import { RootState } from "../../store";
import { TodoEntity } from "../../entities/TodoEntity";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import todosSlice, { changeIsDone, editToDo, sortTodos } from "../../store/todos/todosSlice";
import { removeToDo } from "../../store/todos/todosSlice";
import TextField from "../../components/TextField";
import ToDoItem from "../todoItem/ToDoItem";


export const TodoList: FC = () => {

  const todos = useSelector<RootState, TodoEntity[]>(
    (state) => state.todosSlice.todos
  );
  
  const memoTodos = useMemo(() => {
    const sortedTosdos = [...todos].sort((a, b) => {
      if (a.isDone === b.isDone) {
        return 0;
      }
      if (a.isDone && !b.isDone) {
        return 1;
      }
      if (!a.isDone && b.isDone) {
        return -1;
      }
      return 0;
    })
    return sortedTosdos
  }, [todos])

  return (
    <ul className="flex flex-col items-center">
      {memoTodos.map((todo) => (
        <>
            <ToDoItem todo={todo}/>
        </>
      ))}
    </ul>
  );
};
