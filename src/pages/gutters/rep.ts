import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Eye, MoreVer, MoreVerticalIconticalIcon } from 'lucide-react';
import { apiController } from '../../axios'; // Adjust the import based on your project structure
import { useSnackStore } from '../../store'; // Adjust the import based on your project structure

const GuttersDashboard: React.FC = () => {
  const [guttersData, setGuttersData] = useState([]); // For the existing gutter data
  const [newData, setNewData] = useState([]); // For the new table data
  const [selectedGutter, setSelectedGutter] = useState(null);
  const [selectedNewData, setSelectedNewData] = useState(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openNewDataModal, setOpenNewDataModal] = useState(false);
  const [openDeleteNewDataModal, setOpenDeleteNewDataModal] = useState(false); // Define the state for delete modal
  const [isLoading, setIsLoading] = useState(false);
  const { setAlert } = useSnackStore();
  const [newGutter, setNewGutter] = useState({
    picture: '',
    ward: '',
    village: '',
    hamlet: '',
    geolocation: { type: 'Point', coordinates: [0, 0] },
    condition: 'Constructed with Block',
    status: 'Maintained',
    dischargePoint: 'yes',
    createdBy: '',
    capturedAt: new Date().toISOString(),
  });
  const [newDataEntry, setNewDataEntry] = useState({
    // Define the structure for the new data entry
    name: '',
    description: '',
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    fetchGutters();
    fetchNewData(); // Fetch new data for the second table
  }, []);

  const fetchGutters = async () => {
    setIsLoading(true);
    try {
      const response = await apiController.get('/gutters');
      setGuttersData(response.data || []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching gutters:', error);
      setAlert({ variant: 'error', message: 'Failed to fetch gutters' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNewData = async () => {
    setIsLoading(true);
    try {
      const response = await apiController.get('/new-data'); // Adjust the endpoint as needed
      setNewData(response.data || []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching new data:', error);
      setAlert({ variant: 'error', message: 'Failed to fetch new data' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewGutter = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await apiController.get(`/gutters/${id}`);
      setSelectedGutter(response.data);
      setOpenViewModal(true);
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to fetch gutter details' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditGutter = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await apiController.get(`/gutters/${id}`);
      setSelectedGutter(response.data);
      setNewGutter(response.data);
      setOpenEditModal(true);
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to fetch gutter details' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGutter = async () => {
    if (!selectedGutter?._id) return;

    try {
      setIsLoading(true);
      const response = await apiController.put(`/gutters/${selectedGutter._id}`, newGutter);
      setAlert({ variant: 'success', message: response.message || 'Gutter updated successfully' });
      setOpenEditModal(false);
      fetchGutters(); // Refresh the gutter list after update
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to update gutter' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGutter = async () => {
    if (!selectedGutter?._id) return;

    try {
      setIsLoading(true);
      const response = await apiController.delete(`/gutters/${selectedGutter._id}`);
      setAlert({ variant: 'success', message: response.message || 'Gutter deleted successfully' });
      setOpenDeleteModal(false);
      fetchGutters(); // Refresh the gutter list after deletion
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to delete gutter' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGutter = async () => {
    try {
      setIsLoading(true);
      const response = await apiController.post('/gutters', newGutter);
      setAlert({ variant: 'success', message: response.message || 'Gutter created successfully' });
      fetchGutters(); // Refresh the gutter list after creation
      setNewGutter({
        picture: '',
        ward: '',
        village: '',
        hamlet: '',
        geolocation: { type: 'Point', coordinates: [0, 0] },
        condition: 'Constructed with Block',
        status: 'Maintained',
        dischargePoint: 'yes',
        createdBy: '',
        capturedAt: new Date().toISOString(),
      }); // Reset form
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to create gutter' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewDataEntry = async () => {
    try {
      setIsLoading(true);
      const response = await apiController.post('/new-data', newDataEntry); // Adjust the endpoint as needed
      setAlert({ variant: 'success', message: response.message || 'New data entry created successfully' });
      fetchNewData(); // Refresh the new data list after creation
      setNewDataEntry({ name: '', description: '', createdAt: new Date().toISOString() }); // Reset form
      setOpenNewDataModal(false);
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to create new data entry' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNewData = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await apiController.get(`/new-data/${id}`); // Adjust the endpoint as needed
      setSelectedNewData(response.data);
      setNewDataEntry(response.data);
      setOpenNewDataModal(true);
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to fetch new data details' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNewData = async () => {
    if (!selectedNewData?._id) return;

    try {
      setIsLoading(true);
      const response = await apiController.put(`/new-data/${selectedNewData._id}`, newDataEntry); // Adjust the endpoint as needed
      setAlert({ variant: 'success', message: response.message || 'New data entry updated successfully' });
      fetchNewData(); // Refresh the new data list after update
      setOpenNewDataModal(false);
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to update new data entry' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNewData = async () => {
    if (!selectedNewData?._id) return;

    try {
      setIsLoading(true);
      const response = await apiController.delete(`/new-data/${selectedNewData._id}`); // Adjust the endpoint as needed
      setAlert({ variant: 'success', message: response.message || 'New data entry deleted successfully' });
      fetchNewData(); // Refresh the new data list after deletion
      setOpenDeleteNewDataModal(false);
    } catch (error) {
      setAlert({ variant: 'error', message: 'Failed to delete new data entry' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Card>
        <Typography variant="h5">Gutters Overview</Typography>
        <Button variant="contained" onClick={() => setOpenNewDataModal(true)}>Add New Gutter</Button>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>IC</TableCell>
                <TableCell>Ward</TableCell>
                <TableCell>Village</TableCell>
                <TableCell>Hamlet</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Discharge Point</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                guttersData.map((gutter) => (
                  <TableRow key={gutter._id}>
                    <TableCell>{gutter.ic}</TableCell>
                    <TableCell>{gutter.ward}</TableCell>
                    <TableCell>{gutter.village}</TableCell>
                    <TableCell>{gutter.hamlet}</TableCell>
                    <TableCell>{gutter.condition}</TableCell>
                    <TableCell>{gutter.status}</TableCell>
                    <TableCell>{gutter.dischargePoint}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewGutter(gutter._id)}>
                        <Eye />
                      </IconButton>
                      <IconButton onClick={() => handleEditGutter(gutter._id)}>
                        <MoreVerticalIcon />
                      </IconButton>
                      <IconButton onClick={() => { setSelectedGutter(gutter); setOpenDeleteModal(true); }}>
                        <MoreVerticalIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* New Data Table */}
      <Card sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>New Data Overview</Typography>
        <Button variant="contained" onClick={() => setOpenNewDataModal(true)}>Add New Data</Button>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                newData.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{new Date(data.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditNewData(data._id)}>
                        <MoreVerticalIcon />
                      </IconButton>
                      <IconButton onClick={() => { setSelectedNewData(data); setOpenDeleteNewDataModal(true); }}>
                        <MoreVerticalIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modals for New Data */}
      <Dialog open={openNewDataModal} onClose={() => setOpenNewDataModal(false)}>
        <DialogTitle>Add New Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newDataEntry.name}
            onChange={(e) => setNewDataEntry({ ...newDataEntry, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newDataEntry.description}
            onChange={(e) => setNewDataEntry({ ...newDataEntry, description: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewDataModal(false)}>Cancel</Button>
          <Button onClick={handleNewDataEntry} color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit New Data Modal */}
      <Dialog open={openNewDataModal} onClose={() => setOpenNewDataModal(false)}>
        <DialogTitle>Edit New Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={newDataEntry.name}
            onChange={(e) => setNewDataEntry({ ...newDataEntry, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newDataEntry.description}
            onChange={(e) => setNewDataEntry({ ...newDataEntry, description: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewDataModal(false)}>Cancel</Button>
          <Button onClick={handleUpdateNewData} color="primary" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal for New Data */}
      <Dialog open={openDeleteNewDataModal} onClose={() => setOpenDeleteNewDataModal(false)}>
        <DialogTitle>Delete New Data</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this entry?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteNewDataModal(false)}>Cancel</Button>
          <Button onClick={handleDeleteNewData} color="error" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GuttersDashboard;