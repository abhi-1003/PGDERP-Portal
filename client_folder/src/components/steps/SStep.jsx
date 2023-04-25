import { Box, Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core'
import React, { useState } from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { renderText, renderButton, renderInputText, renderText1, renderMultiInputText, renderInputSelect, renderDate, RenderDate, MultipleSelect } from '../common/displayComponents'
const yesterday = dayjs().subtract(1, 'day');
export default function Step2({state, handleOnChange,handleOnChangeDate, handleNext, handlePrev, handleChangePreferences}){
    return(
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Box mt={1} mb={2}>
                {renderText({label:"Educational Qualifaication"})} 
                </Box>  

            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label='Educational Qualifications'>
                    <TableHead>
                        <TableRow>
                            <TableCell>SR No.</TableCell>
                            <TableCell>Candidate Details</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                           <TableCell>1</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Candidate ID:"})} 
          </Box></TableCell>
                           <TableCell>
                {renderInputText({label:"", 
                name: "ID", 
                state, 
                handleOnChange: handleOnChange })}
                </TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>2</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Course:"})} 
          </Box></TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "course", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>3</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Campus Preferences"})} 
          </Box></TableCell>
                           <TableCell>
                            <MultipleSelect state={state} name1='coursePreference' handleChangePreferences={handleChangePreferences}/>
                            </TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>4</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Name:"})} 
          </Box></TableCell>
                           <TableCell><Grid container spacing={2} style={{ marginBottom: "1px"}}>
                <Grid item xs={12} sm={3}>
                {renderMultiInputText({label:"Surname", 
                name: "lastName", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
                <Grid item xs={12} sm={3}>
                {renderMultiInputText({label:"First Name", 
                name: "firstName", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
                <Grid item xs={12} sm={3}>
                {renderMultiInputText({label:"Middle Name", 
                name: "middleName", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
            </Grid>    </TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>5</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Postal Address"})} 
          </Box></TableCell>
                           <TableCell>{renderMultiInputText({label:"", 
                name: "Address", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>6</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Permanent Address"})} 
          </Box></TableCell>
                           <TableCell>{renderMultiInputText({label:"", 
                name: "permanentAddress", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>7</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"E-mail ID"})} 
          </Box></TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "email", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>8</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Gender"})} 
          </Box></TableCell>
                           <TableCell>{renderInputSelect({label:"", 
                name: "gender", 
                state, 
                handleOnChange: handleOnChange,
                arr: [
                    {value:"male",label:"Male"},
                    {value:"female",label:"Female"},
                    {value:"Other",label:"Other"},
                ] })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>9</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Physical Disabilities"})} 
          </Box></TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "phyDis", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>10</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Phone Number"})} 
          </Box></TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "number", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>11</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Parents/Husband's Name:"})} 
          </Box></TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "PHname", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>12</TableCell>
                           <TableCell> <Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Parent's/Husband's Email-ID:"})} 
          </Box></TableCell>
                           <TableCell> {renderInputText({label:"", 
                name: "PHemail", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>13</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Parent's/Husband's Phone Number:"})} 
          </Box></TableCell>
                           <TableCell> {renderInputText({label:"", 
                name: "PHnumber", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>14</TableCell>
                           <TableCell><Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Date of Birth:"})} 
          </Box></TableCell>
                           <TableCell>
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={[
                    'DatePicker',
                ]}
            >   <DemoItem label="">
                           {renderDate({label:"", 
                name: "dob", 
                state, 
                handleOnChangeDate: handleOnChangeDate })}
                 </DemoItem>
                </DemoContainer>
                </LocalizationProvider>
                {renderText1({label:`Age:${state.age}`})}
                            </TableCell>  
                        </TableRow>
                        <TableRow>
                           <TableCell>15</TableCell>
                           <TableCell> <Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Domicile State of Candidate:"})} 
          </Box></TableCell>
                           <TableCell> <Grid container spacing={2} style={{ marginBottom: "1px"}}>
                <Grid item xs={12} sm={3}>
                {renderInputText({label:"", 
                name: "domicileState", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
                <Box mb={2} mt={2} mr={2}>
          {renderText1({label:"Nationality:"})} 
          </Box>
                <Grid item xs={12} sm={3}>
                {renderInputText({label:"", 
                name: "nationality", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
            </Grid></TableCell>  
                        </TableRow>  
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2} justifyContent='flex-end'>
                    <Box p={2}>
                    {renderButton({label:"next", handleOnClick: handleNext})}
                    </Box>
            </Grid>                     
        </Paper>
    )
}
