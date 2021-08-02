import React, { useContext, useState } from 'react'
import {
    Avatar, Button, Card, Typography,
    makeStyles, Grid, Slide
} from '@material-ui/core';
import { Link } from "react-scroll";
import html2canvas from 'html2canvas';
import {
    GetAppOutlined, PublishSharp,
} from '@material-ui/icons';
import First from './Tabs/First';
import PostData from '../Fetch/postData1'
import MyContext from '../helper/themeContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            // margin: theme.spacing(1),
        },
    },
    btn: {
        borderRadius: '50px',
        minWidth: '150px',
        marginRight: '2%'
    },
    purple: {
        backgroundColor: '#93ADEF',
        height: '40px',
        width: '40px',
        marginRight: '0px',
    },
    label: {
        boxShadow: '0px 1px 6px #666',
        display: 'flex',
        paddingTop: '5px',
        color: '#008FFF',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px'
    },
    signbox: {
        borderColor: 'gray',
        borderWidth: '1px',
        borderRadius: '5px',
        borderStyle: 'solid',
        marginBottom: '5%'
    },
    txt: {
        textAlign: 'left',
        marginLeft: '5%',
        fontWeight: 'bold',
    },

}));
const sidebarItems = [{ num: 1, text: '(First)' },
{ num: 2, text: 'Birth Date' },
{ num: 3, text: 'Patient signature' },
{ num: 4, text: 'There by revoke my consent for the release of above information' },
{ num: 5, text: 'Patient / guardian signature' },
{ num: 6, text: 'NEUROBEHAVORIAL MEDICINE CONSULTANTS' },
{ num: 7, text: 'Please circle which type of payment (s) may apply' },
{ num: 8, text: 'Neurobehavorial staff witness/Title' },
{ num: 9, text: 'NEUROBEHAVORIAL MEDICINE CONSULTANTS TELEPHONE/WRITTEN COMMUNICATION CONSENT' },
{ num: 10, text: 'Patient name' },
{ num: 11, text: 'I would prefer to be called at (check all that apply)' },
{ num: 12, text: 'Work' },
{ num: 13, text: 'yes this office may leave check all that apply voice mail at my home' },
{ num: 14, text: 'Information may be mailed at home' },
{ num: 15, text: 'Parent/ guardian singature' },
{ num: 16, text: 'Witnesss signature' },
{ num: 17, text: 'Consent to Mental health and telehealth services' },
{ num: 18, text: 'Patient signature' },
{ num: 19, text: 'S NEUROBEHAVORIAL MEDICINE' },
]

const Gen_patient_Info = () => {
    const classes = useStyles();
    const [select, setSelect] = useState(1);
    const context = useContext(MyContext);
    const [file, setFile] = useState('')

    const handleDownload = async () => {
        await html2canvas(document.getElementById('Consent_Form_First'),
            {
                useCORS: true,
                allowTaint: false,
                letterRendering: true,
                logging: true,
            }).then(function (canvas) {

                let uri = canvas.toDataURL("image/png");
                var link = document.createElement("a");
                link.download = "consent-page-one";
                link.href = uri;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                // delete link;
            });
    }
    const formDownload = () => {
        PostData(
            this.context.BaseUrl + "/downloadConsentForm",
            200,
            {
                id: 1,
                files: ''
            },
            context.state.user.token,
            // PostSubmit
        );
    }


    console.log(select);
    return (
        <Card raised={false} style={{ overflow: 'hidden' }}>
            <Grid container >
                <Grid md={4} xs={12} sm={12} item >
                    <div id="Refferal_SideBar_Container">
                        <div id="Refferal_SideBar_List_Wrapper">
                            {sidebarItems.map(({ num, text }) =>
                                <Link activeClass="active"
                                    to={num}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={1000}>
                                    <div key={num}
                                        className="Refferal_SideBar_List_Item"
                                        onClick={() => setSelect(num)}
                                        style={{ display: 'flex', cursor: 'pointer' }}>
                                        <span>
                                            <Avatar style={{
                                                width: '25px', height: '25px',
                                                backgroundColor: select === num ? '#396df0' : '#93ADEF'
                                            }}
                                                className={classes.purple}>
                                                <Typography style={{
                                                    fontSize: '15px'
                                                }}>
                                                    {num}
                                                </Typography>
                                            </Avatar>
                                        </span>
                                        <Typography style={{
                                            color: select === num ? '#396df0' : '#93ADEF'
                                        }} className={classes.txt}> {text} </Typography>
                                    </div>
                                </Link>)}
                        </div>
                    </div>
                </Grid>

                <Grid md={8} sm={12} xs={12} item
                    style={{ padding: '10px', height: '100%' }} >
                    < Typography variant='h4' style={{
                        marginTop: '20px', zIndex: 10, backgroundColor: 'white'
                    }} align='left' >
                        General Patient information</Typography>
                    {/* <p>{file[0]?.name}</p> */}
                    <Grid container justify='flex-end'>
                        <label for="file-upload" style={{
                            boxShadow: '0px 1px 6px #666',
                            display: 'flex',
                            paddingTop: '5px',
                            color: '#008FFF',
                            textAlign: 'center',
                            width: '20%',
                            justifyContent: 'center',
                            background: '#FFFFFF',
                            borderRadius: '20px'
                        }}
                            id='Patient_Info_Buttons2'>
                            <PublishSharp /> Upload</label>
                        <input id="file-upload" type="file" onChange={e => setFile(e.target.files)} style={{ display: 'none' }} />
                        <Button className={classes.btn} onClick={handleDownload}
                            id='Patient_Info_Buttons2'
                            variant="contained"> <GetAppOutlined /> Download </Button>
                    </Grid>
                    <div style={{
                        overflow: 'hidden'
                    }}>
                        {sidebarItems.map((v, i) => <First
                            key={i}
                            title={v.num}
                            id={v.num}
                        />)}
                    </div>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Gen_patient_Info
