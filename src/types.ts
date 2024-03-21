import { account } from "@prisma/client";

type RequestContext = {
  currentAdmin: account;
};

export { RequestContext };
