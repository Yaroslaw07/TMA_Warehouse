import { getModelByName } from "@adminjs/prisma";
import { db } from "../utils/db.js";
import { RequestContext } from "../types.js";
import { isRoleAccessible } from "../utils/roles.js";
import { role } from "@prisma/client";

const itemGroupResource = {
  resource: { model: getModelByName("item_group"), client: db },
  options: {
    navigation: null,
    properties: {
      id: {
        isVisible: { list: false, show: false, edit: false, filter: true },
      },
    },
    actions: {
      list: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      search: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      new: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },

      show: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      edit: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      delete: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },

      bulkDelete: {
        isAccessible: (context: RequestContext) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
    },
  },
};

export { itemGroupResource };
