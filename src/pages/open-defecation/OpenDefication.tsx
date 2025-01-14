import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  Button,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Layers as LayersIcon,
  Fullscreen as FullscreenIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  MoreHoriz as MoreHorizIcon,
  Warning as WarningIcon,
  FilterAlt as FilterAltIcon,
} from '@mui/icons-material';
import { FaChartLine } from 'react-icons/fa';

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  iconColor: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, iconColor }) => (
  <Card sx={{ flex: 1, p: 2, borderRadius: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 600 }}>
        {value}
      </Typography>
      <Box
        sx={{
          bgcolor: `${iconColor}15`,
          p: 1,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {React.cloneElement(icon, { sx: { color: iconColor } })}
      </Box>
    </Box>
  </Card>
);

const OpenDefication = () => {
  const data = [
    { location: 'Sector 1, Block A', date: '08:30 am', demographics: 'Adult Male', status: 'Low' },
    { location: 'Sector 2, Block B', date: '09:00 am', demographics: 'Child', status: 'High' },
    { location: 'Sector 3, Block C', date: '09:30 am', demographics: 'Adult Male', status: 'Low' },
    { location: 'Sector 4, Block D', date: '10:00 aM', demographics: 'Adult Female', status: 'Medium' },
  ];

  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'high':
        return { bg: '#fef2f2', color: '#ef4444' };
      case 'medium':
        return { bg: '#fefce8', color: '#eab308' };
      case 'low':
        return { bg: '#f0fdf4', color: '#22c55e' };
      default:
        return { bg: '#f0fdf4', color: '#22c55e' };
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#F8F9FA', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600, mb: 0.5 }}>
            Open Defecation Observation
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
          title="Total Observations"
          value="1,234"
          icon={<VisibilityIcon />}
          iconColor="#2196f3"
        />
        <StatsCard
          title="High Risk Areas"
          value="28"
          icon={<WarningIcon />}
          iconColor="#f44336"
        />
        <StatsCard
          title="Average Daily Cases"
          value="42"
          icon={<FaChartLine style={{ fontSize: 24 }} />}
          iconColor="#CA8A04"
        />
      </Box>

      <Paper sx={{ mb: 3 }}>
        {/* Map Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #e2e8f0'
        }}>
          <Typography variant="h6">Geographic Distribution</Typography>
          <Box>
            <IconButton size="small">
              <FullscreenIcon />
            </IconButton>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Map Container */}
        <Box sx={{ position: 'relative', height: 400 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d150598.46582809655!2d7.648291125907573!3d11.296615180519947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11b27fc3df7cf997%3A0x7f813ac2a29bec28!2sKudan%2C%20Kaduna!5e0!3m2!1sen!2sng!4v1735721268833!5m2!1sen!2sng"
            style={{
              border: 0,
              width: '100%',
              height: '100%',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          
          {/* Map Controls */}
          <Paper
            elevation={2}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              p: 0.5,
              borderRadius: 1,
              bgcolor: 'white',
            }}
          >
            <IconButton size="small"><AddIcon /></IconButton>
            <IconButton size="small"><RemoveIcon /></IconButton>
            <IconButton size="small"><LayersIcon /></IconButton>
          </Paper>

          {/* Map Legend */}
          <Paper
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              p: 1,
              borderRadius: 1,
              bgcolor: 'white',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
                <Typography variant="caption">High Risk</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#eab308' }} />
                <Typography variant="caption">Medium Risk</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#22c55e' }} />
                <Typography variant="caption">Low Risk</Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Data Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1e3a8a' }}>
              <TableCell sx={{ color: 'white' }}>Location</TableCell>
              <TableCell sx={{ color: 'white' }}>Date</TableCell>
              <TableCell sx={{ color: 'white' }}>Demographics</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              const statusColor = getStatusChipColor(row.status);
              return (
                <TableRow key={index} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f8fafc' } }}>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.demographics}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: statusColor.bg,
                        color: statusColor.color,
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small">
                        <VisibilityIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton size="small">
                        <MoreHorizIcon sx={{ fontSize: 20 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            Showing 1 to 3 of 3 entries
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label="Previous"
              variant="outlined"
              disabled
              size="small"
            />
            <Chip
              label="1"
              color="primary"
              size="small"
            />
            <Chip
              label="Next"
              variant="outlined"
              disabled
              size="small"
            />
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default OpenDefication;