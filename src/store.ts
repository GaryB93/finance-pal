import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
})

export const setupStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>