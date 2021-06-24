import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PieChartComponent from "./PieChartComponent";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography></Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

export default function TabsComponent({ data }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {data.tabs.map((t, i) => (
            <Tab label={t} key={i} />
          ))}
        </Tabs>
      </Paper>
      {/* {data.data.length > 0 &&
        data.data.map((d, i) => (
         
        ))} */}
      {data.weightLoss && (
        <TabPanel value={value} index={0}>
          {<PieChartComponent data={data.weightLoss} name="Loss" />}
        </TabPanel>
      )}
      {data.weightGain && (
        <TabPanel value={value} index={1}>
          {<PieChartComponent data={data.weightGain} name="Gain" />}
        </TabPanel>
      )}
    </div>
  );
}
