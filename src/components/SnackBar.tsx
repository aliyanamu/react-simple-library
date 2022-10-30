import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

type SnackBarType = "success" | "error" | "warning" | "info";

type SnackBarProps = {
  type?: SnackBarType;
  message?: string;
  open?: boolean;
  onClose?: () => void;
};

const SnackBar: React.FC<SnackBarProps> = ({
  type,
  message,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
