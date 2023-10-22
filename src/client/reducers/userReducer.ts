import { createReducer, createAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string;
  username: string;
  loggedIn: boolean;
  created: Date;
}

const initialState: UserState = {
  userId: '',
  username: '',
  loggedIn: false,
  created: new Date,
}

interface UserAction {
  userId: string;
  username: string;
  loggedIn?: boolean;
  created: Date;
}

export const login = createAction<UserAction>('user/login');
export const logout = createAction<UserAction>('user/logout');
export const verifyUser = createAction<UserAction>('user/hasAccount');

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.created = action.payload.created;
      state.loggedIn = true;
    })
    .addCase(logout, (state) => {
      state.userId = '';
      state.username = '';
      state.loggedIn = false;
    })
    .addCase(verifyUser, (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    })
});

export default usersReducer;