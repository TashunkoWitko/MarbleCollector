import React from "react";
import { Button } from "@material-ui/core";
import { LockOpen } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

export function LogoutButton() {
  const history = useHistory();

  function logout() {
    history.push("/auth/logout");
  }

  return (
    <>
      <Button
        aria-label="logout"
        color="inherit"
        variant="text"
        onClick={logout}
        startIcon={<LockOpen />}
      >
        Logout
      </Button>
    </>
  );
}
