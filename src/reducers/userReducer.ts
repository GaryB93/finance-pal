import { createReducer, createAction } from '@reduxjs/toolkit';

interface UserState {
  userID?: string;
  username?: string;
  loggedIn?: boolean;
}

const initialState: UserState = {
  userID: '',
  username: '',
  loggedIn: false,
}

export const login = createAction<UserState>('user/login');
export const logout = createAction<UserState>('user/logout');
export const verifyUser = createAction<UserState>('user/hasAccount');

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.userID = action.payload.userID;
      state.username = action.payload.username;
      state.loggedIn = true;
    })
    .addCase(logout, (state) => {
      state.userID = '';
      state.username = '';
      state.loggedIn = false;
    })
    .addCase(verifyUser, (state, action) => {
      state.userID = action.payload.userID;
      state.username = action.payload.username;
    })
});

export default usersReducer;