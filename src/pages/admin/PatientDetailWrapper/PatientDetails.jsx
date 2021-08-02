import React from "react";
import {
  Modal,
  Typography,
  Button,
  Grid,
  makeStyles,
  Avatar,
  Divider,
} from "@material-ui/core";
import moment from "moment";

const usestyles = makeStyles((theme) => ({
  img: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  overflowtxt: {
    marginTop: "2px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const PatientDetails = ({ patient_details, width }) => {
  const classes = usestyles();
  console.log("PatientDetails", width);
  return (
    <>
      {patient_details && (
        <Grid container>
          <Grid
            style={{
              borderRight: width !== "xs" && "1px solid lightgray",
            }}
            md={3}
            item
            align="center"
            sm={6}
            xs={12}
          >
            <Avatar
              className={classes.img}
              src="https://media.gettyimages.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343"
            />
            <Typography paragraph variant="h5">
              {patient_details[0].patient_name}
            </Typography>
            <Typography paragraph>{patient_details[0].email}</Typography>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div>
                <Typography variant="h6">24</Typography>
                <Typography>age</Typography>
              </div>
              <Divider
                style={{ height: "50px", alignSelf: "center" }}
                orientation="vertical"
                flexItem
              />
              <div>
                <Typography variant="h6">
                  {patient_details[0].gender}
                </Typography>
                <Typography>Sex</Typography>
              </div>
            </div>
          </Grid>

          <Grid
            item
            md={3}
            style={{
              padding: "20px 30px 0 30px",
            //   paddingLeft: width === "xs" && "10px",
            }}
            sm={6}
            xs={12}
          >
            <Typography> Patient Name</Typography>
            <Typography variant="h6" style={{ marginTop: "2px" }}>
              {patient_details[0]?.patient_name}
            </Typography>
            <div
              style={{
                borderBottom: "1px solid lightgray",
                marginBottom: "50px",
              }}
            ></div>
            <Typography> Date Of Birth</Typography>
            <Typography
              variant="h6"
              style={{
                margin: "2px 0 50px 0",
                borderBottom: "1px solid lightgray",
              }}
            >
              {moment(patient_details[0].dob).format("DD-MM-yyyy")}
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            style={{ padding: "20px 30px 0 30px" }}
            sm={6}
            xs={12}
          >
            <Typography> Patient number</Typography>
            <Typography
              variant="h6"
              style={{
                margin: "2px 0 50px 0",
                borderBottom: "1px solid lightgray",
              }}
            >
              {patient_details[0].phone}
            </Typography>
            <Typography> Address</Typography>
            <Typography
              variant="h6"
              className={classes.overflowtxt}
              style={{
                margin: "2px 0 50px 0",
                borderBottom: "1px solid lightgray",
              }}
            >
              {patient_details[0].address}
            </Typography>
          </Grid>
          <Grid
            item
            md={3}
            style={{ padding: "20px 30px 0 30px" }}
            sm={6}
            xs={12}
          >
            <Typography>Email</Typography>
            <Typography
              variant="h6"
              style={{
                margin: "2px 0 50px 0",
                borderBottom: "1px solid lightgray",
              }}
              className={classes.overflowtxt}
            >
              {patient_details[0].email}
            </Typography>

            <Typography>Marital status</Typography>
            <Typography
              variant="h6"
              style={{
                margin: "2px 0 50px 0",
                borderBottom: "1px solid lightgray",
              }}
            >
              {patient_details[0].marital_status || "Male"}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PatientDetails;
