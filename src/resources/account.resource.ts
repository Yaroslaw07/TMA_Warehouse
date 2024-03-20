import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { navigation } from "../navigation.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const accountResource = {
  resource: { model: getModelByName("account"), client: prisma },
  options: {
    navigation: navigation,
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
      new: {
        before: async (request: any) => {
          if (request.payload.password) {
            request.payload.password = await bcrypt.hash(
              request.payload.password,
              10
            );
          }
          console.log(request.payload);
          return request;
        },
      },
    },
  },
};

export { accountResource as AccountResource };
