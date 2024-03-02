import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import workspacesSlice from "./workspaces.slice";
export const rootReducer = combineReducers({
  auth: authSlice,
  workspaceInfo: workspacesSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
