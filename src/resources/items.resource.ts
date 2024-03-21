import { role } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { isRoleAccessible } from "../utils/roles.js";
import { RequestContext } from "../types.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const itemsResource = {
  resource: { model: getModelByName("item"), client: prisma },
  options: {
    navigation: null,
    parent: {
      name: "item_group",
      field: "itemGroupId",
      displayField: "GroupName",
    },
    properties: {
      id: {
        isVisible: { list: false, show: false, edit: false, filter: true },
      },
      photo: {
        isVisible: { list: true, show: true, edit: true, filter: false },
      },
    },

    actions: {
      new: {
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

export { itemsResource };
