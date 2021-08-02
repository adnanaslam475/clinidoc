import React, { Component } from 'react';
import { Route, Router } from "react-router-dom";
import { withWidth } from '@material-ui/core'
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import PropTypes from "prop-types";
import MyContext from "./helper/themeContext";
import history from "./helper/history";
import Login from './pages/admin/Login/Login';
import ReferralFormWrapper from './pages/ReferralForm/ReferralFormWrapper';
import PatientMedicalPortal from './pages/PatientMedicalPortal/PatientMedicalPortal';
import AdminRoutes from './pages/admin/Admin';
import MakeAppoinmentLast from './pages/MakeAppoinment/MakeAppoinmentLast';


const UrlHeroku = "https://clinidocapp.herokuapp.com"

const BaseUrl = UrlHeroku;
class Routes extends Component {
    constructor(props) {
        super(props);
        this.state = {

            user: {},            //set in login  //set in logout
            components: [],       //set in login
            isDrawerOpen:false,
            loading: true
        }
    }
    componentDidMount() {
        let user = this.getCookie("user")
        if (user) {
            user = JSON.parse(user);
            this.setState({ user, loading: false })
        }
        else {
            this.setState({ loading: false })
        }
    }

    setCookie(cname, cvalue, exdays = 1) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setSession = (user) => {
        this.setState({ user })
        this.setCookie('user', JSON.stringify(user))
    }

    getReferalTypeId = (label) => {
        switch (label) {
            case "Connected": return 1
            case "Not Connected": return 2
            case "Callback Later": return 3
            case "Wrong Number": return 4
        }
    }

    getReferalTypeLabel = (id) => {
        switch (id) {
            case 1: return "Connected"
            case 2: return "Not Connected"
            case 3: return "Callback Later"
            case 4: return "Wrong Number"
        }
    }

    setContextState = (object) => {
        console.log(object);
        this.setState(object)
    }

    logOut = () => {
        let user = {};
        this.setState({ user });
        this.setCookie('user', JSON.stringify(user))
        history.push('/')
    }

    render() {
        return (
            this.state.loading ?
                <div>
                </div>
                :
                <Router history={history} >
                    <MyContext.Provider value={{
                        setState: this.setContextState,
                        history: history,
                        state: this.state,
                        BaseUrl,
                        getReferalTypeLabel: this.getReferalTypeLabel,
                        getReferalTypeId: this.getReferalTypeId,
                        setSession: this.setSession,
                        logOut: this.logOut,
                    }}>

                        {/* By-email-initial-contact-form1.png */}
                        <Route path="/" exact component={Navbar} />  {/* DEFAULT */}
                        <Route path="/home" exact component={Navbar} />  {/* DEFAULT */}
                        <Route path="/" exact component={MainPage} />   {/* Home Default */}
                        <Route path="/home" exact component={MainPage} /> {/* Home */}
                        <Route
                            path="/referral/form"
                            exact
                            render={() => (<ReferralFormWrapper {...this.props} width={this.props.width} />)}
                        />
                        <Route path="/login" exact component={Login} /> {/* Auth */}
                        <Route
                            path="/patient-medical-portal"
                            exact
                            render={() => (<PatientMedicalPortal {...this.props} width={this.props.width} />)}
                        />
                        <Route path="/quick-appointment/:id" exact component={PatientMedicalPortal} />
                        <Route
                            path="/make-appoinment-last"
                            exact
                            render={() => (<MakeAppoinmentLast {...this.props} width={this.props.width} />)}
                        />
                        <Route path="/admin"
                            render={() => (<AdminRoutes {...this.props} width={this.props.width} />)} />
                    </MyContext.Provider>
                </Router>
        )
    }
}

Routes.propTypes = {
    width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};
export default withWidth()(Routes);