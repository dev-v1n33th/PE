import * as React from "react";

import MDButton from "components/MDButton";

import { TextField, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [manager, setManager] = React.useState("Manager");

  const handleChange = (event) => {
    setManager(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Add = (a) => {
    a.stopPropagation();
    alert("New expense is added");
  };

  return (
    <div>
      <MDButton color="info" onClick={handleClickOpen}>
        + Create Expense
      </MDButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Expense</DialogTitle>
        <DialogContent>
          <Grid container>
            <TextField
              margin="dense"
              id="outlined-basic"
              label="Select Branch"
              variant="outlined"
              fullWidth
            />

            <TextField
              margin="dense"
              id="outlined-basic1"
              label="Select Title"
              variant="outlined"
              fullWidth
            />

            <FormControl fullWidth margin="dense">
              <InputLabel id="demo-simple-select-label">
                Expense Amount
              </InputLabel>
              <Select
                sx={{ minHeight: 44 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={manager}
                label="Select Manager"
                name="manager"
                onChange={handleChange}
              ></Select>
            </FormControl>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Expense Date"
              type="number"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="outlined-basic1"
              label="Comments"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <MDButton variant="outlined" color="info" size="small" onClick={Add}>
            Add Expense
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
