import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { BACKEND_URL } from "../../config";
import axios from "axios";
import ReactLoading from 'react-loading';

// const data = {
//     ID: "",
//     course: "",
//     coursePreference: [],
//     lastName: "",
//     firstName: "",
//     middleName: "",
//     Address: "",
//     permanentAddress: "",
//     email: "",
//     gender: "",
//     phyDis: "",
//     number: "",
//     PHname: "",
//     PHemail: "",
//     PHnumber: "",
//     dob: '',
//     domicileState: "",
//     nationality: "",
//     InstituteSSC: "",
//     InstituteHSC: "",
//     SSCFrom: "",
//     HSCFrom: "",
//     SSCTo: "",
//     HSCTo: "",
//     SSCmarks: "",
//     HSCmarks: "",
//     Diplomamarks: "",
//     InstituteGrad: "",
//     SpecializationGrad: "",
//     GradFrom: "",
//     GradTo: "",
//     FinalYearMarksGrad: "",
//     AggregateMarksGrad: "",
//     DeadBacklogsGrad: "",
//     AliveBacklogGrad: "",
//     InstitutePostGrad: "",
//     SpecializationPostGrad: "",
//     PostGradFrom: "",
//     PostGradTo: "",
//     FinalYearMarksPostGrad: "",
//     AggregateMarksPostGrad: "",
//     DeadBacklogsPostGrad: "",
//     AliveBacklogPostGrad: ""
//   }

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
}));

function Application1(props) {
    const [newdata, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const id=props.data;
    const url = BACKEND_URL + `/student/personalDetails?id=${id}`;
    useEffect(() => {
      
        axios
          .get(url)
          .then((response) => {
            setData(response.data);
            setLoading(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    const classes = useStyles();

    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    }

    return (
        <div>
            <div className={classes.homeContent}>
                {loading === false ? <Typography variant='h5' >Loading...</Typography>: (
                    <>
                    <Typography variant='h5' className={classes.title}>Personal Details</Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="10%"><b>Sr.No.</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="30%"><b>Candidate Details</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="60%"><b></b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">1</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Candidate Id</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.ID}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">2</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Course</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.course}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">3</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Campus Preference</TableCell>
                                <TableCell className={classes.tableCell} width="60%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        {newdata.campusPreference!==undefined? newdata.campusPreference.map((pre) => {
                                            return (
                                                <Grid item xs={12} sm={4}>
                                                    <b>{pre}</b>
                                                </Grid>
                                            )
                                        }):null}
                                       
                                    </Grid>
                                    
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">4</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Name (Mr/Ms/Mrs)</TableCell>
                                <TableCell className={classes.tableCell} width="60%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={4}>
                                            <b>{newdata.lastName}</b> <br/> Surname
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <b>{newdata.firstName}</b><br/> First Name
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <b>{newdata.middleName}</b><br/> Father/Husband's Name
                                        </Grid>
                                    </Grid>
                                    
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">5</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Postal Address</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.Address}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">6</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Permanent Address</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.permanentAddress}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">7</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Email-Id</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.email}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">8</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Gender</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.gender}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">9</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Physical Disabilities</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.phyDis}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">10</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Phone No. with STD Code</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">11</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Parents/Husband's Name</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.PHname}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">12</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Parents/Husband's Email-Id</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.PHemail}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">13</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Parents/Husband's Mobile No.</TableCell>
                                <TableCell className={classes.tableCell} width="60%">{newdata.PHnumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">14</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Date of Birth</TableCell>
                                <TableCell className={classes.tableCell} width="60%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={4}>
                                            {newdata.dob[0]}/{newdata.dob[1]}/{newdata.dob[2]}
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <b>Age as on date:</b>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            {newdata.age}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">15</TableCell>
                                <TableCell className={classes.tableCell} width="30%">Domicile State of Candidate</TableCell>
                                <TableCell className={classes.tableCell} width="60%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={4}>
                                            {newdata.domicileState}
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <b>Nationality: </b>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            {newdata.nationality}
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
                )}
            </div>
        </div>
    )
}

export default Application1