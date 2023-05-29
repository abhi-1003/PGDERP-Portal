import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CoordinatorMenu from './coordinator_menu';
import Header from './coordinator_header'
import HomeContent from './home_content'
import Application from './application';
import {
  Routes,
  Route,
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  coordinator: {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#f0f4f7',
    backgroundImage: 'url(images/back1.png)',
    top: 0,
    paddingTop: '5px',
    paddingBottom: '10px',
    color: '#3C546B',
    fontFamily: 'Lato, sans-serif',
    fontSize: '16px',
    lineHeight: '20px',
    wordWrap: 'break-word',
  },
  coordinatorHome: {
    maxWidth: '1100px',
    margin: '0 auto',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 6px rgba(100, 100, 100, 0.3)',
  },
}));

function Coordinator() {
  const classes = useStyles();
  return (
    <div className={classes.coordinator}>
      <CoordinatorMenu />
      <div className={classes.coordinatorHome}>
        <Header />
          <Routes>
            <Route path="/*" element={<HomeContent />} />
            <Route path="/application/:id" element={<Application />} />
          </Routes>
      </div>
    </div>
  )
}

export default Coordinator