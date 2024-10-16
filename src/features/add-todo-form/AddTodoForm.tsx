import { FC, useCallback, useState } from "react";

import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { addTodo, sortTodos } from "../../store/todos/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { TodoEntity } from "../../entities/TodoEntity";
import { RootState } from "../../store";

export const AddTodoForm: FC = () => {
  
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector<RootState, TodoEntity[]>(
    (state) => state.todosSlice.todos
  );
  const handleAddTodo = useCallback(() => {
    dispatch(addTodo({ id:+Date.now(), isDone: false, title: todoText }));
    setTodoText("");
  }, [todoText]);


  return (
    <div className="w-[100%] flex justify-center gap-3">
      <TextField  value={todoText} onChange={(val) => setTodoText(val)} />
      <Button onClick={handleAddTodo}>Add Todo</Button>
    </div>
  );
};
