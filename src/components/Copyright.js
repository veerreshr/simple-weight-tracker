import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" mt={12}>
      {"Copyright © "}
      <Link color="inherit" href="https://veereshr.netlify.app/">
        Veeresh
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
