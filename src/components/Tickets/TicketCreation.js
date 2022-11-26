import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import Unauthorized from "../User/Unauthorized";
import axios from "axios";
import {
  Button,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Box,
  CircularProgress,
  Stack
} from "@mui/material";

export default function TicketCreation() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  const [loading, setLoading] = React.useState(false)
  const [ticketNumber, setTicketNumber] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState(4);
  const [description, setDescription] = React.useState("");
  const selectList = [1, 2, 3, 4];

  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = {
      ticket_number: ticketNumber,
      status: 1, //1 == new
      title: title,
      work_notes: [],
      priority: parseInt(priority),
      description: description
    };
    console.log(form)
    try {
      const res = await axios.post("http://localhost:8000/api/ticket/", form, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      window.location.href = `/ticket/${res.data.id}`;
    } catch (error) {
      console.log(error);
    }
    setLoading(false)
  };

  if (!isLoggedIn) {
    return <Unauthorized />;
  }

  return (
    <>
      {loading ? <Box align={'center'} padding={10}><CircularProgress /></Box> : (
        <Paper
          sx={{
            mx: "auto",
            height: "max(52vh, 500px)",
            width: "max(40vw, 350px)",
          }}
          align={"center"}
        >
          <Stack
            spacing={2}
            padding={2}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Typography variant="h4">Ticket Creation</Typography>
                <TextField
                  required
                  id="outlined-required"
                  label="Ticket Number"
                  onChange={(text) => setTicketNumber(text.target.value)}
                />
                <TextField
                  id="outlined-helperText"
                  label="Title"
                  required
                  helperText="(Ex: Outlook Issues)"
                  onChange={(text) => setTitle(text.target.value)}
                />
                <TextField
                  id="outlined-number"
                  label="Priority"
                  select
                  type={"number"}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  defaultValue={4}
                  helperText="1 = Business Critical, 2 = High, 3 = Medium, 4 = Low"
                  onChange={(text) => setPriority(text.target.value)}
                >
                  {selectList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>

            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              required
              fullWidth
              rows={4}
              onChange={(text) => setDescription(text.target.value)}
            />
            <Box alignContent={"center"} justifyContent={"center"}>
              <Button variant="contained" onClick={submitHandler}>
                Submit
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}
    </>
  );
}
