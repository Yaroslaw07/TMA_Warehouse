import { getModelByName } from "@adminjs/prisma";
import { db } from "../../db.js";
import { isRoleAccessible } from "../../utils/roles.js";
import { role } from "@prisma/client";
import { Context } from "../../types.js";

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
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      search: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      new: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },

      show: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      edit: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
      delete: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },

      bulkDelete: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
      },
    },
  },
};

export { itemGroupResource };
