import { ChoreWithAssignments } from "../models/ChoreWithAssignments";
import { Card, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { AssignmentState } from "../models/AssignmentState";
import { AssignmentList } from "./AssignmentList";
import { MoreOptionsMenu } from "../MoreOptionsMenu";
import { AddOptionsExpandCardActions } from "../AddOptionsExpandCardActions";
import { BiAvatarCardHeader } from "../BiAvatarCardHeader";
import { CollapsibleCardContent } from "../CollapsibleCardContent";
import { AddButtonWithLabel } from "../AddButtonWithLabel";
import { User } from "../models/User";
import { useInfoNotification } from "../../shell/hooks/SnackbarHooks";
import { AddChildMenu } from "../AddChildMenu";
import { useAddAssignment } from "../BackendAccess";
import {
  mutateChore,
  useParentChoreDelete,
  useParentChorePut,
} from "../../api/BackendAccess";

type Prop = {
  chore: ChoreWithAssignments;
  children: User[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      textAlign: "left",
    },
    cardContent: {
      paddingTop: "0px",
      paddingBottom: "8px",
    },
  })
);

export function ChoreCard(props: Prop): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showMoreAnchor, setShowMoreAnchor] = useState<null | HTMLElement>(
    null
  );
  const [showAddChild, setShowAddChild] = useState(false);
  const [
    showAddChildAnchor,
    setShowAddChildAnchor,
  ] = useState<null | HTMLElement>(null);
  const showInfo = useInfoNotification();
  const [allChildrenAssigned, setAllChildrenAssigned] = useState(true);
  const [cardLocked, setCardLocked] = useState(true);
  const addAssignmentMutation = useAddAssignment();

  useEffect(() => {
    setAllChildrenAssigned(
      props.chore.assignments.length === props.children.length
    );
  }, [props.children.length, props.chore.assignments.length]);

  useEffect(() => {
    setCardLocked(
      props.chore.assignments.filter(
        (assignment) => assignment.state !== AssignmentState.Assigned
      ).length > 0
    );
  }, [props.chore.assignments]);

  const deleteChoreMutation = useParentChoreDelete();
  const changeChoreMutation = useParentChorePut();

  function handleExpandClick() {
    setExpanded((prevExpanded) => !prevExpanded);
  }

  function handleAddChildClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShowAddChildAnchor(event.currentTarget);
    setShowAddChild(true);
  }

  function handleSelectedChild(id: number): void {
    setShowAddChildAnchor(null);
    setShowAddChild(false);

    addAssignmentMutation.mutate({ choreId: props.chore.id, userId: id });
  }

  function handleAddChildClose(): void {
    setShowAddChildAnchor(null);
    setShowAddChild(false);
  }

  function handleMoreClick(event: React.MouseEvent<HTMLButtonElement>) {
    setShowMoreAnchor(event.currentTarget);
    setShowMoreActions(true);

    console.log("Opening more actions.");
  }

  function handleMoreClose() {
    setShowMoreAnchor(null);
    setShowMoreActions(false);

    console.log("Closing more actions.");
  }

  function handleCopy() {
    console.log("Copying...");
    showInfo("Copying..."); // TODO js (11.03.2021): Replace dummy implementation.

    handleMoreClose();
  }

  function handleDelete() {
    console.log("Deleting...");
    deleteChoreMutation.mutate(mutateChore(props.chore));
    handleMoreClose();
  }

  function handleTitleEdit() {
    console.log("Editing title...");
    changeChoreMutation.mutate(mutateChore(props.chore));
  }

  function handleDueDateEdit() {
    console.log("Editing due date...");
    changeChoreMutation.mutate(mutateChore(props.chore));
  }

  function handleValueEdit() {
    console.log("Editing amount of marbles...");
    changeChoreMutation.mutate(mutateChore(props.chore));
  }

  function getDescription() {
    if (!props.chore.description) return;

    return (
      <Typography
        className={classes.description}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        {props.chore.description}
      </Typography>
    );
  }

  return (
    <Card elevation={5}>
      <BiAvatarCardHeader
        leftAvatarLabel={props.chore.assignments.length.toString()}
        leftAvatarNotifications={
          props.chore.assignments.filter(
            (assignment) =>
              assignment.state === AssignmentState.RequestedToCheck
          ).length
        }
        onLeftAvatarClick={handleExpandClick}
        title={props.chore.name}
        subtitle={new Date(props.chore.dueDate).toLocaleDateString("de-DE", {
          weekday: "short",
          year: "2-digit",
          month: "short",
          day: "numeric",
        })}
        rightAvatarLabel={props.chore.value.toString()}
        rightAvatarNotifications={
          props.chore.assignments.filter(
            (assignment) =>
              assignment.state === AssignmentState.CheckConfirmed ||
              assignment.state === AssignmentState.Archived
          ).length
        }
        onRightAvatarClick={handleValueEdit}
        onTitleClick={handleTitleEdit}
        onSubtitleClick={handleDueDateEdit}
      />
      <AddOptionsExpandCardActions
        addLabel="Kind hinzufügen"
        moreOpen={showMoreActions}
        expandOpen={expanded}
        onAddClick={handleAddChildClick}
        onMoreClick={handleMoreClick}
        onExpandClick={handleExpandClick}
        hideAddButton
        disabledAddButton={allChildrenAssigned}
      />
      <CollapsibleCardContent
        className={classes.cardContent}
        expanded={expanded}
      >
        {getDescription()}
        <AssignmentList assignments={props.chore.assignments} />
        <AddButtonWithLabel
          title="Kind hinzufügen"
          onClick={handleAddChildClick}
          disabled={allChildrenAssigned}
        />
      </CollapsibleCardContent>
      <MoreOptionsMenu
        open={showMoreActions}
        anchorEl={showMoreAnchor}
        onMoreClose={handleMoreClose}
        copyLabel="Ämtli kopieren"
        onCopy={handleCopy}
        deleteLabel={"Ämtli löschen"}
        onDelete={handleDelete}
        disableDelete={cardLocked}
      />
      <AddChildMenu
        open={showAddChild}
        anchorEl={showAddChildAnchor}
        onClose={handleAddChildClose}
        children={props.children.filter(
          (child) =>
            !props.chore.assignments.some(
              (assignment) => assignment.userId === child.id
            )
        )}
        onChildSelected={handleSelectedChild}
      />
    </Card>
  );
}
