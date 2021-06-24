import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useStoreState } from "easy-peasy";

const tableIcons = {
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <RefreshIcon {...props} ref={ref} />),
};

export default function WeightTable() {
  const data = useStoreState((state) => state.weights.data);
  const [localData, setLocalData] = useState([]);
  useEffect(() => {
    if (data[0] !== undefined) {
      setLocalData(data);
    }
  }, [data]);
  return (
    <div style={{ margin: "0.5em" }}>
      <MaterialTable
        icons={tableIcons}
        title="Weight Table"
        columns={[
          { title: "Weight (kg)", field: "weight" },
          { title: "Date Time", field: "datetime", defaultSort: "desc" },
        ]}
        data={localData}
        options={{
          exportButton: true,
        }}
      />
    </div>
  );
}
