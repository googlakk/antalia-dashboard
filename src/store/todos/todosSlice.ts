import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoEntity, Users } from "../../entities/TodoEntity";
import { createSlice } from "@reduxjs/toolkit";

export interface TodosState {
  todos: TodoEntity[];
}



const initialState: TodosState = {
  todos: [],
};


export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {

    addTodo: (state, action: PayloadAction<TodoEntity>) => {
      state.todos = [...state.todos, action.payload];
    },
    removeToDo: (state, action: PayloadAction<TodoEntity["id"]>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editToDo: (
      state,
      action: PayloadAction<Pick<TodoEntity, "id" | "title">>
    ) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
            }
          : todo
      );
    },
    changeIsDone: (state, action: PayloadAction<TodoEntity["id"]>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              isDone: !todo.isDone,
            }
          : todo
      );
    },
    sortTodos: (state, action: PayloadAction) => {
      state.todos.sort((a, b) => {
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
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, removeToDo, changeIsDone, sortTodos, editToDo } =
  todosSlice.actions;

export default todosSlice.reducer;
