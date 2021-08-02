import React, { Component } from "react";
// import firebase from '../../helpers/firebase'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import Fade from "react-reveal/Fade";

import LogoIcon from "../../../assets/logo-light.png";
import "./login.css";
import GetData from "../../../Fetch/loginFetch";
import MyContext from "../../../helper/themeContext";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Clini Doc
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const loginStyle = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#008FFF",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      error: false,
    };
  }

  componentDidMount() {
    if (this.context.state.user && this.context.state.user.token) {
      this.context.history.push("/admin/referrals");
    }
  }

  isOk = () => {
    let { email, password } = this.state;
    if (
      email &&
      email.length > 0 &&
      password &&
      password.length > 0 &&
      this.checkEmail() &&
      this.checkPassword()
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value, error: false });
  };

  checkEmail = () => {
    if (this.state.email && this.state.email.length > 0) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.state.email).toLowerCase());
    }
    return true;
  };

  checkPassword = () => {
    if (this.state.password && this.state.password.length > 0) {
      if (this.state.password.length < 5) {
        return false;
      } else return true;
    }
    return true;
  };

  handleLogin = (
    e // to avoid spoofing
  ) => {
    e.preventDefault();
    if (this.checkEmail && this.checkPassword) {
      this.Login();
    }
  };

  Login = () => {
    this.setState({ loading: true });
    let req = {
      email: this.state.email,
      password: this.state.password,
    };
    GetData(
      "https://clinidocapp.herokuapp.com/login",
      200,
      req,
      this.postLogin
    );
  };

  postLogin = (response, token) => {
    let global = this;
    if (token) {
      console.log(token);
      this.setState({ loading: false });
      console.log(response);
      let user = {
        username: response.data.username,
        email: response.data.email,
        token,
        id: response.data.id,
      };
      this.context.setState({ user });
      this.context.setSession(user);
      this.context.history.push("/admin/dashboard", { from: "/login" });
    } else {
      this.setState({ error: true, loading: false });
      console.log("Server Error! Invalid or No token.");
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={this.state.loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Fade bottom>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar
                className={classes.avatar}
                className="gradient-black-icon"
              >
                {/* <LockOutlinedIcon /> */}
                <img src={LogoIcon} alt="Logo" width="30px" />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                <span className="gradient-blue">
                  {" "}
                  Sign in <br /> CliniDoc Admin Portal{" "}
                </span>
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange}
                  error={!this.checkEmail()}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={this.handleChange}
                  autoComplete="current-password"
                  error={!this.checkPassword()}
                />
                <Fade bottom collapse when={this.state.error}>
                  <div className="LoginInErrorMessage">
                    Wrong Email or Password
                  </div>
                </Fade>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={classes.submit}
                  onClick={this.handleLogin}
                  disabled={!this.isOk()}
                >
                  <span className={"gradient-black"}> Sign In </span>
                </Button>

                <Grid container>
                  <Grid item xs>
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="disabledLink"
                      variant="body2"
                    >
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="disabledLink"
                    >
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Fade>
      </React.Fragment>
    );
  }
}

Login.contextType = MyContext;
export default withStyles(loginStyle)(Login);
