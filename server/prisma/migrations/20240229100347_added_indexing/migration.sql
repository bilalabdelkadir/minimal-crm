-- CreateIndex
CREATE INDEX "permissions_moduleName_workspace_id_idx" ON "permissions"("moduleName", "workspace_id");

-- CreateIndex
CREATE INDEX "roles_role_name_workspace_id_idx" ON "roles"("role_name", "workspace_id");

-- CreateIndex
CREATE INDEX "workspaces_name_idx" ON "workspaces"("name");
