import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  CircularProgress,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  TextField,
  Button,
} from '@mui/material';
import {
  FilterAlt as FilterAltIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Waves,
  Clear,
  Delete,
  MoreVert as MoreVertIcon,
  Edit,
  Search,
  Visibility,
} from '@mui/icons-material';
import { FaClipboardCheck, FaExclamationTriangle, FaWrench } from 'react-icons/fa';
import { apiController } from '../../axios';

// interface
interface Geolocation {
  type: "Point";
  coordinates: [number, number, number];
}

interface SoakAway {
  _id: string;
  picture: string;
  ward: string;
  village: string;
  hamlet: string;
  geolocation: Geolocation;
  type: "Covered" | "Uncovered";
  status: "Functional" | "Non-Functional";
  condition: "Good" | "Fair" | "Poor";
  createdBy: string;
  capturedAt: string;
  createdAt: string;
  updatedAt: string;
}

const SoakAways = () => {
  const [soakAways, setSoakAways] = useState<SoakAway[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSoakAway, setSelectedSoakAway] = useState<SoakAway | null>(null);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalSoakAways, setTotalSoakAways] = useState(0);
  const [itemsPerPage] = useState(10);

  const fetchSoakAways = async () => {
    setIsLoading(true);
    try {
      const data = await apiController.get('/soak-away');
      setSoakAways(data);
      setTotalSoakAways(data.length);
    } catch (error) {
      console.error('Error fetching soakaway data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSoakAways();
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, soakAway: SoakAway) => {
    setAnchorEl(event.currentTarget);
    setSelectedSoakAway(soakAway);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewClick = () => {
    setOpenViewModal(true);
    handleMenuClose();
  };

  const handleEditClick = () => {
    setOpenEditModal(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
    handleMenuClose();
  };

  const handleDeleteSoakAway = async () => {
    if (!selectedSoakAway) return;

    try {
      await apiController.delete(`/soak-away/${selectedSoakAway._id}`);
      fetchSoakAways();
    } catch (error) {
      console.error('Error deleting soakaway:', error);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const paginatedSoakAways = soakAways.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Analytics calculations
  const totalSoakAwaysCount = soakAways.length;
  const inspectedThisMonthCount = soakAways.filter(soakAway => {
    const capturedDate = new Date(soakAway.capturedAt);
    const currentDate = new Date();
    return (
      capturedDate.getMonth() === currentDate.getMonth() &&
      capturedDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;
  const criticalConditionCount = soakAways.filter(soakAway => soakAway.condition === 'Poor').length;
  const maintenanceDueCount = soakAways.filter(soakAway => soakAway.status === 'Non-Functional').length;

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600, mb: 0.5 }}>
            Soakaways
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Detailed insights about your selected location
          </Typography>
        </Box>
        <Button
          startIcon={<FilterAltIcon />}
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: 'text.primary',
            boxShadow: 1,
            '&:hover': { bgcolor: 'grey.100' },
            textTransform: 'none',
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <StatsCard
          title="Total Soakaways"
          value={totalSoakAwaysCount.toString()}
          icon={<Waves />}
          iconColor="#2196f3"
        />
        <StatsCard
          title="Inspected This Month"
          value={inspectedThisMonthCount.toString()}
          icon={<FaClipboardCheck style={{color: "#16A34A"}}/>}
          iconColor="#4caf50"
          valueColor="#16A34A"
        />
        <StatsCard
          title="Critical Condition"
          value={criticalConditionCount.toString()}
          icon={<FaExclamationTriangle style={{color: "#DC2626"}}/>}
          iconColor="#f44336"
          valueColor="#f44336"
        />
        <StatsCard
          title="Maintenance Due"
          value={maintenanceDueCount.toString()}
          icon={<FaWrench color="#CA8A04" />}
          iconColor="#ff9800"
          valueColor="#ff9800"
        />
      </Box>
      {/* Geographic Risk Distribution */}
      <Paper sx={{ mt: 2, p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Geographic Risk Distribution</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Zone A', 'Zone B', 'Zone C'].map((zone) => (
              <Button
                key={zone}
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  color: 'text.primary',
                  borderColor: 'grey.300'
                }}
              >
                {zone}
              </Button>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            height: 400,
            bgcolor: '#f5f5f5',
            borderRadius: 1,
            position: 'relative',
            overflow: 'hidden'
          }}
        >

          {/* Map Controls */}
          <Paper sx={{ position: 'absolute', top: 16, right: 16, borderRadius: 1 }}>
            <IconButton size="small"><AddIcon /></IconButton>
            <IconButton size="small"><RemoveIcon /></IconButton>
          </Paper>
          <Box sx={{ height: 400, bgcolor: '#F8FAFC', borderRadius: 1, overflow: 'hidden' }}>
                  <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54444.747381551366!2d7.6930992235022035!3d11.29520357300069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b27fc3df7cf997%3A0x7f813ac2a29bec28!2sKudan%2C%20Kaduna!5e1!3m2!1sen!2sng!4v1735816821797!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

    </Box>

        </Box>
      </Paper>
      {/* table */}
      <Box sx={{ p: 3 }}>
      <Card>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Soak Away Points</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Location Details</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : paginatedSoakAways.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">
                      {searchQuery ? 'No results found' : 'No soak away points available'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSoakAways.map((soakAway) => (
                  <TableRow key={soakAway._id} hover>
                    <TableCell>
                      <Box
                        component="img"
                        src={soakAway.picture || '/assets/images/fallback.png'}
                        alt="Soak Away"
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 1,
                          objectFit: 'cover'
                        }}
                        onError={(e: any) => {
                          e.target.src = '/assets/images/fallback.png';
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        Ward: {soakAway.ward}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Village: {soakAway.village}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hamlet: {soakAway.hamlet}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Coordinates: {soakAway.geolocation.coordinates.join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={soakAway.type}
                        size="small"
                        color={soakAway.type === 'Covered' ? 'primary' : 'default'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={soakAway.status}
                        size="small"
                        color={soakAway.status === 'Functional' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={soakAway.condition}
                        size="small"
                        color={
                          soakAway.condition === 'Good'
                            ? 'success'
                            : soakAway.condition === 'Fair'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(soakAway.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(soakAway.createdAt).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, soakAway)}
                      >
                        <MoreVertIcon />
                        </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination
            count={Math.ceil(totalSoakAways / itemsPerPage)}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem 
            onClick={() => {
              handleViewDetails(selectedSoakAway?._id || '');
            }}
          >
            <ListItemIcon>
              <Visibility fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEdit(selectedSoakAway?._id || '');
            }}
          >
            <ListItemIcon>
              <Edit fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpenDeleteModal(true);
            }}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <Delete fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </Card>
    </Box>
    </Box>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  iconColor?: string;
  valueColor?: string;
}

const StatsCard = ({ title, value, icon, iconColor, valueColor }: StatsCardProps) => (
  <Card sx={{ flex: 1, p: 2, borderRadius: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ fontWeight: 600, color: valueColor || 'text.primary' }}>
        {value}
      </Typography>
      <Box
        sx={{
          bgcolor: `${iconColor}15`,
          width: 48,
          height: 48,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.cloneElement(icon, { sx: { color: iconColor, fontSize: 24 } })}
      </Box>
    </Box>
  </Card>
);

export default SoakAways;