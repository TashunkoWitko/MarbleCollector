import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AppState } from "./AppState";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export function ShowSnack() {
  const classes = useStyles();

  const [snack, setSnackState] = useRecoilState(AppState.snackState);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackState({
      open: false,
      message: snack.message,
      severity: snack.severity,
    });
  };

  return (
    <Box className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export function useInfoNotification(): (message: string) => void {
  const setSnackState = useSetRecoilState(AppState.snackState);

  return (message: string): void => {
    setSnackState({
      open: true,
      message: message,
      severity: "info",
    });
  };
}

export function useSuccessNotification(): (message: string) => void {
  const setSnackState = useSetRecoilState(AppState.snackState);

  return (message: string): void => {
    setSnackState({
      open: true,
      message: message,
      severity: "success",
    });
  };
}

export function useErrorNotification(): (message: string) => void {
  const setSnackState = useSetRecoilState(AppState.snackState);

  return (message: string): void => {
    setSnackState({
      open: true,
      message: message,
      severity: "error",
    });
  };
}
