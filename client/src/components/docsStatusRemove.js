import React, {Component} from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../config";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

class docsStatusRemove extends Component{
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
      }

    btnClickedHandler(){
        this.props.clicked(this.props.value)

        const body = {
            id : this.props.value
        }

        const url = BACKEND_URL + "/admin/studentIndi";

        axios.post(url, body, {
            headers:{
                "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt")
            }
        })
        .then((res) => {
            const body = {
                id: res.data.user._id
            }
            axios.post(BACKEND_URL + "/admin/updateStudentDocs", body, {
                headers:{
                    "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt")
                }
            })
            .then((res) => {
                console.log(res.data.message)
            })
        })
    }

    render(){
        return(
            <Button
            style = {{
                fontSize: "18px",
            backgroundColor: "#A076F9",
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
                <RemoveDoneIcon />
            </Button>
        )
    }
}

export default docsStatusRemove;