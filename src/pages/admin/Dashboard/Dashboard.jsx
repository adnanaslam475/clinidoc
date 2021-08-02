import React, { useState, useLayoutEffect, useEffect, useContext } from "react";
import {
  Typography,
  Menu,
  Grid,
  Box,
  makeStyles,
  withWidth,
  Paper,
  Container,
  Card,
  IconButton,
} from "@material-ui/core";
import "./Dashboard.css";
import Calendar from "react-calendar";
import CalendarIcon from "../../../assets/icon-new/calendar-interface-symbol-tool@2x.png";
import {
  FiberManualRecord,
  KeyboardArrowDown,
  CallMade,
} from "@material-ui/icons";
import { useHistory } from 'react-router-dom'
import moment from "moment";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  CartesianAxis,
  AreaChart,
  Area,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import One from "../../../assets/dashbord-referral-icon.png";
import Two from "../../../assets/dashbord-referral-icon2.png";
import Three from "../../../assets/dashbord-referral-ico3.png";
import Audience from "../../../assets/audience.png";
import CirCle from "../../../assets/icon-new/arrow.png";
import GetData from "../../../Fetch/GetData1";
import MyContext from "../../../helper/themeContext";

const cards = [
  { icon: One, number: 1128, text: "Referral Patient" },
  { icon: Two, number: 2158, text: "For Not Confirmed" },
  { icon: Three, number: 528, text: "Finished Appt." },
  { icon: Audience, number: 2678, text: "36% More than previous Month" },
];

const data = [
  {
    name: "April",
    uv: 4000,
    pv: 2400,
    amt: 2400,
    column: "9am",
  },
  {
    name: "May",
    uv: 3000,
    pv: 1398,
    amt: 2210,
    column: "10am",
  },
  {
    name: "June",
    uv: 2000,
    pv: 9800,
    amt: 2290,
    column: "11am",
  },
  {
    name: "july",
    uv: 2780,
    pv: 3908,
    amt: 2000,
    column: "12am",
  },
  {
    name: "Aug",
    uv: 1890,
    pv: 4800,
    amt: 2181,
    column: "9am",
  },
  {
    name: "Sept",
    uv: 2390,
    column: "9am",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    column: "9am",
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
    column: "9am",
  },
];
const types = [
  { color: "#1E2892", text: "Male" },
  { color: "#2BDFF3", text: "Female" },
  { color: "#F6E333", text: "Other" },
];
const arr = [
  { a: "Cardiologist", b: "OPD1", c: "Wed", d: "09:00 PM", e: "---" },
  { a: "Neurologist", b: "OPD1", c: "Wed", d: "09:00 PM", e: "---" },
];
const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

const data02 = [
  {
    name: "Group A",
    value: 2400,
  },
  {
    name: "Group B",
    value: 4567,
  },
  {
    name: "Group C",
    value: 1398,
  },
  {
    name: "Group D",
    value: 9800,
  },
  {
    name: "Group E",
    value: 3908,
  },
  {
    name: "Group F",
    value: 4800,
  },
];

const useStyles = makeStyles({
  main: {
    margin: "30px 20px 20px 80px",
    background: "rgb(0,0,0,0)",
    padding: "10px 10px 0 10px",
  },
  bottomCards: {
    padding: "30px 10px 30px 10px",
    // color: "#396CF0",
    borderRadius: "15px",
  },
  img: {
    width: "50px",
    height: "50px",
  },
  text: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  ball: {
    width: "12px",
    height: "12px",
    borderRadius: "30%",
    marginRight: "5px",
    display: "inline-table",
  },
  box: {
    display: "flex",
    position: "relative",
    padding: "0 20px 20px 20px",
    flexDirection: "row",
    border: "1px solid",
  },
  infobox: {
    padding: "8px",
    display: "-webkit-inline-box",
    borderRadius: "5px",
    backgroundColor: "#F5F7FF",
  },
  cardtext: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  imgIcon: { width: "20px", height: "20px", margin: "0 5px 0 5px" },
  calendarright: {
    position: "absolute",
    right: "0",
    float: "right",
    marginRight: "20px",
  },
});

const Dashboard = ({ width, ...props }) => {
  const classes = useStyles();


  const context = useContext(MyContext);
  const [apiData, setApiData] = useState(null);
  const [datestart, setDateStart] = useState(
    moment(new Date()).format("DD MMM")
  );
  const arr = [
    { clr: "#4C409C", text: "Patient" },
    { clr: " #2BDFF3", text: "Request" },
  ];
  const [dateend, setDateEnd] = useState(moment(new Date()).format("DD MMM"));
  const [bottomCardData, setBottomCardData] = useState(null);
  const [patientPercentages, setpatientPercentages] = useState([]);
  const [size, setSize] = useState([0, 0]);
  const [show, setShow] = useState(false);
  const dataHandler = (res) => {
    let arr = [];
    Object.entries(res.data).forEach((el) => {
      const [key, value] = el;
      arr.push({ key, value, back: CirCle });
    });
    setApiData(arr);
  };

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    GetData(
      context.BaseUrl + "/dashboardcounts",
      200,
      context.state.user.token,
      dataHandler
    );
  }, []);

  useEffect(() => {
    if (apiData) {
      setBottomCardData(
        apiData.filter(
          (v, i) =>
            v.key == "availableDoctors" ||
            v.key == "availableStaff" ||
            v.key == "totalPatient"
        )
      );
      const arr = [];
      var newarr = apiData.filter((v, i) => v.key === "patientMedicalStatus");
      var sum = 0;
      for (let key in newarr[0].value) {
        sum += newarr[0].value[key];
      }
      for (let key in newarr[0].value) {
        newarr[0].value[key] = ((newarr[0].value[key] / sum) * 100)
          .toFixed(2)
          .split(".")[0];
      }
      arr.push(newarr[0].value);
      setpatientPercentages(arr);
    }
  }, [apiData]);

  const onDateChange = (e) => {
    setDateStart(moment(e[0]).format("DD MMM"));
    setDateEnd(moment(e[1]).format("DD MMM"));
    setShow(false);
  };

  console.log(width)
  return (
    <Card component={Paper}>
      <div className={classes.main}>
        <Grid
          container
          justify="flex-start"
          spacing={2}
          style={{
            padding: "10px",
          
            justifyContent: width === "sm" && "center",
          }}>
          {cards.map((v, i) => (
            <Grid key={i} item md={i === 3 ? 3 : 2} sm={6} xs={12}
              style={{
                minWidth: i === 3 ? "300px":'270px' ,
              }}>
              <Card
                style={{
                  backgroundColor: i === 0 && "#396CF0",
                  padding: "30px 20px 30px 5px",
                  borderRadius: "10px",
                  color: i === 0 && "white",
                  minHeight: '11vh'
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  {i !== 3 && <img src={v.icon} className={classes.img} />}
                  {i === 3 && (
                    <div
                      style={{
                        height: "80px",
                        width: "7px",
                        margin: "0 10px 0 30px",
                        borderRadius: "10px",
                        backgroundColor: "#396CF0",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "#E0E0E0",
                          width: "7px",
                          borderRadius: "10px 10px 0px 0",
                          color: "#E0E0E0",
                        }}
                      >
                        .
                      </div>
                    </div>
                  )}
                  <div className={classes.text}>
                    {i === 3 && (
                      <img
                        src={v.icon}
                        style={{
                          position: "absolute",
                          marginTop: "10px",
                          display: "flex",
                          alignSelf: "flex-end",
                        }}
                      />
                    )}
                    <Typography variant="h3">
                      {i === 0 ? apiData && apiData[4]?.value : v.number}
                    </Typography>
                    <Typography
                      style={{ marginLeft: "5px", whiteSpace: "nowrap" }}
                    >
                      {v.text}
                    </Typography>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          style={{
            margin: "20px 0 20px 0",
            padding: "10px",
          }}
          spacing={1}
        >
          <Grid item md={7} sm={12} xs={12}>
            <Card className={classes.bottomCards}>
              <Grid
                container
                alignItems="center"
                style={{ marginBottom: "20px", paddingLeft: "10px" }}
              >
                <Grid item md={8} sm={8} xs={12} style={{ display: "flex" }}>
                  <Typography>Filtered By:</Typography>
                  <img src={CalendarIcon} className={classes.imgIcon} />
                  <span>
                    {datestart} - {dateend}
                  </span>
                  <span>
                    <IconButton
                      className={classes.imgIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShow(!show);
                      }}
                    >
                      {" "}
                      <KeyboardArrowDown color="gray" fontSize="large" />
                    </IconButton>
                  </span>
                  {show ? (
                    <div
                      style={{
                        marginTop: "25px",
                        position: "absolute",
                        zIndex: 10,
                      }}
                    >
                      <Calendar
                        onChange={onDateChange}
                        className="react-calendar"
                        selectRange={true}
                      />
                    </div>
                  ) : null}
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={4}
                  xs={12}
                  style={{
                    display: "flex",
                    padding: "10px 0 0 0",
                    justifyContent: width === "xs" ? "center" : 'flex-end',
                  }} xs={12}  >
                  {arr.map((v, i) => (
                    <div
                      className={classes.infobox}
                      key={i}
                      style={{ marginRight: "10px" }}
                    >
                      <span
                        className={classes.ball}
                        style={{ backgroundColor: v.clr }}
                      ></span>
                      <Typography>{v.text}</Typography>
                    </div>
                  ))}
                </Grid>
              </Grid>
              <ResponsiveContainer width="95%" height={250}>
                <AreaChart
                  width={730}
                  height={252}
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4C409C" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#4C409C" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2BDFF3" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2BDFF3" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(t) => "9am"} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    content={
                      <Card raised style={{ padding: "10px" }}>
                        <Typography style={{ color: "gray" }}>
                          Monthly Lead Request
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="h4">8,730</Typography>
                          <p
                            style={{
                              color: "turquoise",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            23% <CallMade />
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              borderTop: "5px solid #4C409C",
                              width: "50%",
                            }}
                          ></div>
                          <div
                            style={{
                              borderTop: "5px solid #E4E3F0",
                              width: "50%",
                            }}
                          ></div>
                        </div>
                        {/* "10px solid #E4E3F0" */}
                      </Card>
                    }
                  />
                  <Area
                    type="linear"
                    dataKey="uv"
                    stroke="#4C409C"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="linear"
                    dataKey="pv"
                    stroke="#2BDFF3"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
          <Grid item md={5} sm={6} xs={12}>
            <Card
              style={{
                padding: "20px",
                height: width === "lg" ? "89.5%" : "90%",
                minWidth: width === "xs" ? "200px" : null,
                width: width === "sm" ? "400px" : null,
                alignSelf: "center",
                borderRadius: "20px",
              }}
            >
              <Typography variant="h5" paragraph>
                Patient Medical Status
              </Typography>
              <Grid container justify="space-between">
                <Grid item md={9} sm={12} sx={12}>
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart width={730} height={250}>
                      <Pie
                        data={data01}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        fill="#8884d8"
                      />
                      <Pie
                        data={data02}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Grid>
                <Grid
                  item
                  md={3}
                  style={{
                    alignSelf: "center",
                    display: (width === "xs" || width === "sm") && "contents",
                  }}
                  sm={12}
                  sx={12}
                >
                  {types.map((v, i) => (
                    <React.Fragment key={i}>
                      <div
                        style={{
                          display: "-webkit-box",
                          flexDirection: "row",
                        }}
                      >
                        <FiberManualRecord
                          style={{
                            color: v.color,
                            marginRight: "10px",
                            fontSize: "10px",
                          }}
                        />
                        <Typography>{v.text}</Typography>
                      </div>
                      <br />
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ padding: "10px" }}
          spacing={2}
        >
          <Grid item md={7} sm={12} xs={12}>
            <Grid container justify="center" alignItems="center" spacing={2}>
              {bottomCardData?.map((v, i) => (
                <Grid item md={4} sm={6} key={i} xs={12}>
                  <Card
                    className={classes.bottomCards}
                    style={{
                      color: "#2C588B",
                      height: "45px",
                      backgroundColor:
                        (i == 0 && "#DFE3EF") ||
                        (i == 1 && "#F5E3AF") ||
                        (i == 2 && "#EEDCDC"),
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <img
                        src={v.back}
                        style={{ width: "45px", height: "45px" }}
                      />
                      <div className={classes.cardtext}>
                        <Typography variant="h5">{v.value}</Typography>
                        <Typography>
                          {(v.key == "availableStaff" && "Available Staff") ||
                            (v.key == "totalPatient" && "Total Patients") ||
                            (v.key == "availableDoctors" &&
                              "Available Doctors")}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item md={5} style={{ color: "#184980" }} sm={12} xs={12}>
            <Typography variant="h6">Schedule</Typography>
            {arr.map((v, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  borderRadius: "5px",
                  color: "#2C588B",
                  padding: "5px",
                  margin: "5px",
                  textAlign: width === "xs" && "center",
                  flexDirection: width === "xs" ? "column" : "row",
                  justifyContent: "space-between",
                  marginBottom: i === 0 && "10px",
                }}
              >
                <Typography>{v.a}</Typography>
                <Typography>{v.b}</Typography>
                <Typography>{v.c}</Typography>
                <Typography>{v.d}</Typography>
                <Typography>{v.e}</Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};
export default Dashboard;
