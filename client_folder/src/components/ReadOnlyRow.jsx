import React from "react";
import { Box, Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core'
import { renderButton } from './common/displayComponents'

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
  
      <TableRow>
      <TableCell>{contact.courseName}</TableCell>
      <TableCell>{contact.uniName}</TableCell>
      <TableCell>{contact.specialization}</TableCell>
      <TableCell>{contact.periodFrom}</TableCell>
      <TableCell>{contact.periodTo}</TableCell>
      <TableCell>{contact.grade}</TableCell>
      <TableCell>
        {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}
       
        {renderButton({label:"Delete", handleOnClick: () => handleDeleteClick(contact.id)})}
      </TableCell>
    </TableRow>
    
  );
};

export default ReadOnlyRow;