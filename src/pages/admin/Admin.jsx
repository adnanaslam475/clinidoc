import React, { Component } from "react";
import { Route, Router } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";

import AdminDrawer from "../../components/AdminDrawer/AdminDrawer";
import AdminNavbar from "../../components/AdminNavbar";
import MyContext from "../../helper/themeContext";
import Referrals from "./Referrals/Referrals";

// import InitialContactForm from "./InitialContactForm/InitialContactForm";
import InitialContactFormScreen from "./InitialContForm/InitialContactFormScreen";
import Gen_patient_Info from "../Gen_patient_Info";
import Appointment from "../Appointments/Appointment";
import NewAppoinment from "./NewAppoinment/NewAppoinment";

import "./Admin.css";
import Receptionist_history from "./Receptionist_history/Receptionist_history";
import Waitinglistscreen from "./WaitingListScreen/WaitingListScreen";
import MakeAppoinment from "./MakeAppoinment/MakeAppoinment";
import PatientHistory from "./PatientDetailWrapper/PatientHistory";
import PatientDetailWrapper from "./PatientDetailWrapper/PatientDetailWrapper";


class AdminRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (!(this.context.state.user && this.context.state.user.token)) {
      this.context.history.push("/login");
    }
  }



  render() {
    return (
      <div style={{
        minHeight: "100vh",
        paddingLeft: this.context.state.isDrawerOpen ? '170px' : '0px',
        background: "#F0F0F0",
        transition: "all 0.3s ease",
      }}>
        <Router history={this.context.history}>
          {!this.context.history.location.pathname.includes(
            "general-patient-info"
          ) && <Route path="/admin" component={AdminNavbar} />}{" "}



          {!this.context.history.location.pathname.includes(
            "general-patient-info"
          ) && <Route path="/admin" component={AdminDrawer} />}
          <Route
            path="/admin/dashboard"
            render={() => (
              <Dashboard {...this.props} width={this.props.width} />
            )}
          />
          <Route
            path="/admin/referrals"
            exact
            render={() => (
              <Referrals {...this.props} width={this.props.width} />
            )}
          />{" "}
          {/* DEFAULT */}
          {/* <Route path="/admin/forms/initial-contact-form" exact component={InitialContactForm} /> */}
          <Route
            path="/admin/forms/initial-contact-form"
            exact
            render={() => (
              // <NewForm  {...this.props} width={this.props.width} />
              <InitialContactFormScreen {...this.props} width={this.props.width} />
            )}
          />
          <Route
            path="/admin/forms/general-patient-info"
            component={Gen_patient_Info}
          />{" "}
          {/* DEFAULT */}
          <Route path="/admin/forms/appointment" component={Appointment} />{" "}
          {/* DEFAULT */}
          <Route
            path="/admin/new-appointments"
            render={() => (
              <NewAppoinment {...this.props} width={this.props.width} />
            )}
          />{" "}
          {/* DEFAULT */}
          <Route
            path="/admin/waiting-list-of-appoinments"
            render={() => (
              <Waitinglistscreen {...this.props} width={this.props.width} />
            )}
          />{" "}
          {/* DEFAULT */}
          <Route
            path="/admin/receptionist-history"
            render={() => (
              <Receptionist_history {...this.props} width={this.props.width} />
            )}
          />
          <Route
            path="/admin/make-an-appoinment"
            exact
            render={() => (
              <MakeAppoinment {...this.props} width={this.props.width} />
            )}
          />
          <Route
            path="/admin/patients-list"
            exact
            render={() => (
              <PatientDetailWrapper {...this.props} width={this.props.width} />
            )}
          />
          <Route
            path="/admin/patient-history/:id"
            exact
            render={() => (
              <PatientHistory {...this.props} width={this.props.width} />
            )}
          />
        </Router>
      </div>
    );
  }
}

AdminRoutes.contextType = MyContext;
export default AdminRoutes;
