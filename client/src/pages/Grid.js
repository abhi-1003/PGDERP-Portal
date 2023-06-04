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
    columnDefs.push({field: "First Name"})
    columnDefs.push({field: "Middle Name"})
    columnDefs.push({field: "Last Name"})
    columnDefs.push({field:"Institute - SSC"});


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
                console.log(students[student])
                let row = {}
                if(students[student]["name"]){
                    row["Name"] = students[student]["name"];
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

                }
                if(students[student]["academicsInfo"]){
                    if("InstituteSSC" in students[student]["academicsInfo"]){
                        row["Institute - SSC"] = students[student]["academicsInfo"]["InstituteSSC"]
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
        gridApi.exportDataAsCsv();
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