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
} from "@material-ui/core";
import React, { useState, Fragment } from "react";
import { renderText, renderButton } from "../common/displayComponents";
import { nanoid } from "nanoid";
import data from "./data.json";
import ReadOnlyRowExp from "../ReadOnlyRowExp";

export default function Step3(
	state,
	handleOnChange,
	handleNext,
	handlePrev,
	professionalExperienceChange
) {
	const [contacts, setContacts] = useState(data);
	const [addFormData, setAddFormData] = useState({
		companyName: "",
		rankDesignation: "",
		periodFrom: "",
		periodFrom: "",
		workNature: "",
	});
	const handleAddFormSubmit = (event) => {
		event.preventDefault();
		const newContact = {
			id: nanoid(),
			companyName: addFormData.companyName,
			rankDesignation: addFormData.rankDesignation,
			periodFrom: addFormData.periodFrom,
			periodTo: addFormData.periodTo,
			workNature: addFormData.workNature,
		};
		const newContacts = [...contacts, newContact];
		setContacts(newContacts);
		state.professionalExperienceChange(newContacts)
		console.log(state.state)
	};
	const handleDeleteClick = (contactId) => {
		const newContacts = [...contacts];

		const index = contacts.findIndex((contact) => contact.id === contactId);

		newContacts.splice(index, 1);

		setContacts(newContacts);
		state.professionalExperienceChange(newContacts)
		console.log(state.state)
	};

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData);
	};
	return (
		<Paper component={Box} p={2}>
			<Grid container spacing={2} style={{ justifyContent: "center" }}>
				<Box mt={1} mb={2}>
					{renderText({ label: "Professional Experience" })}
				</Box>
			</Grid>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Company Name</TableCell>
						<TableCell>Designation or Rank</TableCell>
						<TableCell>From</TableCell>
						<TableCell>To</TableCell>
						<TableCell>Nature of Work</TableCell>

						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{contacts.map((contact) => (
						<Fragment>
							{/* {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                    // handleEditFormSubmit={handleEditFormSubmit}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )} */}
							<ReadOnlyRowExp
								contact={contact}
								handleDeleteClick={handleDeleteClick}
							/>
						</Fragment>
					))}
				</TableBody>
			</Table>
			<form>
				{/* <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        /> */}
				{/* fullName: "",
    address: "",
    phoneNumber: "",
    email: "", */}
				{/* {renderInputText({label:"Enter", 
                name: "FullName",                  
                handleOnChange: handleAddFormChange })} */}
				<TextField
					label="Name of the company"
					// color={color ? color : "primary"}
					variant="outlined"
					name="companyName"
					// fullWidth={true}
					size="small"
					onChange={handleAddFormChange}
					style={{ margin: "1px" }}
				/>
				<TextField
					label="Designation and Rank"
					// color={color ? color : "primary"}
					variant="outlined"
					name="rankDesignation"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
				/>

				<TextField
					label="Period From"
					// color={color ? color : "primary"}
					variant="outlined"
					name="periodFrom"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
				/>
				<TextField
					label="Period To"
					// color={color ? color : "primary"}
					variant="outlined"
					name="periodTo"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
				/>
				<TextField
					label="Nature of Work"
					// color={color ? color : "primary"}
					variant="outlined"
					name="workNature"
					// fullWidth={true}
					size="small"
					style={{ margin: "1px" }}
					onChange={handleAddFormChange}
				/>
				{/* <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an addres..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        /> */}

				{renderButton({
					label: "Add",
					handleOnClick: handleAddFormSubmit,
				})}
			</form>
			<Grid container spacing={2} justifyContent="space-between">
				<Box p={2}>
					{renderButton({ label: "prev", handleOnClick: handlePrev })}
				</Box>
				<Box p={2}>
					{renderButton({
						label: "finish",
						handleOnClick: handleNext,
					})}
				</Box>
			</Grid>
		</Paper>
	);
}
