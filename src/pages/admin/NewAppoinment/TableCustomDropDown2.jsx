import { Popover, withStyles } from '@material-ui/core';
import React, { Component } from 'react';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MyContext from '../../../helper/themeContext';
 
const CustomDropDownStyles = theme =>
({
    PopOverRoot: {
        '& .MuiPaper-root':
        {
            // background:'rgb(0,0,0,0.1)',
            // width:'34px',
            // transform:'translateY(-37px) !important',
            // borderTopLeftRadius:'15px',
            // borderTopRightRadius:'15px',

            // borderBottomLeftRadius:'15px',
            // borderBottomRightRadius:'15px',
            paddingTop: '5px',
            paddingBottom: '5px',

            textAlign: 'center'

        }
    },

    listWrapper:
    {
        // paddingTop:'20px',
        cursor: 'pointer'
    },

    buttonWrapper:
    {
        paddingTop: '10px',
    }
})
class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = { isCallDialogOpen: false, }
    }

    handleCallOpen = () => {
        this.setState({ isCallDialogOpen: true })
    }

    onCallClose = () => {
        this.setState({ isCallDialogOpen: false })
    }

    getLabel = (value) => {
        if (value === "open") {
            return "Open"
        }
        if (value === "close") {
            return "Close"
        }
        if (value === "pending") {
            return "Pending"
        }
    }

    getColor = (value) => {
        if (value === "open") {
            return "green"
        }
        if (value === "close") {
            return "red"
        }
        if (value === "pending") {
            return "yellow"
        }
    }


    render() {
        const { classes } = this.props;
        const open = Boolean(this.props.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        let actions = this.props.activeRow ? this.props.activeRow.referal_status || [] : [];

        const handleRoute = (action) => {
            // if(action.label==="Approved")
            // {
            //     console.log(this.props.activeRow);
            //     this.context.setState({currRef:this.props.activeRow})
            // }
            // this.context.history.push(action.route)
        }
        return (
            <Popover
                id={id}
                open={open}
                anchorEl={this.props.anchorEl}
                onClose={this.props.handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.PopOverRoot}
            >
                <div className={classes.listWrapper}>
                    <List component="nav" aria-label="action">
                        {this.props.newAppoinmentActions ? this.props.newAppoinmentActions.map((action, key) =>
                            <React.Fragment>
                                <ListItem button disabled={action.isDisabled} onClick={() => handleRoute(action)}>
                                    <ListItemText primary={action.label} />
                                </ListItem>
                                {
                                    key !== (actions.length - 1) &&
                                    <Divider />
                                }
                            </React.Fragment>
                        ) : actions.map((action, key) =>
                            <React.Fragment>
                                <ListItem style={{ background: action.active ? 'rgb(0,0,0,0.1)' : '' }} disabled={action.isDisabled} onClick={() => handleRoute(action)}>
                                    <ListItemText style={{ color: action.active ? this.getColor(action.value) : '' }} primary={action.label || this.getLabel(action.value)} />
                                </ListItem>
                                {
                                    key !== (actions.length - 1) &&
                                    <Divider />
                                }
                            </React.Fragment>
                        )}
                    </List>
                </div>
            </Popover>);
    }
}

DropDown.contextType = MyContext;
export default withStyles(CustomDropDownStyles)(DropDown);