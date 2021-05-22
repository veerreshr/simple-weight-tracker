import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Tooltip } from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "100%",
  },
}));

function WeightInput() {
  const uid = useStoreState((state) => state.auth.uid);

  const uploadDataToFirebase = useStoreActions(
    (actions) => actions.weights.uploadDataToFirebase
  );
  const [weight, setWeight] = useState("");
  const classes = useStyles();
  const addWeight = () => {
    uploadDataToFirebase({ uid, weight });
    setWeight("");
  };
  return (
    <div className={classes.root}>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        variant="filled"
      >
        <InputLabel htmlFor="filled-adornment-password">Add Weight</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type="number"
          placeholder="ex: 55 (in Kgs)"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              addWeight();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={addWeight}
                edge="end"
              >
                <Tooltip title={<span>Add Weight</span>}>
                  <AddBoxIcon aria-label="add weight" tooltip="Add Weight" />
                </Tooltip>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}

export default WeightInput;
