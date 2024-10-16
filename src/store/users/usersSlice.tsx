import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoEntity, Users } from "../../entities/TodoEntity";
import { createSlice } from "@reduxjs/toolkit";

export interface UsersState {
  users: Users[];
}

const initialState: UsersState = {
  users: [],
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<Users>) => {
      state.users = [...state.users, action.payload];
    },
    editPoints: (
      state,
      action: PayloadAction<Pick<Users, "id" | "points">>
    ) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id
          ? {
              ...user,
              points: action.payload.points,
            }
          : user
      );
    },
  },
});

export const { addUsers, editPoints } = usersSlice.actions;

export default usersSlice.reducer;
