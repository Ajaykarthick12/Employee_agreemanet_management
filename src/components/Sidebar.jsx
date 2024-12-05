import React,{useState} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton } from '@mui/material';
import { Dashboard, FileCopy } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EmployeeAgreementList from './EmployeeAgreementList';
import Agreements from '../pages/Agreements';
const Sidebar = ({setPage}) => {
    
  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div className="sidebar">
        <div className="inner-sidebar">
          <div className="sidebar-header">
            <h2>Employee Agreement</h2>
          </div>
          <List style={{padding:"5px"}}> 
          <Divider />
          <h3>Overview</h3>
              <ListItemIcon style={{cursor:"pointer", width:"100%"} } onClick={()=> setPage(<EmployeeAgreementList/>)}>
                <SpaceDashboardIcon/>
              <ListItemText primary="Dashboard" style={{color:"black"}}/>
              </ListItemIcon>
              <br />
              <Divider />
              <br />
              <ListItemIcon style={{cursor:"pointer", width:"100%"}} onClick={()=> setPage(<Agreements/>)} >
                <FileCopy />
              <ListItemText primary="Agreements"  style={{color:"black"}} />
              </ListItemIcon>
              <br />
              <Divider />
          </List>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
