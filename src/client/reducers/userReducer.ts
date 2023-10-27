import { createReducer, createAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string;
  username: string;
  loggedIn: boolean;
  created: string;
}

const initialState: UserState = {
  userId: '',
  username: '',
  loggedIn: false,
  created: '',
}

interface UserAction {
  userId: string;
  username: string;
  loggedIn?: boolean;
  created?: string;
}

export const login = createAction<UserAction>('user/login');
export const logout = createAction<UserAction>('user/logout');
export const verifiedUser = createAction<UserAction>('user/hasAccount');

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.created = action.payload.created!;
      state.loggedIn = true;
    })
    .addCase(logout, (state) => {
      state.userId = '';
      state.username = '';
      state.created = '';
      state.loggedIn = false;
    })
    .addCase(verifiedUser, (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    })
});

export default userReducer;