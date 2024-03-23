import { role } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { isRoleAccessible } from "../../utils/roles.js";
import { db } from "../../db.js";
import { Context } from "../../types.js";
import { Request } from "express";

const beforeEmployeeFilter = (request: Request, context: Context) => {
  const { query = {} } = request;
  const { currentAdmin } = context;

  const id = currentAdmin.id.toString();

  const newQuery = {
    ...query,
    ["filters.account"]: id,
  };

  request.query = newQuery;

  return request;
};

const requestResource = {
  resource: { model: getModelByName("request"), client: db },
  options: {
    parent: {
      icon: "Request",
    },
    navigation: null,
    properties: {
      id: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      },
    },

    actions: {
      list: {
        before(request: Request, context: Context) {
          if (isRoleAccessible(context, [role.ADMIN, role.COORDINATOR])) {
            return request;
          }

          return beforeEmployeeFilter(request, context);
        },
      },

      search: {
        before(request: Request, context: Context) {
          if (isRoleAccessible(context, [role.ADMIN, role.COORDINATOR])) {
            return request;
          }

          return beforeEmployeeFilter(request, context);
        },
      },

      new: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.EMPLOYEE]),
        isVisible: false,

        before: (request: any, context: Context) => {
          const { currentAdmin } = context;

          request.payload.account = { connect: { id: currentAdmin.id } };
          request.payload.item = { connect: { id: request.payload.itemId } };

          delete request.payload.itemId;

          return request;
        },

        // prisma adapter does not support nested create
        // so we have to create custom handler
        async handler(request: any, response: any, context: any) {
          const result = await db.request.create({ data: request.payload });

          if (result) {
            return { record: result };
          } else {
            return response.badRequest({ record: result });
          }
        },
      },

      show: {
        before: (request: Request, context: Context) => {
          if (isRoleAccessible(context, [role.ADMIN, role.COORDINATOR])) {
            return request;
          }

          const { currentAdmin } = context;
          return beforeEmployeeFilter(request, context);
        },
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [
            role.ADMIN,
            role.COORDINATOR,
            role.EMPLOYEE,
          ]),
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
    },
  },
};

export { requestResource };
