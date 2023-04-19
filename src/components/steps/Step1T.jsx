import { Box, Grid, Paper} from '@material-ui/core'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { renderText, renderButton, renderInputText } from '../common/displayComponents'

export default function Step1({state, handleOnChange, handleNext}){
        const data = [
            {sr: "1", name: "Candidate ID", fill: <Grid item xs={12} sm={6}>
            {renderInputText({label:"Candidate ID", 
            name: "Candidate ID", 
            state, 
            handleOnChange: handleOnChange })}
            </Grid>}
        ];
        const columns = [
            {title: "SR.no", field:'sr'},
            {title: "Candidate Details", field: 'name'},
            {title: "", field: 'fill'}
        ];

    return(
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Box mt={1} mb={2}>
                {renderText({label:"Personal Details"})} 
                </Box>  

            </Grid>
          <Grid container spacing={2} style={{ marginBottom: "10px"}}>
                
              <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                
               />
                {/* <Grid item xs={12} sm={6}>
                {renderInputText({label:"Last Name", 
                name: "LastName", 
                state, 
                handleOnChange: handleOnChange })}
                </Grid> */}
            </Grid>    
            <Grid container spacing={2} justifyContent="flex-end">
                    <Box p={2}>
                    {renderButton({label:"next", handleOnClick: handleNext})}
                    </Box>
            </Grid>                     
        </Paper>
    )
}