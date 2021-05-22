import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useStoreState, useStoreActions } from "easy-peasy";
import firebase from "firebase/app";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const clearData = useStoreActions((actions) => actions.weights.clearData);
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const [showLogout, setShowLogout] = useState(false);
  useEffect(() => {
    if (loggedIn != showLogout) {
      setShowLogout(loggedIn);
    }
  }, [loggedIn]);

  const logout = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    clearData();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Simple Weight Tracker
          </Typography>
          {showLogout && (
            <Button color="inherit" onClick={(e) => logout(e)}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
