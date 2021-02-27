import { Avatar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    toolbar: {
        backgroundColor: "#01579b", // TODO js (25.02.2021): Move color selection to theme?
        color: "#fff", // TODO js (25.02.2021): Move color selection to theme?
    },
    avatar: {
        backgroundColor: "#fff", // TODO js (25.02.2021): Move color selection to theme?
        color: "#000", // TODO js (25.02.2021): Move color selection to theme?
    },
    title: {
        padding: "0px 16px 0px 16px",
    }
});

type Prop = {
    avatarSrc: string;
    avatarAlt: string;
    title: string;
}

export function TitleBar(props: Prop) {
    const classes = useStyles();

    function getAvatar() {
        var matches = props.avatarAlt.match(/\b(\w)/g);
        var acronym = matches?.join('') ?? "?";
        
        if (props.avatarSrc) {
            return <Avatar className={classes.avatar} alt={acronym} src={props.avatarSrc}>
                {acronym.toUpperCase()}
            </Avatar>
        }

        return (
            <Avatar className={classes.avatar}>
                {acronym.toUpperCase()}
            </Avatar>
        );
    }

    return (
        <Toolbar className={classes.toolbar}>
            {getAvatar()}
            <Typography className={classes.title} variant="h6">{props.title}</Typography>
            <IconButton />
        </Toolbar>
    );
}