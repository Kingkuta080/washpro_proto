import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ViewIcon from '@mui/icons-material/Visibility';
import { apiController } from '../../axios';
import { useSnackStore } from '../../store';

const Gutters = () => {
  const [gutters, setGutters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGutter, setSelectedGutter] = useState<any | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newGutterData, setNewGutterData] = useState({
    picture: '',
    ward: '',
    village: '',
    hamlet: '',
    geolocation: { type: 'Point', coordinates: [0, 0] },
    condition: '',
    status: '',
    dischargePoint: '',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { setAlert } = useSnackStore();

  useEffect(() => {
    fetchGutters();
  }, []);

  const fetchGutters = async () => {
    setLoading(true);
    try {
      const data = await apiController.get('/gutters');
      setGutters( data || []);
    } catch (error) {
      console.error('Error fetching gutters:', error);
      setAlert({ variant: 'error', message: 'Failed to fetch gutters' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditGutter = (gutter: any) => {
    setSelectedGutter(gutter);
    setNewGutterData(gutter);
    setOpenEditModal(true);
    setAnchorEl(null);
  };

  const handleUpdateGutter = async () => {
    if (!selectedGutter?._id) return;

    try {
      setLoading(true);
      const response = await apiController.put(`/gutters/${selectedGutter._id}`, newGutterData);
      setAlert({ variant: 'success', message: response.message || 'Gutter updated successfully' });
      setOpenEditModal(false);
      fetchGutters();
    } catch (error) {
      console.error('Error updating gutter:', error);
      setAlert({ variant: 'error', message: 'Failed to update gutter' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGutter = async () => {
    if (!selectedGutter?._id) return;

    try {
      setLoading(true);
      const response = await apiController.delete(`/gutters/${selectedGutter._id}`);
      setAlert({ variant: 'success', message: response.message || 'Gutter deleted successfully' });
      setOpenDeleteModal(false);
      fetchGutters();
    } catch (error) {
      console.error('Error deleting gutter:', error);
      setAlert({ variant: 'error', message: 'Failed to delete gutter' });
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, gutter: any) => {
    setSelectedGutter(gutter);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Gutters Overview Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Gutters Overview
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#1e3a8a' }}>
                      <TableCell sx={{ color: 'white' }}>Ward</TableCell>
                      <TableCell sx={{ color: 'white' }}>Village</TableCell>
                      <TableCell sx={{ color: 'white' }}>Hamlet</TableCell>
                      <TableCell sx={{ color: 'white' }}>Condition</TableCell>
                      <TableCell sx={{ color: 'white' }}>Status</TableCell>
                      <TableCell sx={{ color: 'white' }}>Discharge Point</TableCell>
                      <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : (
                      gutters.map((gutter) => (
                        <TableRow key={gutter._id}>
                          <TableCell>{gutter.ward}</TableCell>
                          <TableCell>{gutter.village}</TableCell>
                          <TableCell>{gutter.hamlet}</TableCell>
                          <TableCell>{gutter.condition}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                bgcolor:
                                  gutter.status === 'Maintained'
                                    ? '#dcfce7'
                                    : '#fef9c3',
                                color:
                                  gutter.status === 'Maintained'
                                    ? '#166534'
                                    : '#854d0e',
                                px: 2,
                                py: 0.5,
                                borderRadius: 1,
                                display: 'inline-block',
                              }}
                            >
                              {gutter.status}
                            </Box>
                          </TableCell>
                          <TableCell>{gutter.dischargePoint}</TableCell>
                          <TableCell>
                            <IconButton
                              aria-label="view"
                              onClick={() => {
                                setAlert({ variant: 'info', message: 'View functionality not implemented yet.' });
                              }}
                            >
                              <ViewIcon />
                            </IconButton>
                            
                            <IconButton
                              aria-label="more"
                              onClick={(event) => handleMenuClick(event, gutter)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedGutter?._id === gutter._id}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={() => { handleEditGutter(gutter); handleMenuClose(); }}>Edit</MenuItem>
                              <MenuItem onClick={() => { setSelectedGutter(gutter); setOpenDeleteModal(true); handleMenuClose(); }}>Delete</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>

        {/* Edit Gutter Modal */}
        <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
          <DialogTitle>Edit Gutter</DialogTitle>
          <DialogContent>
            <TextField
              label="Ward"
              value={newGutterData.ward}
              onChange={(e) => setNewGutterData({ ...newGutterData, ward: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Village"
              value={newGutterData.village}
              onChange={(e) => setNewGutterData({ ...newGutterData, village: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Hamlet"
              value={newGutterData.hamlet}
              onChange={(e) => setNewGutterData({ ...newGutterData, hamlet: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Condition"
              value={newGutterData.condition}
              onChange={(e) => setNewGutterData({ ...newGutterData, condition: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              value={newGutterData.status}
              onChange={(e) => setNewGutterData({ ...newGutterData, status: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Discharge Point"
              value={newGutterData.dischargePoint}
              onChange={(e) => setNewGutterData({ ...newGutterData, dischargePoint: e.target.value })}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
            <Button onClick={handleUpdateGutter} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Update'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <DialogTitle>Delete Gutter</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this gutter?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
            <Button onClick={handleDeleteGutter} color="error" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
};

export default Gutters;
