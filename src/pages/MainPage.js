import { Button, Grid, Paper, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import CustomCarousel from '../components/CustomCarousel';

import ErrorIcon from '@material-ui/icons/Error';

const MainPageStyle = theme => ({

    paperRoot: {

    },
    paper1: {
        width: '100%',
        height: '300px',
        background: '#081C3F',
        borderRadius: '0px'
    },
    paper2: {
        width: '100%',
        height: '300px',
        background: '#38D6CC',
        borderRadius: '0px'

    },
    paper3: {
        width: '100%',
        height: '300px',
        background: '#008FFF',
        borderRadius: '0px'

    },
    papersRoot: {
        transform: 'translateY(-100px)'
    },
    buttonRoot: {
        background: '#FF300A',
        color: 'white'
    },
    helpText:
    {
        color: '#4c4c4c',
        marginLeft: '10px',
    }
});

class MainPgae extends Component {
    constructor(props) {
        super(props);
        this.state = { isDialogOpen: false }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container>

                <CustomCarousel />

                <Grid container direction="row" justify="center" className={classes.papersRoot}>
                    <Grid item md={3}>
                        <Paper className={classes.paper1}>

                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper className={classes.paper2}>
                        </Paper>
                    </Grid>
                    <Grid item md={3}>
                        <Paper className={classes.paper3}>

                        </Paper>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item md={6}>
                        <div style={{ width: '100%', textAlign: 'center', transform: 'translateY(-50px)' }}>
                            <Button variant="contained" className={classes.buttonRoot}
                                startIcon={<ErrorIcon />}
                            >
                                Please Note
                        </Button>
                            <span className={classes.helpText}>
                                Call 000 if you require immediate medical assistance
                        </span>

                        </div>
                    </Grid>

                </Grid>

            </Grid>);
    }
}

export default withStyles(MainPageStyle)(MainPgae);