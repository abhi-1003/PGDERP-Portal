import { Box, Grid, Paper } from '@material-ui/core'
import React from 'react'
import { renderText, renderButton, renderInputText } from '../common/displayComponents'

export default function Step4({state, handleOnChange, handleNext, handlePrev}){
    return(
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Box mt={1} mb={2}>
                {renderText({label:"Other Courses"})} 
                </Box>  

            </Grid>
          <Grid container spacing={2} style={{ marginBottom: "10px"}}>
                <Grid item xs={12} sm={6}>
                {renderInputText({label:"First Name", 
                name: "FirstName", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
                <Grid item xs={12} sm={6}>
                {renderInputText({label:"Last Name", 
                name: "LastName", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid>
            </Grid>    
            <Grid container spacing={2} justifyContent="space-between">
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