import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";
import { useStoreState } from "easy-peasy";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginScreen({ history }) {
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const classes = useStyles();
  const handleClick = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInAnonymously()
      .then(({ user }) => {
        history.push("/");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode + " : " + errorMessage);
      });
  };
  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Simple Weight Tracker App
        </Typography>
        <br />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
        <Button
          onClick={(e) => handleClick(e)}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In Anonymously
        </Button>
      </div>
    </Container>
  );
}
