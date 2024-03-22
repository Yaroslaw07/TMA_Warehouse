import { role } from "@prisma/client";
import { Context } from "../types.js";

const isRoleAccessible = (context: Context, roles: role[]) => {
  return roles.includes(context.currentAdmin.role);
};

export { isRoleAccessible };
