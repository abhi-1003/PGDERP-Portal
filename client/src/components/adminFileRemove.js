import React, {Component} from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../config";
import RemoveIcon from '@mui/icons-material/Remove';

class adminFileRemover extends Component{
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
      }

    btnClickedHandler(){
        this.props.clicked(this.props.value)

        const body = {
            id : this.props.value
        }

        const url = BACKEND_URL + "/admin/zipDocs";

        axios.post(url, body, {
            headers:{
                "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt")
            }
        })
        .then((res) => {
            const docs = res.data.data;
            Object.keys(docs).map((doc) => {
                const delete_url = BACKEND_URL + "/files/removeFiles/" + docs[doc]
                axios.post(delete_url, {
                    headers:{
                        "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt")
                    }
                })
                .then(
                    console.log(res.status)
                )
            })
        })
    }

    render(){
        return(
            <Button
            style = {{
                fontSize: "18px",
            backgroundColor: "#CECE5A",
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
                <RemoveIcon />
            </Button>
        )
    }
}

export default adminFileRemover;