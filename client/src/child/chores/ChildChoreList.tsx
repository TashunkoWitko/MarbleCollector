import {
  Box,
  Container,
  CircularProgress,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import ErrorIcon from "@material-ui/icons/Error";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ChoreItem } from "./ChoreItem";
//todo, 210322 hs move backendaccess to common folder
import { useChildChoreData } from "../../parent/BackendAccess";
import { useMyNotificationsByNamePrefixWithHandle } from "../../notifications/NotificationHooks";
import { NotificationNames } from "../../notifications/NotificationNames";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
    },
  })
);

export function ChildChoreList(): JSX.Element {
  const userId = useRecoilValue(AppState.userId);
  const classes = useStyles();
  useDashboardTitle("Ämtli Pinnwand");

  const [
    newChoreNotifications,
    setChoreNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(
    NotificationNames.prefix.assignment
  );

  useEffect(() => {
    if (newChoreNotifications.length > 0) {
      // TODO @Severin now to trigger reload??
      for (const notification of newChoreNotifications) {
        console.log(
          "Triggering reload for entity with id",
          notification.targetEntityId
        );
      }
      setChoreNotificationsHandled(newChoreNotifications);
    }
  }, [newChoreNotifications, setChoreNotificationsHandled]);

  const { isLoading, error, chores } = useChildChoreData(userId);

  if (isLoading)
    return (
      <Box>
        <p>Loading...</p>
        <CircularProgress />
      </Box>
    ); // TODO js (04.03.2021): Implement more sophisticated loading screen. Refactor to general loading screen/overlay?

  if (error)
    return (
      <Box>
        <ErrorIcon color="secondary" fontSize="large" />
        <p>{`An error has occurred: ${error}`}</p>
      </Box>
    ); // TODO js (04.03.2021): Implement more sophisticated error screen. Refactor to general error screen?

  return (
    <Container maxWidth="md">
      <Box className={classes.box} component={Paper}>
        <List>
          {chores?.map((chore) => (
            <ChoreItem key={chore.id} chore={chore} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
