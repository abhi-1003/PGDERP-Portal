import { React, Component } from "react";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/Navbar/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Sidebar from "../components/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
// import downloadApplicationPDF from "../components/ApplicationPDF";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ResponsiveDrawer from "../components/ResposiveDrawer";

const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "100%",
    borderStyle: "solid",
    backgroundColor: "#BEBEBE",
    borderColor: "#bfbfbf",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol1: {
    width: "25%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol2: {
    width: "50%",
    borderStyle: "solid",
    backgroundColor: "#E8E8E8",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol3: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 10,
  },
  declareHead: {
    fontSize: 11,
    marginTop: 10,
  },
  declare: {
    fontSize: 11,
  },
  place: {
    fontSize: 11,
    marginTop: 25,
  },
  date: {
    fontSize: 11,
    textAlign: "left",
  },
  sign: {
    fontSize: 11,
    textAlign: "right",
  },
  view: {
    width: "80%",
    height: "80",
    padding: 0,
    marginBottom: 5,
    backgroundColor: "white",
  },
  image: {
    objectFit: "cover",
  },
});

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      name: "",
      email: "",
      pdfName: "",
      pdfEmail: "",
      middleName: "",
      gender: "",
      PGverification: "",
      PGremarks: "",
      UGverification: "",
      UGremarks: "",
      DOCverification: "",
      DOCremarks: "",
      ENTverification: "",
      ENTremarks: "",
      FEEverification: "",
      FEEremarks: "",
      PIverification: "",
      PIremarks: "",
      appId: null,
      isInterestedCoepRPET: false,
      isInterestedCoepEntrance: false,
      givenGate: false,
      givenPet: false,
      gateScore: "",
      gateLastDateOfValidation: "",
      petDetails: "",
      petYear: "",
    };
  }

  componentDidMount() {  
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedAppId = localStorage.getItem("pgderpID");
    console.log(storedName, storedEmail, storedAppId);
    this.setState({
      name: storedName,
      email: storedEmail,
      appId: storedAppId
    });
  
  } 
//   async componentDidMount() {
//     if (localStorage.getItem("pgderp-website-jwt")) {
//     //   try {
//     //     axios
//     //       .get(BACKEND_URL + "/students/me", {
//     //         headers: { "phd-website-jwt": this.state.token },
//     //       })
//     //       .then((res) => {
//     //         const user = res.data.user;
//     //         console.log(user);
//     //         // Get the verification status of documents
//     //         let dv = 0,
//     //           dp = 0,
//     //           dm = 0;
//     //         this.setState({ docVerification: "pending" });
//     //         user.documentsUploaded.map((doc) => {
//     //           if (doc.verification === "mod_req") {
//     //             dm = dm + 1;
//     //           } else if (doc.verification === "pending") {
//     //             dp = dp + 1;
//     //           } else {
//     //             dv = dv + 1;
//     //           }
//     //         });
//     //         if (dm > 0) {
//     //           this.setState({ docVerification: "mod_req" });
//     //         } else if (dp === 0 && dm === 0) {
//     //           this.setState({ docVerification: "verified" });
//     //         }
//     //         if (user.documentsUploaded.length === 0) {
//     //           this.setState({ docVerification: "pending" });
//     //         }

//     //         this.setState({
//     //           pdfName: user.personalInfo.name,
//     //           pdfEmail: user.personalInfo.email,
//     //           appId: user.applicationId ? user.applicationId : null,
//     //           aadhar: user.personalInfo.aadhar,
//     //           middleName: user.personalInfo.middleName,
//     //           gender: user.personalInfo.gender,
//     //           category: user.personalInfo.category,
//     //           physicallyDisabled: user.personalInfo.physicallyDisabled,
//     //           dob:
//     //             user.personalInfo.dob ? user.personalInfo.dob.slice(0, 10) : user.personalInfo.dob, 
//     //           mobile: user.mobile,
//     //           cgpaUG: user.academicsUG.cgpa10,
//     //           degreeUG: user.academicsUG.degree,
//     //           instituteUG: user.academicsUG.institute,
//     //           specialUG: user.academicsUG.specialization,
//     //           cgpaPG: user.academicsPG.cgpa10,
//     //           degreePG: user.academicsPG.degree,
//     //           institutePG: user.academicsPG.institute,
//     //           percentPG: user.academicsPG.percentageMarks,
//     //           scoreGATE: user.entranceDetails?.Gate?.score,
//     //           name: user.name,
//     //           email: user.email,
//     //           mis: user.mis,
//     //           isInterestedCoepRPET: user.entranceDetails?.isInterestedCoepRPET,
//     //           isInterestedCoepEntrance:
//     //             user.entranceDetails?.isInterestedCoepEntrance,
//     //           PGverification: user.academicsPG.verification,
//     //           PGremarks: user.academicsPG.remarks,
//     //           UGverification: user.academicsUG.verification,
//     //           UGremarks: user.academicsUG.remarks,
//     //           DOCremarks: "None",
//     //           ENTverification: user.entranceDetails.verification,
//     //           ENTremarks: user.entranceDetails.remarks,
//     //           FEEverification: user.feeDetails.verification,
//     //           FEEremarks: user.feeDetails.remarks,
//     //           PIverification: user.personalInfo.verification,
//     //           PIremarks: user.personalInfo.remarks,
//     //           givenGate: user.entranceDetails?.givenGate,
//     //           givenPet: user.entranceDetails?.givenPet,
//     //           gateScore: user.entranceDetails?.Gate?.score,
//     //           gateLastDateOfValidation:
//     //             user.entranceDetails?.Gate?.lastDateOfValidation,
//     //           petDetails: user.entranceDetails?.sppuPet?.details,
//     //           petYear: user.entranceDetails?.sppuPet?.year,
//     //         });
//     //         console.log(user.entranceDetails, this.state.givenPet);
//     //       });
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     }
//   }

  render() {
    console.log(this.props)
    // const MyDoc = () => (
    //   <Document>
    //     <Page style={styles.body}>
    //       <View style={styles.view}>
    //         <Image style={styles.image} src={pic} alt="image" />
    //       </View>
    //       <View style={styles.table}>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableColHeader}>
    //             <Text style={{ ...styles.tableCellHeader, fontWeight: "600" }}>
    //               APPLICATION ID : {this.state.appId}
    //             </Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableColHeader}>
    //             <Text style={styles.tableCellHeader}>Personal Details</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Candidate's Full name</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.pdfName}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Father's Name</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.middleName}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Application ID</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.appId}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Aadhar</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.aadhar}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Mail id</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.email}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Gender</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.gender}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Category</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.category}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Physically Disabled?</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>
    //               {this.state.physicallyDisabled}
    //             </Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Date of Birth</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>
    //               {this.state.dob}
    //             </Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Mobile Number</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.mobile}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableColHeader}>
    //             <Text style={styles.tableCellHeader}>Academics UG</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>CGPA</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.cgpaUG}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Degree</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.degreeUG}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Institute</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.instituteUG}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Specialization</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.specialUG}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableColHeader}>
    //             <Text style={styles.tableCellHeader}>Academics PG</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>CGPA</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.cgpaPG}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Degree</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.degreePG}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Institute</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.institutePG}</Text>
    //           </View>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Percentage Marks</Text>
    //           </View>
    //           <View style={styles.tableCol}>
    //             <Text style={styles.tableCell}>{this.state.percentPG}</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableColHeader}>
    //             <Text style={styles.tableCellHeader}>Entrance Details</Text>
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol2}>
    //             <Text style={styles.tableCell}>Is Interested in COEP RPET</Text>
    //           </View>
    //           <View style={styles.tableCol3}>
    //             {this.state.isInterestedCoepRPET ? (
    //               <Text style={styles.tableCell}>Yes</Text>
    //             ) : (
    //               <Text style={styles.tableCell}>No</Text>
    //             )}
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol2}>
    //             <Text style={styles.tableCell}>
    //               Is Interested in COEP Entrance
    //             </Text>
    //           </View>
    //           <View style={styles.tableCol3}>
    //             {this.state.isInterestedCoepEntrance ? (
    //               <Text style={styles.tableCell}>Yes</Text>
    //             ) : (
    //               <Text style={styles.tableCell}>No</Text>
    //             )}
    //           </View>
    //         </View>
    //         {/* Gate Details  */}
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol2}>
    //             <Text style={styles.tableCell}>Given Gate</Text>
    //           </View>
    //           <View style={styles.tableCol3}>
    //             {this.state.givenGate ? (
    //               <Text style={styles.tableCell}>Yes</Text>
    //             ) : (
    //               <Text style={styles.tableCell}>No</Text>
    //             )}
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Score</Text>
    //           </View>
    //           {this.state.givenGate ? (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               {this.state.gateScore}
    //             </Text>
    //           ) : (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               -
    //             </Text>
    //           )}
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Last Date of Validation</Text>
    //           </View>
    //           {this.state.givenGate ? (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               {this.state.gateLastDateOfValidation}
    //             </Text>
    //           ) : (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               -
    //             </Text>
    //           )}
    //         </View>
    //         {/* Pet Details  */}
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol2}>
    //             <Text style={styles.tableCell}>Given SPPU PET</Text>
    //           </View>
    //           <View style={styles.tableCol3}>
    //             {this.state.givenPet ? (
    //               <Text style={styles.tableCell}>Yes</Text>
    //             ) : (
    //               <Text style={styles.tableCell}>No</Text>
    //             )}
    //           </View>
    //         </View>
    //         <View style={styles.tableRow}>
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Details</Text>
    //           </View>
    //           {this.state.givenPet ? (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               {this.state.petDetails}
    //             </Text>
    //           ) : (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               -
    //             </Text>
    //           )}
    //           <View style={styles.tableCol1}>
    //             <Text style={styles.tableCell}>Year</Text>
    //           </View>
    //           {this.state.givenPet ? (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               {this.state.petYear}
    //             </Text>
    //           ) : (
    //             <Text
    //               style={{
    //                 ...styles.tableCol,
    //                 fontSize: "10px",
    //                 fontWeight: "300",
    //                 paddingTop: "5px",
    //                 paddingLeft: "5px",
    //               }}
    //             >
    //               -
    //             </Text>
    //           )}
    //         </View>
    //       </View>
    //       <Text style={styles.declareHead}>Declaration:</Text>
    //       <Text style={styles.declare}>
    //         I have read all the rules of admission and after understanding these
    //         rules, I have filled this application form for admission to phD in
    //         COEP for the academic year 2020-21. The information given by me in
    //         this application is true to the best of my knowledge and belief. At
    //         any later state, if it is found that I have furnished wrong
    //         information and/or submitted false certificate(s), I am aware that
    //         my admission stands cancelled and fees paid by me will be forfeited.
    //         Further, I will be subject to legal and/or penal action as per the
    //         provisions of the law.
    //       </Text>
    //       <Text style={styles.place}>Place :</Text>
    //       <Text style={styles.date}>Date :</Text>
    //       <Text style={styles.sign}>Signature of Candidate</Text>
    //     </Page>
    //   </Document>
    // );

    return (
      <ResponsiveDrawer options = {['Home', 'Fill Admission Form', 'Download Application', 'Download Self Declaration', 'Logout']}/>   
    );
  }
}

export default StudentHome;
