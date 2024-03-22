import { account } from "@prisma/client";

type Context = {
  currentAdmin: account;
  record: any;
};

export { Context };
