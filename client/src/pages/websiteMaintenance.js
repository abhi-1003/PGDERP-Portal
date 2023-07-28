import React from 'react';
import pic from "../components/images/header.jpg"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const WebsiteMaintenance = () => {

    return (
        <>
           <Card sx={{ maxWidth: 700 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={pic}
        title="COEP PGD"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        COEP Technological University 
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        PG - Diploma Admission Portal
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Website down for maintenance from 28 July 5:30 PM - 7 PM. Please keep checking the portal regularly. Last date of acceptance of application is till 31st July, 2023,6.00 PM
        </Typography>
      </CardContent>
    </Card>
        </>
    );
};

export default WebsiteMaintenance;
