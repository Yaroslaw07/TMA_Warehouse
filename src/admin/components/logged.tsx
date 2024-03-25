import React from "react";
import { CurrentUserNav } from "@adminjs/design-system";
import { useCurrentAdmin } from "adminjs";

const Logged = () => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin();

  const handleLogout = async () => {
    fetch("/admin/logout", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    setCurrentAdmin(null);

    // ### fix later without reload
    window.location.href = "/admin/login";
    window.location.reload();
  };

  return (
    <CurrentUserNav
      name={currentAdmin?.name!}
      title={currentAdmin?.role!}
      dropActions={[
        {
          icon: "LogOut",
          label: "Log out",
          onClick: handleLogout,
        },
      ]}
    />
  );
};

export default Logged;
