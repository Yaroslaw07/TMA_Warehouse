import React from "react";
import { CurrentUserNav } from "@adminjs/design-system";
import { useCurrentAdmin } from "adminjs";

const Logged = () => {
  const [currentAdmin] = useCurrentAdmin();

  return (
    <CurrentUserNav name={currentAdmin?.name!} title={currentAdmin?.role!} />
  );
};

export default Logged;
