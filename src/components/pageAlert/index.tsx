import CloseIcon from "@mui/icons-material/Close";
import { Alert, Collapse, IconButton } from "@mui/material";
import React, { useEffect } from "react";

import useStore from "../../store";

function PageALert() {
  const { pageAlert, setPageAlert } = useStore();

  const [open, setOpen] = React.useState(!!pageAlert);

  useEffect(() => {
    setOpen(!!pageAlert);
  }, [pageAlert]);

  return (
    <Collapse in={open}>
      <Alert
        severity={pageAlert?.type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                setPageAlert(null);
              }, 1000);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {pageAlert?.message}
      </Alert>
    </Collapse>
  );
}

export default PageALert;
