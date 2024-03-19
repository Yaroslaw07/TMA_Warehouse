import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import { Database, Resource } from "@adminjs/prisma";
import itemsResource from "./resources/items.resource.js";

const PORT = 3000;

AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const app = express();

  const admin = new AdminJS({ resources: [itemsResource] });

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
