import { Box, Card, Grid, Typography, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, LinearProgress } from '@mui/material';
import { Check, Wrench, AlertTriangle, MoreVertical, Eye } from 'lucide-react';

const GuttersDashboard = () => {
  const guttersData = [
    { ic: 'North Valley Site', location: 'Hunkuyi', type: 'Constructed', status: 'Maintained', lastUpdate: '2025-01-05' },
    { ic: 'East End Facility', location: 'Kudan Taun', type: 'Surface', status: 'Overfilled', lastUpdate: '2025-01-03' },
    { ic: 'North Valley Site', location: 'Doka', type: 'Constructed', status: 'Maintained', lastUpdate: '2024-12-15' },
    { ic: 'East End Facility', location: 'Likoro', type: 'Surface', status: 'Need Attention', lastUpdate: '2024-12-15' },
  ];


  const getStatusColor = (status) => {
    switch (status) {
      case 'Maintained':
        return '#22c55e';
      case 'Overfilled':
        return '#ef4444';
      case 'Need Attention':
        return '#eab308';
      default:
        return '#64748b';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'Maintained':
        return '#dcfce7';
      case 'Overfilled':
        return '#fee2e2';
      case 'Need Attention':
        return '#fef9c3';
      default:
        return '#f1f5f9';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h5" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>
          Gutters
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select size="small" defaultValue="lga" sx={{ minWidth: 120 }}>
            <MenuItem value="lga">LGA</MenuItem>
          </Select>
          <Select size="small" defaultValue="ward" sx={{ minWidth: 120 }}>
            <MenuItem value="ward">Ward</MenuItem>
          </Select>
          <Select size="small" defaultValue="village" sx={{ minWidth: 120 }}>
            <MenuItem value="village">Village</MenuItem>
          </Select>
          <Select size="small" defaultValue="hamlet" sx={{ minWidth: 120 }}>
            <MenuItem value="hamlet">Hamlet</MenuItem>
          </Select>
          <Button variant="contained" sx={{ bgcolor: '#0ea5e9', '&:hover': { bgcolor: '#0284c7' } }}>
            View Report
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ color: '#1e3a8a' }}>🚰</Box>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>35</Typography>
                <Typography color="text.secondary" variant="body2">Total Gutters</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Check size={24} color="#22c55e" />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#22c55e' }}>14</Typography>
                <Typography color="text.secondary" variant="body2">Maintained</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Wrench size={24} color="#ef4444" />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ef4444' }}>3</Typography>
                <Typography color="text.secondary" variant="body2">Overfilled</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AlertTriangle size={24} color="#eab308" />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#eab308' }}>7</Typography>
                <Typography color="text.secondary" variant="body2">Unmaintained</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Card sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1e3a8a' }}>
                <TableCell sx={{ color: 'white' }}>IC</TableCell>
                <TableCell sx={{ color: 'white' }}>Location</TableCell>
                <TableCell sx={{ color: 'white' }}>Type</TableCell>
                <TableCell sx={{ color: 'white' }}>Status</TableCell>
                <TableCell sx={{ color: 'white' }}>Last Update</TableCell>
                <TableCell sx={{ color: 'white' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {guttersData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ic}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: getStatusBgColor(row.status),
                        color: getStatusColor(row.status),
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>{row.lastUpdate}</TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ color: '#0ea5e9' }}>
                      <Eye size={18} />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing 1 to 3 of 3 entries
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button disabled variant="outlined" size="small">Previous</Button>
            <Button variant="contained" size="small" sx={{ bgcolor: '#1e3a8a' }}>1</Button>
            <Button disabled variant="outlined" size="small">Next</Button>
          </Box>
        </Box>
      </Card>

      {/* Distribution Chart */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    width: 1136,
    p: 4,
    bgcolor: "white",
    borderRadius: 2,
    border: 1,
    borderColor: "grey.300",
  }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      mb: 3,
    }}
  >
    <Typography variant="h6" fontWeight="600" color="text.primary">
      Gutter Type Distribution
    </Typography>
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button variant="outlined" size="small">
        Monthly
      </Button>
      <Button variant="outlined" size="small">
        Yearly
      </Button>
    </Box>
  </Box>

  <Grid container spacing={2}>
    {/* Constructed */}
    <Grid item xs>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body1" color="text.primary">
            Constructed
          </Typography>
          <Typography variant="body1" color="primary">
            245
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={82.45}
          sx={{
            height: 8,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": { bgcolor: "#38bdf8" }, // Sky Blue
          }}
        />
      </Box>
    </Grid>

    {/* Surface */}
    <Grid item xs>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body1" color="text.primary">
            Surface
          </Typography>
          <Typography variant="body1" color="success.main">
            180
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={59.6}
          sx={{
            height: 8,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": { bgcolor: "#22c55e" }, // Green
          }}
        />
      </Box>
    </Grid>

    {/* Dug */}
    <Grid item xs>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          border: 1,
          borderColor: "grey.300",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="body1" color="text.primary">
            Dug
          </Typography>
          <Typography variant="body1" color="warning.main">
            120
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={39.74}
          sx={{
            height: 8,
            borderRadius: 5,
            "& .MuiLinearProgress-bar": { bgcolor: "#fde047" }, // Yellow
          }}
        />
      </Box>
    </Grid>
  </Grid>
</Box>
    </Box>
  );
};

export default GuttersDashboard;