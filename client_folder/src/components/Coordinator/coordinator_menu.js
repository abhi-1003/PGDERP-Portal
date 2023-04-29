import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  menuButton: {
    position:'absolute',
    left:'40px',
    top:'20px',
    background:'#FECA0A',
  },
  drawer: {
    width: 250,
    display:'flex',
    flexDirection:'column-reverse',
  },
  // button:{
  //   position:'relative',
  //   bottom:'90%',
  // },
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
        <Button className={classes.button} style={{background:"red"}} variant="contained" size='large'><LogoutIcon/>Logout</Button>
      </Drawer>
    </>
  );
};

export default CoordinatorMenu;