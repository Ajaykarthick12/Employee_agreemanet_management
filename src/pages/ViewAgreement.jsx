import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';

const ViewAgreement = () => {
  const { id } = useParams();  // Get the agreement ID from the URL
  const [agreement, setAgreement] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/agreements/${id}`)
      .then((response) => setAgreement(response.data))
      .catch((error) => console.error('Error fetching agreement:', error));
  }, [id]);

  return (
    <div className='view-container'>
    <Paper className='view' style={{ padding: '20px' }}>
      {agreement ? (
        <>
          <Typography variant="h4" style={{ fontWeight:'bold' }}>Employee Agreement Details</Typography>
          <Typography variant="h6">Employee Name: {agreement.name}</Typography>
          <Typography variant="h6">Department: {agreement.department}</Typography>
          <Typography variant="h6">Position: {agreement.position}</Typography>
          <Typography variant="h6">Agreement Date: {agreement.agreementDate}</Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Paper>
    </div>
  );
};

export default ViewAgreement;
