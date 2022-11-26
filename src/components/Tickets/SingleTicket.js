import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Paper,
  Typography,
  CircularProgress,
  Stack,
  Grid,
  MenuItem,
  Box
} from "@mui/material";
import convertDate from "../../helpers/convertDate";
import AuthContext from "../../context/auth-context";
import Unauthorized from "../User/Unauthorized";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

export default function SingleTicket() {
  const params = useParams();
  const [error, setError] = useState(true);
  const [errorObject, seterrorObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState({});
  const [notes, setNotes] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const selectList = [1, 2, 3, 4];


  useEffect(() => {
    async function query() {
      await fetch(`http://localhost:8000/api/ticket/${params.id}/`, {
        method: "GET",
        credentials: "include",
        redirect: "follow",
      })
        .then((response) => {
          if (!response.ok) {
            // create error object and reject if not a 2xx response code
            let err = new Error();
            err.response = response;
            err.status = response.status;
            err.message = `${response.status} ${response.statusText}`;
            throw err;
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          // clean up date for display on page
          data.creation_timestamp = convertDate(data.creation_timestamp);
          data.modification_timestamp = convertDate(
            data.modification_timestamp
          );
          setTicket(data);
          setError(false);
          setLoading(false);
        })
        .catch((err) => {
          seterrorObject(err);
          setLoading(false);
          console.error(err);
        });
    }
    query();
  }, []); // Leave this or you query FOREVER

  async function handleUpdate() {
    setLoading(true)
    if (notes !== "") {
      let work_notes = ticket['work_notes']
      work_notes.push({'note': notes})
      setTicket((currentTicketData) => {
        let newTicketData = {
          ...currentTicketData,
          ['work_notes']: work_notes
        }
        return newTicketData
      })
    }
    const payload = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify(ticket)
    }
    await fetch(`http://localhost:8000/api/ticket/${params.id}/`, payload)
      .then((response) => {
        if (!response.ok) {
          // create error object and reject if not a 2xx response code
          console.error(response.text())
          let err = new Error();
          err.response = response;
          err.status = response.status;
          err.message = `${response.status} ${response.statusText}`;
          throw err;
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        // clean up date for display on page
        data.creation_timestamp = convertDate(data.creation_timestamp);
        data.modification_timestamp = convertDate(
          data.modification_timestamp
        );
        setTicket(data);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        seterrorObject(err);
        setLoading(false);
        console.error(err);
      });
      setNotes('');
  }

  async function handleDelete() {

    const payload = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      redirect: "follow"
    }

    await fetch(`http://localhost:8000/api/ticket/${params.id}/`, payload)
      .then((response) => {
        if (!response.ok) {
          // create error object and reject if not a 2xx response code
          console.error(response.text())
          let err = new Error();
          err.response = response;
          err.status = response.status;
          err.message = `${response.status} ${response.statusText}`;
          throw err;
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        // clean up date for display on page
        data.creation_timestamp = convertDate(data.creation_timestamp);
        data.modification_timestamp = convertDate(
          data.modification_timestamp
        );
        setTicket(data);
        setError(false);
        setLoading(false);
        window.location.href = '/tickets';
      })
      .catch((err) => {
        seterrorObject(err);
        setLoading(false);
        console.error(err);
      });
      setNotes('');
  }

  function handleModification(value, field) {
    // Convert to int if string
    if (field.includes("id") && value !== "") {
      value = parseInt(value);
    } else if (field.includes("id") && value === "") {
      value = null;
    }

    setTicket((currentTicketData) => {
      let newTicketData = {
        ...currentTicketData,
        [field]: value,
      };
      console.log(newTicketData);
      return newTicketData;
    });
  }

  return !isLoggedIn ? (
    <Unauthorized />
  ) : (
    <Paper
      sx={{
        width: "max(80vw, 350px)",
        mx: "auto",
        padding: 5
      }}
    >
      {loading ? (
        <Box align={'center'} padding={10}><CircularProgress /></Box>
      ) : error ? (
        <Typography
          id="modal-modal-title"
          variant="h1"
          component="h1"
          align="center"
        >
          {errorObject.message}
        </Typography>
      ) : (
        <>
          <Stack spacing={2}>
            <Typography variant="h3" align="center">
              Ticket Modification
            </Typography>
            <TextField
              onChange={(e) => handleModification(e.target.value, "title")}
              value={ticket.title}
              required
              fullWidth
              name="title"
              type="title"
              label="Title"
              placeholder="Title"
              variant="outlined"
            />
            <TextField
              label="Description"
              onChange={(e) =>
                handleModification(e.target.value, "description")
              }
              value={ticket.description}
              required
              fullWidth
              multiline
              rows={4}
              name="description"
              type="description"
              placeholder="Description"
              variant="outlined"
            />
            <Grid container spacing={1} justifyContent="center">
              <Grid item xs={1.5}>
                <TextField
                  id="outlined-number"
                  label="Priority"
                  select
                  value={ticket.priority}
                  helperText="1 = Business Critical, 2 = High, 3 = Medium, 4 = Low"
                  onChange={(e) =>
                    handleModification(e.target.value, "priority")
                  }
                >
                  {selectList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={1.5}>
                <TextField
                  id="outlined-number"
                  label="Status"
                  select
                  value={ticket.status}
                  helperText="1 = New, 2 = In Progress, 3 = Completed, 4 = Cancelled"
                  onChange={(e) => handleModification(e.target.value, "status")}
                >
                  {selectList.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={1.8}>
                <TextField
                  value={convertDate(ticket.creation_timestamp)}
                  label="Created"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={0.8}>
                <TextField
                  id="outlined-number"
                  value={ticket.created_by_id}
                  label="Created By"
                  disabled
                />
              </Grid>
              <Grid item xs={1.8}>
                <TextField
                  id="outlined-number"
                  value={convertDate(ticket.modification_timestamp)}
                  label="Modified"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={0.8}>
                <TextField
                  id="outlined-number"
                  value={ticket.modified_by_id}
                  label="Modified By"
                  disabled
                />
              </Grid>
              <Grid item xs={1.2}>
                <TextField
                  id="outlined-number"
                  value={ticket.assigned_group_id}
                  onChange={(e) =>
                    handleModification(e.target.value, "assigned_group_id")
                  }
                  label="Assigned to Group"
                  type={"number"}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={1.2}>
                <TextField
                  id="outlined-number"
                  value={ticket.assigned_to_id}
                  onChange={(e) =>
                    handleModification(e.target.value, "assigned_to_id")
                  }
                  label="Assigned to User"
                  type={"number"}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
              }}
            >
              <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                Work Notes
              </Typography>
              {ticket
                ? ticket.work_notes.map((n) => (
                    <TextField
                      value={n.note}
                      helperText={`Created ${convertDate(
                        n.creation_timestamp
                      )} by user ${n.created_by_id}.`}
                      fullWidth
                      multiline
                      disabled
                      sx={{
                        paddingBottom: 1,
                        paddingTop: 1,
                      }}
                    />
                  ))
                : ""}
              <TextField
                onChange={(e) => setNotes(e.target.value)}
                value={notes}
                fullWidth
                multiline
                rows={4}
                name="notes"
                type="notes"
                label="Add Work Note"
                placeholder="Start typing to add a note"
                variant="outlined"
              />
            </Paper>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button size="large" onClick={handleUpdate}>
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <a href="/tickets">
                  <Button color="secondary" size="large">
                    Cancel
                  </Button>
                </a>
              </Grid>
              <Grid item>
                <Button color="error" size="large" variant="contained" onClick={handleDelete}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </>
      )}
    </Paper>
  );
}
