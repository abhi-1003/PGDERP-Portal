import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import headimg from '../../images/COEP.png';

const useStyles = makeStyles((theme) => ({
  header: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    marginBottom: 0,
    width: '100%',
  },
  headerImg: {
    height: 'auto',
    overflow: 'clip',
    overflowClipMargin: 'content-box',
    verticalAlign: 'top',
    width:'100%',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.headerImg}>
          <img src={headimg} alt="" style={{width:'100%'}} />
        </div>
      </div>
    </div>
  );
}
