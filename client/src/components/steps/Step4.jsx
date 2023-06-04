import {
	Box,
	Grid,
	Paper,
	TextField,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
	Button,
	Input,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React, { useState, Fragment, useEffect } from "react";
import { renderText, renderButton } from "../common/displayComponents";
import { nanoid } from "nanoid";
import data from "./data.json";
import ReadOnlyRowExp from "../ReadOnlyRowExp";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export default function Step4() {
    const [docSchema, setDocSchema] = useState({
        sscEq: '',
        hscEq: '',
        grad: '',
        aadharPassport: '',
        profExp: '',
        otCourses: '',
        selfDeclaration: '',
    })
    const [docs,setDocs] = useState([
        {
            "name": "SSC/Equivalent (Std. X/level 10) Marksheet",
            "status": "Pending",
            "file": null,
            "dbName": "sscEq"
        },
        {
            "name": "HSC/Equivalent (Std. XII/level 12) Marksheet",
            "status": "Pending",
            "file": null,
            "dbName": "hscEq"
        },
        {
            "name": "Graduation All Semester Grade Sheets, Passing Certificate, Degree Certificate",
            "status": "Pending",
            "file": null,
            "dbName": "grad"
        },
        {
            "name": "Aadhar/Passport",
            "status": "Pending",
            "file": null,
            "dbName": "aadharPassport"
        },
        {
            "name": "Professional Experience",
            "status": "Pending",
            "file": null,
            "dbName": "profExp"
        },
        {
            "name": "Other Courses",
            "status": "Pending",
            "file": null,
            "dbName": "otCourses"
        },
        {
            "name": "Single Document Containing Self Declaration form and Education Declaration form",
            "status": "Pending",
            "file": null,
            "dbName": "selfDeclaration"
        }
    ])
    function fileUpload(event, index){
        const tempDocs = [...docs];
        const ele = tempDocs[index];
        const data = new FormData();
        data.append('file',event.target.files[0],event.target.files[0].name)
        ele.file = data;
        setDocs(tempDocs);
    }
    function fileSubmit(index){
        const URL = BACKEND_URL + '/files/upload';
        console.log(docs[index].file)
        if(docs[index].file !== null){
            axios.post(URL, docs[index]["file"])
            .then(function(response){
                var tempDoc = docSchema;
                tempDoc[docs[index].dbName] = response.data.filename;
                axios.post(BACKEND_URL + '/files/setUser',{'email':localStorage.getItem("email"),'docName':docs[index]["name"], 'doc': tempDoc})
                .then(function(res){
                    setDocSchema({...docSchema, [docs[index].dbName]: response.data.filename})
                    const tempDocs = [...docs];
                    const ele = tempDocs[index];
                    ele.status = "Submitted";
                    setDocs(tempDocs);
                })
                .catch(function(err){
                    console.log(err);
                })
            })
            .catch(function(error){console.log(error)});
        }
        else{
            window.alert("Please upload a file!")
        }
    }

    useEffect(()=>{
        const url = BACKEND_URL + '/student/getDocs';
        axios.get(url, {params: {'email': localStorage.getItem("email")}})
        .then(function(response){
            if(response.data.doc != undefined && response.data.doc != null){
                var tempDocs = [...docs];
                for (const [k, v] of Object.entries(response.data.doc)){
                    if(v !== ''){
                        for(var i=0; i<tempDocs.length; i++){
                            if(tempDocs[i].dbName === k){
                                tempDocs[i].status = "Submitted";
                                break;
                            }
                        }
                    }
                }
                setDocSchema(response.data.doc);
                setDocs(tempDocs)
            }
        })
        .catch(function(err){
            console.log(err);
        })
        
    }, [])
	return (
        <Table>
           <TableHead>
            <TableRow>
                <TableCell>Sr. No.</TableCell>
                <TableCell>Document Name</TableCell>
                <TableCell>Upload</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead> 
            <TableBody>
                {docs.map((row, i) => {
                    return (
                        <TableRow>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>{row["name"]}</TableCell>
                        <TableCell><input type="file" onChange={(event)=>fileUpload(event, i)}/><CloudUpload style={{cursor: "pointer"}} onClick={()=>fileSubmit(i)}/></TableCell>
                        <TableCell>{row["status"]}</TableCell>
                    </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
