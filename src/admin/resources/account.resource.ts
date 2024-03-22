import { PrismaClient, role } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import bcrypt from "bcrypt";
import { isRoleAccessible } from "../../utils/roles.js";
import { Context } from "../../types.js";

const prisma = new PrismaClient();

const accountResource = {
  resource: { model: getModelByName("account"), client: prisma },
  options: {
    navigation: null,

    properties: {
      password: {
        isVisible: {
          list: false,
          show: false,
          edit: true,
          filter: false,
          create: true,
        },
      },
      id: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      },
    },
    actions: {
      list: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
      },

      search: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
      },

      new: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
        before: async (request: any) => {
          if (request.payload.password) {
            request.payload.password = await bcrypt.hash(
              request.payload.password,
              10
            );
          }
          return request;
        },
      },

      show: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN, role.COORDINATOR]),
      },

      edit: {
        isAccessible: (context: Context) =>
          isRoleAccessible(context, [role.ADMIN]),
        before: async (request: any) => {
          if (request.payload.password) {
            request.payload.password = await bcrypt.hash(
              request.payload.password,
              10
            );
          }
          return request;
        },
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

export { accountResource as AccountResource };
