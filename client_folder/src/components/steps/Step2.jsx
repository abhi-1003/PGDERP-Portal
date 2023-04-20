import { Box, Grid, Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@material-ui/core'
import React from 'react'
import { renderText, renderButton, renderInputText } from '../common/displayComponents'
export default function Step2({state, handleOnChange, handleNext, handlePrev}){
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
                            <TableCell>Examination</TableCell>
                            <TableCell>Name of the Institute or University</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                           <TableCell>SSC</TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "InstituteSSC", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "SSCFrom", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                            <TableCell>{renderInputText({label:"", 
                name: "SSCTo", 
                state, 
                handleOnChange: handleOnChange })}</TableCell> 
                        </TableRow>
                        <TableRow>
                           <TableCell>HSC</TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "InstituteHSC", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "HSCFrom", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                            <TableCell>{renderInputText({label:"", 
                name: "HSCTo", 
                state, 
                handleOnChange: handleOnChange })}</TableCell> 
                        </TableRow>
                        <TableRow>
                           <TableCell>Diploma</TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "InstituteDiploma", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>
                           <TableCell>{renderInputText({label:"", 
                name: "DiplomaFrom", 
                state, 
                handleOnChange: handleOnChange })}</TableCell>  
                            <TableCell>{renderInputText({label:"", 
                name: "DiplomaTo", 
                state, 
                handleOnChange: handleOnChange })}</TableCell> 
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2} justifyContent='space-between'>
                    <Box p={2}>
                    {renderButton({label:"prev", handleOnClick: handlePrev})}
                    </Box>
                    <Box p={2}>
                    {renderButton({label:"next", handleOnClick: handleNext})}
                    </Box>
            </Grid>                     
        </Paper>
    )
}
