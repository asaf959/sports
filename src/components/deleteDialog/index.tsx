/* eslint-disable no-console */
import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";

import { ReactComponent as CancelSvg } from "../../assets/svg/cancel.svg";
import { ReactComponent as TrashSvg } from "../../assets/svg/trash.svg";
import { Button } from "../button";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  numOfRows?: number;
  onDelete: () => void;
  user?: string;
  category?: string;
}

function DeleteDialog({ open, setOpen, numOfRows, onDelete, user, category }: Props) {
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await onDelete();
      handleClose();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "20px",
          width: "520px"
        }
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box position="absolute" top="10px" right="10px">
        <IconButton onClick={handleClose} sx={{ padding: 0 }}>
          <CancelSvg />
        </IconButton>
      </Box>
      <Box padding="36px 40px">
        <DialogTitle id="alert-dialog-title" textAlign="center">
          <TrashSvg color="warning" fontSize="large" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center" id="alert-dialog-description" sx={{ marginBottom: "8px" }} color="secondary" variant="h4">
            Are you sure?
          </DialogContentText>
          <DialogContentText textAlign="center" id="alert-dialog-description" sx={{ fontSize: "14px", fontWeight: "400" }} color="secondary">
            Do you really want to delete {user ? <b>{user}</b> : <b>{numOfRows}</b>} {category}?
          </DialogContentText>
          <Box display="flex" flexDirection="column" rowGap="16px" paddingTop="24px">
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
            <Button onClick={handleClose} autoFocus variant="outlined">
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
}

export default DeleteDialog;
