import { combineReducers } from '@reduxjs/toolkit';
export const rootReducer = combineReducers({
  rootReducer: {},
});
export type RootState = ReturnType<typeof rootReducer>;
