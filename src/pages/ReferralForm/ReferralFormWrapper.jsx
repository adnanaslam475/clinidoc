import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import FormPage1 from './FormPage1';
import NewForm from './NewForm';
// import CheckMarkImage from '../../assets/icon-new/checkmark@2x.png';

import SideBarImage from '../../assets/referrals-form-img.png'
import SideBarTickImage from '../../assets/dashbord-referral-ico3.png'

import './referral.css'

// const ReferralFormPage1 = FormPage;


class ReferralFormWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    GetFormPage = () => {
        return <NewForm width={this.props.width} />
        // return <FormPage1 />
    }

    render() {
        const arr = ['List ',
            'List 2 Text Data Here',
            'Lorem Ipsum dolor amet',
            'Lorem Ipsum dolor amet',
            'Lorem Ipsum dolor amet']
        return (
            <div>
                <Grid container style={{ height: '100%' }} >
                    <Grid md={4}item>
                        <div id="Refferal_SideBar_Container">
                            <img src={SideBarImage} width="90%" style={{ marginLeft: '5%' }} />
                            <div id="Refferal_SideBar_List_Heading">
                                Lorem Ipsum
                        </div>
                            <div id="Refferal_SideBar_List_Wrapper">
                                {arr.map((text, i) =>
                                    <div className="Refferal_SideBar_List_Item" key={i}>
                                        <span style={{ verticalAlign: 'middle' }}>
                                            <img width="15px" height='15px' src={SideBarTickImage} alt="ls" />
                                        </span>
                                        <span style={{ verticalAlign: 'initial', textAlign: 'center', marginLeft: '10%' }}> {text} </span>
                                    </div>)}
                            </div>
                        </div>
                    </Grid>
                    <Grid md={8}>
                        {this.GetFormPage()}
                    </Grid>
                </Grid>
            </div>);
    }
}

export default ReferralFormWrapper;