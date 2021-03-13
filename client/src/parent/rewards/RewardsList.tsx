import {
  Box,
  CircularProgress,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ErrorIcon from "@material-ui/icons/Error";
import { AddRewardDialog } from "../AddRewardDialog";
import { useState } from "react";
import { RewardCard } from "./RewardCard";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { useChildrenDataForUser, useParentRewardData } from "../BackendAccess";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      flex: "1 1 auto",
      padding: "1px",
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(6),
      right: theme.spacing(2),
    },
  })
);

export function RewardsList() {
  useDashboardTitle("Belohnungspinnwand");
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  const {
    isLoading: isChildrenLoading,
    error: childrenError,
    children,
  } = useChildrenDataForUser();
  const { isLoading, error, rewards } = useParentRewardData();

  function handleOnCancel() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct cancel logic.
  }

  function handleOnDelete() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct delete logic.
  }

  function handleOnSave() {
    setShowDialog(false); // TODO js (02.03.2021): Replace dummy implementation with correct save logic.
  }

  function handleRewardChore() {
    setShowDialog(true);
  }

  if (isLoading || isChildrenLoading)
    return (
      <Box>
        <p>Loading...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (11.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (error || childrenError)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${error}`}</p>
      </Box>
    ); // TODO js (11.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <Box className={classes.container} component={Paper}>
      <List>
        {rewards?.map((reward) => (
          <RewardCard key={reward.id} reward={reward} children={children} />
        ))}
      </List>
      <Fab
        className={classes.fab}
        size="small"
        color="primary"
        aria-label="add"
        onClick={handleRewardChore}
      >
        <AddIcon />
      </Fab>
      <AddRewardDialog
        open={showDialog}
        onCancel={handleOnCancel}
        onDelete={handleOnDelete}
        onSave={handleOnSave}
      />
    </Box>
  );
}
