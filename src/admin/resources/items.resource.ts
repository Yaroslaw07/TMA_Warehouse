import { role } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { isRoleAccessible } from "../../utils/roles.js";
import { Context } from "../../types.js";
import { db } from "../../db.js";
import { Components } from "../componentLoader.js";

const itemsResource = {
  resource: { model: getModelByName("item"), client: db },
  options: {
    navigation: null,
    parent: {
      name: "item_group",
      field: "itemGroupId",
      displayField: "GroupName",
    },
    properties: {
      id: {
        isVisible: { list: false, show: false, edit: false, filter: false },
      },
      photo: {
        isVisible: { list: true, show: true, edit: true, filter: false },
      },
    },

    actions: {
      new: {
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

      order: {
        icon: "ShoppingCart",
        actionType: "record",
        component: Components.OrderItemForm,
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.EMPLOYEE]),
        handler: (request: any, response: any, context: any) => {
          const { record, currentAdmin } = context;

          return { record: record.toJSON(currentAdmin) };
        },
      },
    },
  },
};

export { itemsResource };
