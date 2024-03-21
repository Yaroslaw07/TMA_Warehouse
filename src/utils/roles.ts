import { role } from "@prisma/client";
import { RequestContext } from "../types.js";

const isRoleAccessible = (context: RequestContext, roles: role[]) => {
  return roles.includes(context.currentAdmin.role);
};

export { isRoleAccessible };
