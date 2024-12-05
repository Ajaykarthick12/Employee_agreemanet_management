import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAgreement = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [agreementDate, setAgreementDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAgreement = { name, department, position, agreementDate };

    axios
      .post('http://localhost:5000/agreements', newAgreement)
      .then(() => {
        navigate('/');
      })
      .catch((error) => console.error('Error adding agreement:', error));
  };

  return (
    <div className='CreateAgreement-container'>
    <Paper className='CreateAgreement' style={{ padding: '5%'}}>
      <Typography variant="h4">Create New Agreement</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Department"
          variant="outlined"
          fullWidth
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Position"
          variant="outlined"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Agreement Date"
          type="date"
          variant="outlined"
          fullWidth
          value={agreementDate}
          onChange={(e) => setAgreementDate(e.target.value)}
          required
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
          Create Agreement
        </Button>
      </form>
    </Paper>
    </div>
  );
};

export default CreateAgreement;
