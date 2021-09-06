import React, { useEffect } from "react";
import LoginScreen from "./screens/LoginScreen";
import firebase from "firebase/app";
import { useStoreActions } from "easy-peasy";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomeScreen from "./screens/HomeScreen";
import Copyright from "./components/Copyright";
import Toast from "./components/Toast";

function App() {
  const signin = useStoreActions((actions) => actions.auth.signin);
  const signout = useStoreActions((actions) => actions.auth.signout);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        signin(uid);
      } else {
        signout();
      }
    });
  }, []);
  return (
    <Router>
      <NavBar />
      <Toast />
      <Route path="/" exact component={HomeScreen} />
      <Route path="/login" exact component={LoginScreen} />
      <Copyright />
    </Router>
  );
}

export default App;
