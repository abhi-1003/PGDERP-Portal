import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DownloadIcon from '@mui/icons-material/Download';
import ViewIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles((theme) => ({
    homeContent: {
        padding: theme.spacing(4),

    },
    title: {
        fontFamily: 'Franklin Gothic Medium',
        fontSize: '2rem',
        color: '#057BDB',
    },
    tableContainer: {
        margin: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        borderRadius: "5px"

    },
    table: {
        borderRadius: "5px",
    },
    tableHeadCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        background: "#05AAE2",
        paddingLeft: theme.spacing(3),
        color: 'white',
    },
    tableCell: {
        paddingLeft: theme.spacing(3),

    },
    button: {
        margin: '0px 10px',
        color: 'white',
        fontSize: '0.75rem'
    }
}));

function Application4(props) {
    const {data}=props
    const classes = useStyles();


    return (
        <div>
            <div className={classes.homeContent}>
                <Typography variant='h5' className={classes.title}>Documents Submitted</Typography><br />
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="30%" style={{ textAlign: 'center' }}><b>Sr. No.</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="70%" style={{ textAlign: 'center' }}><b>Document Name</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">1</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            SSC Equivalent (Std X/level 10) Marksheet
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">2</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            HSC Equivalent (Std XII/level 12) Marksheet
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">3</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            Graduation All Semester Grade sheets, Passing Certificate, Degree certificate
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">4</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            Aadhar / Passport
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">5</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            Professional Experience
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">6</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            Other Courses
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">7</TableCell>
                                <TableCell className={classes.tableCell} width="70%">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={7}>
                                            Single Document Containing Self Declaration form and Edication Declaration form
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <Typography  style={{width:'100%', textAlign:'center'}}><b>Bank Details</b></Typography>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table className={classes.table}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={classes.tableCell} style={{ textAlign: 'center' }} width="30%">1</TableCell>
                                    <TableCell className={classes.tableCell} width="70%">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={7}>
                                                Single Document Containing Self Declaration form and Edication Declaration form
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><DownloadIcon />Download</Button>
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small'><ViewIcon />View</Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer><br />
            </div>
        </div >
    )
}

export default Application4