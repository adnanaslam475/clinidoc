import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Avatar, Button, TextareaAutosize,
  Toolbar, makeStyles, Dialog, DialogTitle
} from "@material-ui/core";
import {
  EditorState,
  convertToRaw,
  ContentState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import MyContext from "../../../helper/themeContext";
import { Edit } from "@material-ui/icons";
import "./CustomEmailDialog.css";
import EmailIcon from "../../../assets/email-icon.png";
import SupportAvatarIcon from "../../../assets/CliniDoc Support.png";
import PostData from "../../../Fetch/postData1";

const useStyles = makeStyles({
  DialogRoot: {
    width: "auto",
    boxSizing: "unset",
    maxWidth: "calc(100%)",
    background: "#F1F1F1",
  },
  DialogTitle: {
    color: "white",
    background: "#396CF0",
  },
  headIcon: {
    marginRight: "10px",
    width: "36px",
    verticalAlign: "bottom",
  },
  DialogContent: {
    width: "calc(100% - 100px)",
    margin: "20px",
    padding: "20px 30px",
    paddingBottom: "50px",
    boxSizing: "unset",
    position: "relative",
    background: "white",
    borderRadius: "5px",
  },

  subHead: {
    fontWeight: 600,
    fontSize: "18px",
    marginLeft: "10px",
    marginRight: "10px",
  },

  subHeadEmail: {
    fontSize: "12px",
    paddingBottom: "5px",
  },

  buttonRoot: {
    background: "#008FFF",
    width: "calc(100px)",
    position: "relative",
    right: "10px",
    float: "right",
    marginBottom: "20px",
    textTransform: "none",
    color: "white",
  },
  buttonRootB: {
    background: "#696A6E",
    // marginLeft:'20px',
    width: "calc(100px)",
    position: "relative",
    right: "20px",
    float: "right",
    marginBottom: "20px",
    textTransform: "none",
    color: "white",
  },
  AdditionalFieldWrapper: {
    paddingBottom: "20px",
    paddingLeft: "50px",
  },
  editEmailtext: {
    resize: "none",
    width: "97%",
    overflow: "hidden",
    marginTop: "12px",
    outline: "none",
    borderColor: "lightgray",
    borderRadius: "5px",
  },
  NotesField: {
    display: "block",
    marginTop: "10px",
    marginBottom: "20px",
    width: "100%",
    "& .MuiInputBase-root": {
      width: "100%",
    },
  },
});

export default function CustomEmailDialog(props) {
  const context = useContext(MyContext);
  const [loading, setLoading] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const { patient_name, patient_email,id } = props.activeRow.referral?props.activeRow.referral:{};
  const classes = useStyles();
  const length = id?id.toString().length:0;

  const EncodedId = btoa(id)
  

  const htmlone = `Hi <bold>${patient_name || ''}</bold>,<br/>
Welcome to CliniDoc! Please feel free to use our application for evaluation purposes.<br/>
Your user name is: tryout26<br/>
The case sensitive password is: Sensitive@UserPass<br/>
It is important to note that this account has been made clinical to you for evaluation purpose only. IT SHOULD BE USED FOR DOCUMENTING REAL PATIENTS.<br/>
You may log in by following this link:<br/>
<a href="https://clinidoc-devp.web.app/quick-appointment/${EncodedId}">https://clinidoc-devp.web.app/quick-appointment/${EncodedId}</a><br/>
If you are having any problems logging into the system, please call our support team at 433-539-3773.<br/>
Additionaly, the Support section of our website contains a variety of resources available to new users,<br/>
available at <a href="https://www.clinidoc.com/content/support">https://www.clinidoc.com/content/support</a><br/>
Again, thankyou for signing up for a clinidoc.<br/> Sincerely,<br/>
The clinidoc Team<br/> sales@clinidoc.com<br/>1-466-847-3550, ext.201<br/>`;
  const contentBlock = htmlToDraft(htmlone);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const editState = EditorState.createWithContent(contentState);
  const [editorState, setEditorState] = useState(editState);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };


 



  const { onClose, open } = props;

  const handleClose = () => {
    setLoading(false);
    onClose();
  };

  const handleSubmit = () => {
    setLoading(true);
    let req = {
      email: patient_email,
      subject: "CliniDoc Support",
      content: '',
    };
    PostData(
      context.BaseUrl + "/referral/sendmail",
      200,
      req,
      context.state.user.token,
      _Submitted
    );
    setEdit(false);
  };

  const _Submitted = () => {
    setLoading(false);
    onClose();
  };

  const _Save = () =>
  {
    setEdit(!edit);
  } 


  const onEdit = () => {
    setEdit(!edit);
  };
  return (
    <Dialog
      aria-labelledby="referral-dialog-title"
      open={open}
      onClose={handleClose}
    >
        {        console.log(props.activeRow)}
      <div className={classes.DialogRoot}>
        <DialogTitle className={classes.DialogTitle} id="referral-dialog-title">
          <img src={EmailIcon} className={classes.headIcon} /> CliniDoc Email
        </DialogTitle>
        <div className={classes.DialogContent}>
          <Toolbar disableGutters>
            <Avatar alt="R" src={SupportAvatarIcon} />
            <span className={classes.subHead}> CliniDoc Support </span>
            <span className={classes.subHeadEmail}>
              {" "}
              {"<ticket@clinidoc.com>"}{" "}
            </span>
            <div
              style={{
                float: "right",
                right: 0,
                position: "absolute",
                cursor: "pointer",
              }}
              onClick={onEdit}
            >
              <Edit />
            </div>
          </Toolbar>

          {edit ? (
            <div style={{ minWidth: "300px" }}>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                toolbarHidden
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
              }}
            />
          )}
          {edit ? (
            <Button
              onClick={_Save}
              className={classes.buttonRoot}
              variant="contained"
            >
              Save
            </Button>
          ) : (
            <>
              {" "}
              <Button
                onClick={handleSubmit}
                className={classes.buttonRoot}
                variant="contained"
              >
                Send
              </Button>
              <Button
                onClick={handleClose}
                className={classes.buttonRootB}
                variant="contained"
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}