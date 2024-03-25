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
    listProperties: [
      "id",
      "item_group",
      "unit_of_measurement",
      "quantity",
      "price",
      "status",
      "storage_location",
      "contact_person",
      "photo",
    ],

    actions: {
      new: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
      },

      edit: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
      },

      delete: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
      },

      bulkDelete: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
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
