import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LinearChart from "./LinearChart";
import TabsComponent from "./TabsComponent";
import { useStoreState } from "easy-peasy";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0.5em",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingLeft: "0 !important",
    height: "100%",
  },
  alignCenter: {
    display: "flex",
    alignItems: "center",
  },
}));
function GridCharts() {
  const data = useStoreState((state) => state.weights.data);
  const [linearChartData, setLineChartData] = useState([]);
  const [weightLoss, setWeightLoss] = useState([]);
  const [weightGain, setWeightGain] = useState([]);
  const classes = useStyles();
  let PieChartData = {
    tabs: ["Weight Loss", "Weight Gain"],
    weightLoss,
    weightGain,
  };
  useEffect(() => {
    if (data.length > 0) {
      let temp = [];
      data.map((d) => {
        temp.push({
          weight: d.weight,
          timeline: d.datetime.slice(4, -9),
        });
        setLineChartData(temp);
      });
      temp = [];
      let i;
      let month = data[data.length - 1].datetime.split(" ")[1];
      let EOMW = data[data.length - 1].weight;
      for (i = data.length - 1; i >= 0; i--) {
        let current_month = data[data.length - 1].datetime.split(" ")[1];
        if (current_month != month) {
          let weight_change = EOMW - data[i + 1].weight; //weight change for that month
          temp.push({ name: month, value: weight_change });
          month = current_month;
          EOMW = data[i].weight;
          continue;
        }
        if (i == 0) {
          let weight_change = EOMW - data[i].weight;
          temp.push({ name: month, value: weight_change });
        }
      }
      let weightloss = [],
        weightgain = [];
      for (i = temp.length - 1; i >= 0; i--) {
        let name = temp[i].name;
        let value = temp[i].value;
        if (value < 0) {
          weightloss.push({ name: name, value: -1 * value });
        } else {
          weightgain.push(temp[i]);
        }
      }
      setWeightLoss(weightloss);
      setWeightGain(weightgain);
    }
  }, [data]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper + " " + classes.alignCenter}>
            {data && <LinearChart data={linearChartData} />}
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            {data && <TabsComponent data={PieChartData} />}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default GridCharts;
