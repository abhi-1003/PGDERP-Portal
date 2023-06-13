import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DownloadIcon from '@mui/icons-material/Download';
import ViewIcon from '@mui/icons-material/Visibility';
import DocViewer from '../../pages/DocViewer';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
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
    const [docSchema, setDocSchema] = useState({
        sscEq: '',
        hscEq: '',
        grad: '',
        aadharPassport: '',
        profExp: '',
        otCourses: '',
        selfDeclaration: '',
    })
    const viewDocument = (e) => {
        // console.log(e.currentTarget.value);
        if(docSchema[e.currentTarget.value] !== ''){
            let filename = docSchema[e.currentTarget.value];
            let contentType = "application/pdf";
            axios
            .get(BACKEND_URL + "/files/get/" + docSchema[e.currentTarget.value],
            {
                responseType: "blob",
            }
            )
            .then((response) => {
                // console.log(response)
                //Create a Blob from the PDF Stream
                const file = new Blob([response.data], { type: contentType });
                // Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                const w = window.open(
                fileURL,
                "",
                "width=800,height=600,left=200,top=200"
                );
                w.onload = function () {
                w.document.title = filename;
                };
            })
            .catch((error) => {
                console.log(error.message);
            });
        }
    }
    useEffect(()=>{
        const url = BACKEND_URL + '/student/getDocsById';
        // console.log(data)
        axios.get(url, {params: {'id': data}})
        .then(function(response){
                // console.log(response);
                setDocSchema(response.data.doc);
            })
        .catch(function(err){
            console.log(err);
        })
    }, [])
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
                                       
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' value="sscEq" onClick={viewDocument}><ViewIcon />View</Button>
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
                                        
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' value="hscEq"><ViewIcon />View</Button>
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
                                        
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' value="grad"><ViewIcon />View</Button>
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
                                        
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' value="aadharPassport"><ViewIcon />View</Button>
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
                                        
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' value="profExp"><ViewIcon />View</Button>
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
                                        
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' vlaue="otCourses"><ViewIcon />View</Button>
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
                                        
                                        <Grid item xs={12} sm={2}>
                                            <Button className={classes.button} style={{ background: "#057BDB" }} variant="contained" size='small' value="selfDeclaration"><ViewIcon />View</Button>
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        </div >
    )
}

export default Application4