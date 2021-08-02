import React, { Component } from "react";
import PostData from "../../../Fetch/postData1";
import MyContext from "../../../helper/themeContext";
import Form1 from "./Form1";
import Form2 from "./Form2";

class InitialContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, fields: [] };
  }

  componentDidMount = () => {
    if (!(this.context.state.currRef && this.context.state.currRef.id)) {
      alert("Unable to load reference!");
      this.context.history.push("/admin/referrals");
    }
  };

  handleNextClick = (fields) => {
    console.log('hndlnxtclik')
    let concatFields = fields.concat(this.state.fields);

    if (this.state.page < 1) {
      console.log('if')
      this.setState({ fields: concatFields, page: this.state.page + 1 });
      this.handleSubmit();
    } else {
      console.log('else')
      this.setState({ fields: concatFields }, () => this.handleSubmit());
    }
  };

  handleSubmit = () => {
    console.log('hndlsubmt')
    this.setState({ loading: true });
    let req = {};
    for (let i = 0; i < this.state.fields.length; i++) {
      let value = this.state.fields[i].value;
      if (this.state.fields[i].name === "dob") {
        value = value.split("T")[0];
      }
      req[this.state.fields[i].name] = value;
    }

    req.referral_id = this.context.state.currRef.id;
    console.log('refer req', req)
    PostData(
      this.context.BaseUrl + "/patient",
      200,
      req,
      this.context.state.user.token,
      this.PostSubmit
    );
  };

  PostSubmit = (response) => {
    this.context.history.push("./general-patient-info");

    if (response.ResponseCode === "Success") {
      this.context.history.push("./general-patient-info");
    }
    else if (response.errors) {
      alert(response.errors[0].msg)
    }
    else {
      this.setState({ loading: false });
      console.log("Server error");
      alert("Server error");
    }
  };

  getForm = () => {
    switch (this.state.page) {
      case 0:
        return <Form1 handleNextClick={this.handleNextClick} />;
      case 1:
        return <Form2 handleSubmit={this.handleNextClick} />;
    }
  };
  render() {
    return <div>{this.getForm()}</div>;
  }
}

InitialContactForm.contextType = MyContext;
export default InitialContactForm;
