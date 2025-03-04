import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todosSlice";
import usersReducer from "./users/usersSlice";
export const store = configureStore({
  reducer: {
    todosSlice: todosReducer,
    usersSlice: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
