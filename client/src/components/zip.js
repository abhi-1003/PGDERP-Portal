import React, { Component } from "react";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";
import { BACKEND_URL } from "../config";
import JSZip from  'jszip';
import { saveAs } from 'file-saver';

class zip extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);

    const url = BACKEND_URL + "/admin/zipDocs";

    const body = {
        id: this.props.value
    }

    const zip = new JSZip()

    axios.post(url, body , {
        headers: {
            "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"), 
        }
    })
    .then((res) => {
        const docs = res.data.data;
        const folder = zip.folder(this.props.value)
        // console.log(docs)
        Object.keys(docs).map((doc) => {
            const blobPromise = axios.get(
                BACKEND_URL + "/files/get/" + docs[doc], {
                    responseType: "blob"
                }
            )
            .then((res)=> {
                let contentType = res.data.type
                const file = new Blob([res.data], {type: contentType})
                return Promise.resolve(file);
            })
            if(doc == "sign" || doc == "photo"){
                folder.file(doc + ".png", blobPromise)
            }
            else{
                folder.file(doc + ".pdf", blobPromise)
            }
            // console.log(folder)
        })

        zip.generateAsync({type:"blob"})
        .then(blob => saveAs(blob, this.props.value + ".zip"))
        .catch(e => console.log(e));
    })
    
  }
  render() {
    return (
        <Button 
        style={{
            fontSize: "18px",
            backgroundColor: "#feca0a",
            color: "#012d5e",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            padding: "10px 15px",
            textAlign: "center",
            transition: "200ms",
            boxSizing: "border-box",
            border: "0",
            fontSize: "16px",
            userSelect: "none",
            touchAction: "manipulation",
          }}
          onClick={this.btnClickedHandler}
        >
            <DownloadIcon />
            
          </Button>
    )
  }
}

export default zip;