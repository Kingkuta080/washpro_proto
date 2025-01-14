import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem
} from '@mui/material';
import {
  Download as DownloadIcon,
  Add as AddIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Build,
  WaterDrop,
  Visibility,
  Info,
  NavigateBefore,
  NavigateNext,
  Warning
} from '@mui/icons-material';
import { Toilet } from 'lucide-react';

const SanitationDashboard = () => {
  const stats = [
    { icon: <Box component={Toilet} sx={{ fontSize: 40 }} />, label: 'Total Toilets', value: '2,456' },
    { icon: <Build sx={{ fontSize: 40 }} />, label: 'Maintained Toilets', value: '1,890' },
    { icon: <WaterDrop sx={{ fontSize: 40 }} />, label: 'Handwashing Facilities', value: '78%' },
    { icon: <Warning sx={{ fontSize: 40 }} />, label: 'Open Defecation Status', value: '12%' }
  ];

  const locations = [
    { name: 'Kudan', total: 234, functional: 189, status: 'Good' },
    { name: 'Doka', total: 163, functional: 155, status: 'Failed' },
    { name: 'Kauru', total: 189, functional: 157, status: 'Good' },
    { name: 'Hunkuyi', total: 245, functional: 208, status: 'Need Attention' }
  ];

  const getStatusColor = (status: 'Good' | 'Failed' | 'Need Attention' | string) => {
    switch (status) {
      case 'Good':
        return 'success';
      case 'Failed':
        return 'error';
      case 'Need Attention':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1" sx={{ color: 'primary.main' }}>
          Sanitation
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {['LGA', 'Ward', 'Village', 'Hamlet'].map((item) => (
            <Select
              key={item}
              size="small"
              defaultValue="All"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="All">All {item}</MenuItem>
            </Select>
          ))}
          <Button variant="contained" color="info">
            View Report
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ color: 'primary.main' }}>{stat.icon}</Box>
              <Box>
                <Typography color="textSecondary" variant="body2">
                  {stat.label}
                </Typography>
                <Typography variant="h6">{stat.value}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>Location</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Facility</TableCell>
              <TableCell sx={{ color: 'white' }}>Functional</TableCell>
              <TableCell sx={{ color: 'white' }}>Status</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <TableRow key={location.name}>
                <TableCell>{location.name}</TableCell>
                <TableCell>{location.total}</TableCell>
                <TableCell>{location.functional}</TableCell>
                <TableCell>
                  <Chip
                    label={location.status}
                    color={getStatusColor(location.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small">
                    <Info />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Showing 1 to 4 of 4 entries
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<NavigateBefore />} disabled>
            Previous
          </Button>
          <Button variant="contained">1</Button>
          <Button endIcon={<NavigateNext />} disabled>
            Next
          </Button>
        </Box>
      </Box>

      {/* Critical Alerts */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1136,
          bgcolor: 'white',
          borderRadius: 2,
          border: 'none',
          p: 2,
          boxShadow: 3,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight="bold">
              Critical Alerts
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<DownloadIcon />}
                sx={{ borderRadius: 2 }}
              >
                Download Report
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                sx={{ borderRadius: 2 }}
              >
                Propose Maintenance
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Box
          sx={{
            width: '100%',
            bgcolor: 'error.light',
            borderRadius: 2,
            mt: 2,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ErrorIcon sx={{ color: 'error.dark', mr: 1 }} />
            <Typography variant="body1" color="error.dark">
              East Ward Facility #23 needs urgent repair
            </Typography>
          </Box>
          <Chip
            label="High Priority"
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              borderRadius: '16px',
            }}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            bgcolor: 'warning.light',
            borderRadius: 2,
            mt: 2,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningIcon sx={{ color: 'warning.dark', mr: 1 }} />
            <Typography variant="body1" color="warning.dark">
              West Ward requires additional handwashing stations
            </Typography>
          </Box>
          <Chip
            label="Medium Priority"
            sx={{
              bgcolor: 'warning.main',
              color: 'white',
              borderRadius: '16px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SanitationDashboard;
