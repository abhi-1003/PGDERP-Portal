import React, {useMemo, useState, useRef} from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { BACKEND_URL } from "../config";
import axios from "axios";

const Grid = () => {

    const gridRef= useRef();

    const [rowData, setRowData] = useState();
    let columnDefs = [];

    // Pushing all column fields
    columnDefs.push({field: "Name"})
    columnDefs.push({field: "ID"})
    columnDefs.push({field: "Course"})
    columnDefs.push({field: "Email-ID"})
    columnDefs.push({field: "Mobile"})
    columnDefs.push({field: "First Name"})
    columnDefs.push({field: "Middle Name"})
    columnDefs.push({field: "Last Name"})
    columnDefs.push({field: "Address"})
    columnDefs.push({field: "Permanent Address"})
    columnDefs.push({field: "Gender"})
    columnDefs.push({field: "Physical Disability"})
    columnDefs.push({field: "Parents/Husband's Name"})
    columnDefs.push({field:"Parents/Husband's Email"});
    columnDefs.push({field: "Parents/Husband's Number"})
    columnDefs.push({field: "Domicile State"})
    columnDefs.push({field: "Nationality"})
    columnDefs.push({field: "Caste"})
    columnDefs.push({field:"Age"})
    columnDefs.push({ field: "Diploma" });
  columnDefs.push({ field: "Drop for Graduation" });
  columnDefs.push({ field: "Graduation Period" });
  columnDefs.push({ field: "Graduation to PG" });
  columnDefs.push({ field: "HSC" });
  columnDefs.push({ field: "HSC to Diploma" });
  columnDefs.push({ field: "SSC to Diploma" });
  columnDefs.push({ field: "SSC to HSC" });
  columnDefs.push({ field: "Institute - SSC" });
  columnDefs.push({ field: "SSC - Marks" });
  columnDefs.push({ field: "Institute - HSC" });
  columnDefs.push({ field: "HSC - Marks" });
  columnDefs.push({ field: "Institute - Diploma" });
  columnDefs.push({ field: "Diploma Marks" });
  columnDefs.push({ field: "Graduation Institute" });
  columnDefs.push({ field: "Graduation Specialization" });
  columnDefs.push({ field: "Graduation Final Year Marks" });
  columnDefs.push({ field: "Graduation Aggregation Marks" });
  columnDefs.push({ field: "Graduation Dead Backlog" });
  columnDefs.push({ field: "Graduation Alive Backlog" });
  columnDefs.push({ field: "PG Institute" });
  columnDefs.push({ field: "PG Specialization" });
  columnDefs.push({ field: "PG Final Year Marks" });
  columnDefs.push({ field: "PG Aggregation Marks" });
  columnDefs.push({ field: "PG Dead Backlog" });
  columnDefs.push({ field: "PG Alive Backlog" });


    const searchDivStyle = {backgroundColor:"#dedede", padding:10}

    const searchStyle = {
        width:"100%",
        padding:"10px 20px",
        borderRadius:20,
        outline:0,
        border:"2px #68bf40 solid",
        fontSize: "100%"
    }

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter:true,
        floatingFilter: true,
        resizable: true
    }))

    let gridApi;

    const onGridReady = (params) => {
        const url = BACKEND_URL + "/admin/allStudentDetails"
        let all_rows = []
        axios.get(url)
        .then((res) => {
            let students = res.data;
            Object.keys(students).map((student, index) => {
                // console.log(students[student])
                let row = {}
                if(students[student]["name"]){
                    row["Name"] = students[student]["name"];
                }
                if(students[student]["email"]){
                    row["Email-ID"] = students[student]["email"];
                }
                if(students[student]["mobile"]){
                    row["Mobile"] = students[student]["mobile"];
                }
                if(students[student]["personalInfo"]){
                    if("ID" in students[student]["personalInfo"]){
                        row["ID"] = students[student]["personalInfo"]["ID"];
                    }
                    if("course" in students[student]["personalInfo"]){
                        row["Course"] = students[student]["personalInfo"]["course"];
                    }
                    if("lastName" in students[student]["personalInfo"]){
                        row["Last Name"] = students[student]["personalInfo"]["lastName"]
                    }
                    if("firstName" in students[student]["personalInfo"]){
                        row["First Name"] = students[student]["personalInfo"]["firstName"]
                    }
                    if("middleName" in students[student]["personalInfo"]){
                        row["Middle Name"] = students[student]["personalInfo"]["middleName"]
                    }
                    if("Address" in students[student]["personalInfo"]){
                        row["Address"] = students[student]["personalInfo"]["Address"];
                    }
                    if("permanentAddress" in students[student]["personalInfo"]){
                        row["Permanent Address"] = students[student]["personalInfo"]["permanentAddress"];
                    }
                    if("gender" in students[student]["personalInfo"]){
                        row["Gender"] = students[student]["personalInfo"]["gender"]
                    }
                    if("phyDis" in students[student]["personalInfo"]){
                        row["Physical Disability"] = students[student]["personalInfo"]["phyDis"]
                    }
                    if("PHname" in students[student]["personalInfo"]){
                        row["Parents/Husband's Name"] = students[student]["personalInfo"]["PHname"]
                    }
                    if("PHemail" in students[student]["personalInfo"]){
                        row["Parents/Husband's Email"] = students[student]["personalInfo"]["PHemail"]
                    }
                    if("PHnumber" in students[student]["personalInfo"]){
                        row["Parents/Husband's Number"] = students[student]["personalInfo"]["PHnumber"]
                    }
                    if("domicileState" in students[student]["personalInfo"]){
                        row["Domicile State"] = students[student]["personalInfo"]["domicileState"]
                    }
                    if("nationality" in students[student]["personalInfo"]){
                        row["Nationality"] = students[student]["personalInfo"]["nationality"]
                    }
                    if("caste" in students[student]["personalInfo"]){
                        row["Caste"] = students[student]["personalInfo"]["caste"]
                    }
                    if("age" in students[student]["personalInfo"]){
                        row["Age"] = students[student]["personalInfo"]["age"]
                    }

                }
                if (students[student]["academicsInfo"]) {
                    if ("DiplomaFilled" in students[student]["academicsInfo"]) {
                      row["Diploma"] =
                        students[student]["academicsInfo"]["DiplomaFilled"];
                    }
                    if ("DroptoGrad" in students[student]["academicsInfo"]) {
                      row["Drop for Graduation"] =
                        students[student]["academicsInfo"]["DroptoGrad"];
                    }
                    if ("GradPeriod" in students[student]["academicsInfo"]) {
                      row["Graduation Period"] =
                        students[student]["academicsInfo"]["GradPeriod"];
                    }
                    if ("GradtoPostGrad" in students[student]["academicsInfo"]) {
                      row["Graduation to PG"] =
                        students[student]["academicsInfo"]["GradtoPostGrad"];
                    }
                    if ("HSCFilled" in students[student]["academicsInfo"]) {
                      row["HSC"] = students[student]["academicsInfo"]["HSCFilled"];
                    }
                    if ("HSCtoDiploma" in students[student]["academicsInfo"]) {
                      row["HSC to Diploma"] =
                        students[student]["academicsInfo"]["HSCtoDiploma"];
                    }
                    if ("SSCtoDiploma" in students[student]["academicsInfo"]) {
                      row["SSC to Diploma"] =
                        students[student]["academicsInfo"]["SSCtoDiploma"];
                    }
                    if ("SSCtoHSC" in students[student]["academicsInfo"]) {
                      row["SSC to HSC"] = students[student]["academicsInfo"]["SSCtoHSC"];
                    }
                    if ("InstituteSSC" in students[student]["academicsInfo"]) {
                      row["Institute - SSC"] =
                        students[student]["academicsInfo"]["InstituteSSC"];
                    }
                    if ("SSCmarks" in students[student]["academicsInfo"]) {
                      row["SSC - Marks"] = students[student]["academicsInfo"]["SSCmarks"];
                    }
                    if ("InstituteHSC" in students[student]["academicsInfo"]) {
                      row["Institute - HSC"] =
                        students[student]["academicsInfo"]["InstituteHSC"];
                    }
                    if ("HSCmarks" in students[student]["academicsInfo"]) {
                      row["HSC - Marks"] = students[student]["academicsInfo"]["HSCmarks"];
                    }
                    if ("InstituteDiploma" in students[student]["academicsInfo"]) {
                      row["Institute - Diploma"] =
                        students[student]["academicsInfo"]["InstituteDiploma"];
                    }
                    if ("Diplomamarks" in students[student]["academicsInfo"]) {
                      row["Diploma Marks"] =
                        students[student]["academicsInfo"]["Diplomamarks"];
                    }
                    if ("InstituteGrad" in students[student]["academicsInfo"]) {
                      row["Graduation Institute"] =
                        students[student]["academicsInfo"]["InstituteGrad"];
                    }
                    if ("SpecializationGrad" in students[student]["academicsInfo"]) {
                      row["Graduation Specialization"] =
                        students[student]["academicsInfo"]["SpecializationGrad"];
                    }
                    if ("FinalYearMarksGrad" in students[student]["academicsInfo"]) {
                      row["Graduation Final Year Marks"] =
                        students[student]["academicsInfo"]["FinalYearMarksGrad"];
                    }
                    if ("AggregateMarksGrad" in students[student]["academicsInfo"]) {
                      row["Graduation Aggregation Marks"] =
                        students[student]["academicsInfo"]["AggregateMarksGrad"];
                    }
                    if ("DeadBacklogsGrad" in students[student]["academicsInfo"]) {
                      row["Graduation Dead Backlog"] =
                        students[student]["academicsInfo"]["DeadBacklogsGrad"];
                    }
                    if ("AliveBacklogGrad" in students[student]["academicsInfo"]) {
                      row["Graduation Alive Backlog"] =
                        students[student]["academicsInfo"]["AliveBacklogGrad"];
                    }
                    if ("InstitutePostGrad" in students[student]["academicsInfo"]) {
                      row["PG Institute"] =
                        students[student]["academicsInfo"]["InstitutePostGrad"];
                    }
                    if ("SpecializationPostGrad" in students[student]["academicsInfo"]) {
                      row["PG Specialization"] =
                        students[student]["academicsInfo"]["SpecializationPostGrad"];
                    }
                    if ("FinalYearMarksPostGrad" in students[student]["academicsInfo"]) {
                      row["PG Final Year Marks"] =
                        students[student]["academicsInfo"]["FinalYearMarksPostGrad"];
                    }
                    if ("AggregateMarksPostGrad" in students[student]["academicsInfo"]) {
                      row["PG Aggregation Marks"] =
                        students[student]["academicsInfo"]["AggregateMarksPostGrad"];
                    }
                    if ("DeadBacklogsPostGrad" in students[student]["academicsInfo"]) {
                      row["PG Dead Backlog"] =
                        students[student]["academicsInfo"]["DeadBacklogsPostGrad"];
                    }
                    if ("AliveBacklogPostGrad" in students[student]["academicsInfo"]) {
                      row["PG Alive Backlog"] =
                        students[student]["academicsInfo"]["AliveBacklogPostGrad"];
                    }
                }
                all_rows.push(row);
            })
            setRowData(all_rows)
        }
            
        )
        gridApi = params.api;
        params.api.paginationGoToPage(0);
    }

    const onExportClick = () => {
        gridRef.current.api.exportDataAsCsv();
    }

    const onPaginationChange = (pageSize) => {
        gridRef.current.api.paginationSetPageSize(Number(pageSize))
    }

    const onFilterTextChange = (e) => {
        gridRef.current.api.setQuickFilter(e.target.value)
    }
    return(
        <div>
            <button onClick={() => onExportClick()}>Export</button>
            <select onChange={(e) => onPaginationChange(e.target.value)}>
                <option value = '10'>10</option>
                <option value = '25'>25</option>
                <option value = '50'>50</option>
            </select>
            <div style={searchDivStyle}>
                <input type="search" style={searchStyle} onChange={onFilterTextChange} placeholder="Enter..."/>
            </div>
            <div className="ag-theme-alpine" style={{height:"80vh", width: "100%", justifyContent:"center", alignItems:"center"}}>
                <AgGridReact
                ref = {gridRef}
                rowData = {rowData}
                columnDefs = {columnDefs}
                defaultColDef = {defaultColDef}
                rowSelection="multiple"
                animateRows = {true}
                onGridReady={onGridReady}
                pagination = {true}
                paginationPageSize={10}
                suppressDragLeaveHidesColumns = {true}
                rowDragManaged = {true}
                suppressRowClickSelection = {true}
                cacheQuickFilter = {true}
                />
            </div>

        </div>
    )
}

export default Grid;