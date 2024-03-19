import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import { Database, Resource } from "@adminjs/prisma";
import {
  itemsResource,
  itemGroupResource,
} from "./resources/items.resource.js";
import { requestResource } from "./resources/requests.resource.js";

const PORT = 3000;

AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    resources: [itemsResource, itemGroupResource, requestResource],
    branding: { companyName: "Warehouse" },
  });

  admin.watch();

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
