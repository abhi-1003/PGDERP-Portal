import { Box, Grid, Paper } from '@material-ui/core'
import React from 'react'
import { renderText, renderButton, renderInputText } from '../common/displayComponents'

export default function Finished({state}){
    return( 
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Box mt={1} mb={2}>
                {renderText({label:"Thank You for Submission!"})} 
                </Box>  
            </Grid> 
            <Grid container spacing={2} justifyContent='flex-middle'>
                <Box p={2}>{JSON.stringify(state,null,4)}</Box>
            </Grid>                   
        </Paper>
    )
}