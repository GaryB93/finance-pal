import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import financeReducer from './reducers/financeReducer';

const rootReducer = combineReducers({
  user: userReducer,
  finance: financeReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof setupStore>