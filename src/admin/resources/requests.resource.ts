import { role } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { isRoleAccessible } from "../../utils/roles.js";
import { db } from "../../db.js";
import { Context } from "../../types.js";
import { Request } from "express";

const beforeResourceActionCurrentUser = (
  request: Request,
  context: Context
) => {
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

          return beforeResourceActionCurrentUser(request, context);
        },
      },

      search: {
        before(request: Request, context: Context) {
          if (isRoleAccessible(context, [role.ADMIN, role.COORDINATOR])) {
            return request;
          }

          return beforeResourceActionCurrentUser(request, context);
        },
      },

      new: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.EMPLOYEE]),
        isVisible: false,
      },
    },
  },
};

export { requestResource };
