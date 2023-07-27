import React, { Component } from "react";
import { Button } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

class zip extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
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