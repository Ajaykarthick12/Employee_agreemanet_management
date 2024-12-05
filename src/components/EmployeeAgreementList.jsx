import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Paper, TextField, InputAdornment, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const EmployeeAgreementList = () => {
  const [agreements, setAgreements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newAgreement, setNewAgreement] = useState({ name: '', department: '', position: '', agreementDate: '' });
  const [editAgreement, setEditAgreement] = useState(null);
  const [viewAgreement, setViewAgreement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // State for Menu anchor
  const [selectedAgreementId, setSelectedAgreementId] = useState(null); // State for selected agreement

  // Fetch agreements from the API
  useEffect(() => {
    axios
      .get('http://localhost:5000/agreements') 
      .then((response) => setAgreements(response.data))
      .catch((error) => console.error('Error fetching agreements:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAgreements = agreements.filter((agreement) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      agreement.name.toLowerCase().includes(lowercasedSearchTerm) ||
      agreement.department.toLowerCase().includes(lowercasedSearchTerm) ||
      agreement.position.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  // Handle modal open/close for create agreement
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // Handle modal open/close for view agreement
  const handleOpenViewModal = (agreement) => {
    setViewAgreement(agreement);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setViewAgreement(null);
  };

  // Handle modal open/close for editing agreement
  const handleOpenEditModal = (agreement) => {
    setEditAgreement(agreement);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditAgreement(null);
  };

  // Handle input change for forms
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (editAgreement) {
      setEditAgreement((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setNewAgreement((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:5000/agreements', newAgreement)
      .then((response) => {
        setAgreements((prevAgreements) => [...prevAgreements, response.data]);
        handleCloseModal();
        setNewAgreement({ name: '', department: '', position: '', agreementDate: '' });
      })
      .catch((error) => console.error('Error creating agreement:', error));
  };

  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:5000/agreements/${editAgreement.id}`, editAgreement)
      .then((response) => {
        setAgreements((prevAgreements) =>
          prevAgreements.map((agreement) =>
            agreement.id === editAgreement.id ? response.data : agreement
          )
        );
        handleCloseEditModal();
      })
      .catch((error) => console.error('Error editing agreement:', error));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/agreements/${selectedAgreementId}`)
      .then(() => {
        setAgreements((prevAgreements) =>
          prevAgreements.filter((agreement) => agreement.id !== selectedAgreementId)
        );
        setAnchorEl(null); // Close menu after deletion
      })
      .catch((error) => console.error('Error deleting agreement:', error));
  };

  const handleMenuClick = (event, agreementId) => {
    setAnchorEl(event.currentTarget); // Set anchor for the menu
    setSelectedAgreementId(agreementId); // Store the selected agreement ID
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
    setSelectedAgreementId(null);
  };

  return (
    <div className="EmployeeAgreementList-container" style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      <h2>Employee Agreements</h2>

      {/* Add New Agreement Button */}
      <Button variant="contained" color="primary" onClick={handleOpenModal}>Add New Agreement</Button>

      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ width: '70vw', marginBottom: '20px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              🔍
            </InputAdornment>
          ),
        }}
      />

      {/* Table Component */}
      <Paper elevation={3} style={{ width: '70vw', overflow: 'hidden' }}>
        <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '1px solid #ddd' }}>Employee Name</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Department</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Position</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Agreement Date</TableCell>
              <TableCell style={{ border: '1px solid #ddd' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgreements.map((agreement) => (
              <TableRow key={agreement.id}>
                <TableCell style={{ border: '1px solid #ddd' }}>{agreement.name}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{agreement.department}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{agreement.position}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>{agreement.agreementDate}</TableCell>
                <TableCell style={{ border: '1px solid #ddd' }}>
                  <Button color="inherit" onClick={(event) => handleMenuClick(event, agreement.id)}>
                    <MoreHorizIcon />
                  </Button>

                  {/* Actions Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedAgreementId === agreement.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => { handleOpenViewModal(agreement); handleMenuClose(); }}>View</MenuItem>
                    <MenuItem onClick={() => { handleOpenEditModal(agreement); handleMenuClose(); }}>Edit</MenuItem>
                    <MenuItem onClick={() => { handleDelete(); handleMenuClose(); }}>Delete</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Modal for Creating New Agreement */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create New Agreement</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee Name"
            name="name"
            variant="outlined"
            fullWidth
            value={newAgreement.name}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Department"
            name="department"
            variant="outlined"
            fullWidth
            value={newAgreement.department}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Position"
            name="position"
            variant="outlined"
            fullWidth
            value={newAgreement.position}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Agreement Date"
            name="agreementDate"
            variant="outlined"
            type="date"
            fullWidth
            value={newAgreement.agreementDate}
            onChange={handleInputChange}
            style={{ marginBottom: '10px' }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Editing Agreement */}
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Agreement</DialogTitle>
        <DialogContent>
          {editAgreement && (
            <>
              <TextField
                label="Employee Name"
                name="name"
                variant="outlined"
                fullWidth
                value={editAgreement.name}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Department"
                name="department"
                variant="outlined"
                fullWidth
                value={editAgreement.department}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Position"
                name="position"
                variant="outlined"
                fullWidth
                value={editAgreement.position}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Agreement Date"
                name="agreementDate"
                variant="outlined"
                type="date"
                fullWidth
                value={editAgreement.agreementDate}
                onChange={handleInputChange}
                style={{ marginBottom: '10px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Modal for Viewing Agreement */}
      <Dialog open={openViewModal} onClose={handleCloseViewModal}>
        <DialogTitle>View Agreement</DialogTitle>
        <DialogContent>
          {viewAgreement ? (
            <>
              <TextField
                label="Employee Name"
                variant="outlined"
                fullWidth
                value={viewAgreement.name}
                disabled
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Department"
                variant="outlined"
                fullWidth
                value={viewAgreement.department}
                disabled
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Position"
                variant="outlined"
                fullWidth
                value={viewAgreement.position}
                disabled
                style={{ marginBottom: '10px' }}
              />
              <TextField
                label="Agreement Date"
                variant="outlined"
                type="date"
                fullWidth
                value={viewAgreement.agreementDate}
                disabled
                style={{ marginBottom: '10px' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewModal} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeAgreementList;
