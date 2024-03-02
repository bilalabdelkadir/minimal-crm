import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IWorkspaceResponse } from "@/types/Workspace.type";

export interface WorkspacesState {
  workspaces?: IWorkspaceResponse[] | null;
  selectedWorkspace?: IWorkspaceResponse | null;
}

const initialState: WorkspacesState = {
  workspaces: null,
  selectedWorkspace: null,
};

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    setWorkspaces: (state, action: PayloadAction<IWorkspaceResponse[]>) => {
      state.workspaces = action.payload;
    },
    setSelectedWorkspace: (
      state,
      action: PayloadAction<IWorkspaceResponse>,
    ) => {
      state.selectedWorkspace = action.payload;
    },
  },
});

export const { setWorkspaces, setSelectedWorkspace } = workspacesSlice.actions;

export default workspacesSlice.reducer;
