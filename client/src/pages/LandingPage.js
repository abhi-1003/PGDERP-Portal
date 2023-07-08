import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Navigate, useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/images/logo1.png'
import PGDLogo from '../components/images/pgdcoep.PNG';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { Paper } from "@material-ui/core";
import { renderText } from "../components/common/displayComponents";
import './landingPage.css';

const drawerWidth = 280;

function Sidebar(props) {
    const navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{ backgroundColor: '#FFFFE0', minHeight: '100vh' }}>
            <Toolbar />
            <List>
                {props.options &&
                    Object.keys(props.options).map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton onClick={() => navigate(props.options[text])}>
                                <ListItemIcon>
                                    {index === 0 && (
                                        <HomeIcon />
                                    )}
                                    {index === 1 && (
                                        <AppRegistrationIcon />
                                    )
                                    }
                                    {index === 2 && (
                                        <LoginIcon />
                                    )
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex', height: '120px' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: '#00ABE4',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <div className='landing-page-header-container'>
                            <Typography variant="h5" component="div" style={{ fontWeight: "600", color: "black" }}>
                                COEP PG - Diploma Admission Portal
                            </Typography>
                            <div className="landing-page-header-container2">
                                <img src={HeaderLogo} alt="" id="logo1" />
                                <img src={PGDLogo} alt="" id="logo2" />
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    {/* <Outlet /> */}
                    <Paper component={Box} p={2} style={{marginTop: "60px"}}>
                        <Box mt={1} mb={2}>
                            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus recusandae commodi, deserunt id molestias dolorem ratione eligendi aperiam reiciendis saepe nesciunt? Tenetur, dolorem. Harum numquam necessitatibus omnis accusantium dolores veniam!</h4>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>

    );
}

const LandingPage = () => {
    const options = { "Home": "/", "Register": "student/register", "Login": "/student/login" }

    return (
        <>
            <Sidebar options={options} />
        </>
    );
};

export default LandingPage;
