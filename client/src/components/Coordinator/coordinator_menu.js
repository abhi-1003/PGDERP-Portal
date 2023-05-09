import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles(theme => ({
  menuButton: {
    position:'absolute',
    left:'40px',
    top:'40px',
    background:'#FECA0A',
  },
  drawer: {
    width: 250,
    display:'flex',
    // flexDirection:'column-reverse',
    // background:""
  },
  user:{
    display:'flex',
    flexDirection:'column',
    flexWrap:'wrap',
    height:'200px',
    alignItems:'center'
  },
  button:{
    position:'absolute',
    top:'calc(100% - 46.25px)',
    width:'100%',
    padding:'10px'
  },
}));

function CoordinatorMenu() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.user}>
        <AccountCircleIcon sx={{ fontSize: 80, padding:'30px' }} />
        <Typography variant='h5'>Welcome!</Typography>
        </div>
        <Button className={classes.button} style={{background:"red"}} variant="contained" size='large'><LogoutIcon/>Logout</Button>
      </Drawer>
    </>
  );
};

export default CoordinatorMenu;