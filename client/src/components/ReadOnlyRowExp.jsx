import React from "react";
import {
    Box,
    Grid,
    Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
} from "@material-ui/core";
import { renderButton } from "./common/displayComponents";

const ReadOnlyRowExp = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <TableRow>
            <TableCell>{contact.companyName}</TableCell>
            <TableCell>{contact.rankDesignation}</TableCell>
            <TableCell>{contact.periodFrom}</TableCell>
            <TableCell>{contact.periodTo}</TableCell>
            <TableCell>{contact.workNature}</TableCell>
            <TableCell>
                {/* <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button> */}

                {renderButton({
                    label: "Delete",
                    handleOnClick: () => handleDeleteClick(contact.id),
                })}
            </TableCell>
        </TableRow>
    );
};

export default ReadOnlyRowExp;
