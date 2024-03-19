import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { navigation } from "../navigation.js";

const prisma = new PrismaClient();

const itemGroupResource = {
  resource: { model: getModelByName("item_group"), client: prisma },
  options: {
    navigation: false,
  },
};

const itemsResource = {
  resource: { model: getModelByName("item"), client: prisma },
  options: {
    navigation: navigation,
    parent: {
      name: "item_group",
      field: "itemGroupId",
      displayField: "GroupName",
    },
    properties: {
      id: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      },
      photo: {
        isVisible: { list: false, show: true, edit: true, filter: false },
      },
    },
  },
};

export { itemsResource, itemGroupResource };
