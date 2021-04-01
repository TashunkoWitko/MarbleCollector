import {
  Box,
  Container,
  Paper,
  makeStyles,
  createStyles,
  Theme,
  List,
} from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { RewardItem } from "./RewardItem";
import { useChildRewardLoader, useUserBalance } from "../BackendAccess";
import { useMyNotificationsByNamePrefixWithHandle } from "../../notifications/NotificationHooks";
import { NotificationNames } from "../../notifications/NotificationNames";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      flex: "1 1 auto",
      padding: "1px",
    },
    container: {
      padding: "0px",
    },
  })
);

export function ChildRewardList(): JSX.Element {
  const userId = useRecoilValue(AppState.userId);
  const [rewards, invalidateRewards] = useChildRewardLoader(userId);
  const classes = useStyles();
  useDashboardTitle("Belohnungen");

  const [
    newRewardNotifications,
    setRewardNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(NotificationNames.prefix.grant);

  useEffect(() => {
    if (newRewardNotifications.length > 0) {
      for (const notification of newRewardNotifications) {
        console.log(
          "Triggering reload for entity with id",
          notification.targetEntityId
        );
      }
      invalidateRewards();
      setRewardNotificationsHandled(newRewardNotifications);
    }
  }, [
    invalidateRewards,
    newRewardNotifications,
    setRewardNotificationsHandled,
  ]);

  const { isLoading, error, balance } = useUserBalance();

  //TODO 21037 improve implementation
  let userBalance = 0;
  if (balance) {
    userBalance = balance;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Box className={classes.box} component={Paper}>
        <List>
          {rewards?.map((reward) => (
            <RewardItem key={reward.id} reward={reward} balance={userBalance} />
          ))}
        </List>
      </Box>
    </Container>
  );
}
