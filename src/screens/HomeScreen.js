import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import WeightTable from "../components/WeightTable";
import WeightInput from "../components/WeightInput";
import { useStoreActions, useStoreState } from "easy-peasy";
import { db } from "./../firebase";
import GridCharts from "./../components/GridCharts";

const useStyles = makeStyles((theme) => ({
  center: {
    margin: "5px",
  },
}));
function HomeScreen({ history }) {
  const uid = useStoreState((state) => state.auth.uid);
  const loggedIn = useStoreState((state) => state.auth.loggedIn);
  const updateData = useStoreActions((actions) => actions.weights.updateData);
  const addToast = useStoreActions((actions) => actions.addToast);
  useEffect(() => {
    if (loggedIn) {
      db.collection(`/${uid}`)
        .get()
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push({
              weight: doc.data().weight,
              datetime: doc.id.slice(0, 24),
            });
          });
          updateData(data);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          addToast({
            open: true,
            message: "Error getting Entries",
            severity: "error",
          });
        });
    } else {
      history.push("/login");
    }
  }, [loggedIn]);
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <WeightInput />
      <GridCharts />
      <WeightTable />
    </div>
  );
}

export default HomeScreen;
