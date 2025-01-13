import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  styled,
  CircularProgress,
  Pagination
} from '@mui/material';
import { Icon } from '@iconify/react';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Bar, ResponsiveContainer } from 'recharts';
import { blue, green, orange, red } from '@mui/material/colors';
import { FaToilet } from 'react-icons/fa6';

const StyledSelect = styled(Select)({
  minWidth: 120,
  marginRight: 8,
});

const StyledCard = styled(Card)({
  height: '100%',
});

// Sample data
const waterQualityData = [
  { date: 'Q4 2024', value: 45 },
  { date: 'Q1 2025', value: 85 },
];

const contaminationData = [
  { source: 'Source 1', '2022': 80, '2023': 65 },
  { source: 'Source 2', '2022': 60, '2023': 45 },
  { source: 'Source 3', '2022': 40, '2023': 30 },
  { source: 'Source 4', '2022': 70, '2023': 55 },
];

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, unit }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Icon icon={icon} width={24} height={24} color="#1976d2" />
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4">
        {value}{unit}
      </Typography>
    </CardContent>
  </StyledCard>
);

const Wash: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">WASH Monitoring</Typography>
        <Box display="flex" alignItems="center">
          {['LGA', 'Ward', 'Village', 'Hamlet'].map((item) => (
            <StyledSelect key={item} size="small" defaultValue={item}>
              <MenuItem value={item}>{item}</MenuItem>
            </StyledSelect>
          ))}
          <Button variant="contained" color="primary">
            View Report
          </Button>
        </Box>
      </Box>

      {/* Metrics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon="mdi:water"
            title="Water Quality Metrics"
            value="0-100"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon="mdi:recycle"
            title="Sanitation Activities"
            value="56"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon="mdi:hand-wash"
            title="Hygiene Facility Conditions"
            value="70"
            unit="%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon="mdi:account-group"
            title="Community and Feedback"
            value="130"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Historical Trends in Water Quality</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterQualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Contamination Levels by Source</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contaminationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="2022" fill="#1976d2" />
                <Bar dataKey="2023" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Sanitation Facilities */}
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Sanitation Facilities
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* Card Section */}
        <Card sx={{ width: 250, textAlign: 'center', padding: 2 }}>
          <CardContent>
            <FaToilet size={48} color="#1976d2" />  
          <Typography variant="h4" component="div" sx={{ marginBottom: 1 }}>
              36
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
              Number of operational toilets.
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', marginBottom: 1 }}>
              <CircularProgress
                variant="determinate"
                value={85}
                size={60}
                thickness={5}
                sx={{ color: green[500] }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  85%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              % of facilities needing maintenance.
            </Typography>
          </CardContent>
        </Card>

        {/* Table Section */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Facility Name</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Condition</strong></TableCell>
                <TableCell><strong>LM Date</strong></TableCell>
                <TableCell><strong>NSM Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.facilityName}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        backgroundColor: getConditionColor(row.condition),
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                      }}
                    >
                      {row.condition}
                    </Box>
                  </TableCell>
                  <TableCell>{row.lmDate}</TableCell>
                  <TableCell>{row.nsmDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Pagination count={1} color="primary" />
          </Box>
        </TableContainer>
      </Box>
    </Box>

      {/* Hygiene Programs */}
      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Sanitation Facilities
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* Card Section */}
        <Card sx={{ width: 250, textAlign: 'center', padding: 2 }}>
          <CardContent>
            <FaToilet size={48} color="#1976d2" />  
          <Typography variant="h4" component="div" sx={{ marginBottom: 1 }}>
              36
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
              Number of operational toilets.
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', marginBottom: 1 }}>
              <CircularProgress
                variant="determinate"
                value={85}
                size={60}
                thickness={5}
                sx={{ color: green[500] }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" component="div" color="text.primary">
                  85%
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              % of facilities needing maintenance.
            </Typography>
          </CardContent>
        </Card>

        {/* Table Section */}
        <TableContainer component={Paper} sx={{ flex: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Facility Name</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Condition</strong></TableCell>
                <TableCell><strong>LM Date</strong></TableCell>
                <TableCell><strong>NSM Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.facilityName}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        backgroundColor: getConditionColor(row.condition),
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '0.875rem',
                      }}
                    >
                      {row.condition}
                    </Box>
                  </TableCell>
                  <TableCell>{row.lmDate}</TableCell>
                  <TableCell>{row.nsmDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
            <Pagination count={1} color="primary" />
          </Box>
        </TableContainer>
      </Box>
    </Box>

      {/* Progress Tracker */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>Progress Tracker</Typography>
        <Box sx={{ width: '100%', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Chip label="Handwashing Awareness Campaign" color="primary" size="small" />
            <Typography variant="body2" color="primary">
              Safe Water Initiative
            </Typography>
          </Box>
          <Box sx={{ width: '100%', bgcolor: '#bbdefb', borderRadius: 1, height: 8 }}>
            <Box
              sx={{
                width: '45%',
                height: '100%',
                bgcolor: 'primary.main',
                borderRadius: 1
              }}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Wash;

const rows = [
  {
    facilityName: 'Community Borehole 1',
    location: 'Anguwan Sarki',
    condition: 'Poor',
    lmDate: '2025-01-05',
    nsmDate: '2025-01-12',
  },
  {
    facilityName: 'Waste Disposal Unit A',
    location: 'Anguwan Shanu',
    condition: 'Fair',
    lmDate: '2025-01-03',
    nsmDate: '2025-01-10',
  },
  {
    facilityName: 'Water Filtration Plant 3',
    location: 'Doka North',
    condition: 'Good',
    lmDate: '2024-12-15',
    nsmDate: '2024-12-20',
  },
  {
    facilityName: 'Public Latrine Block 2',
    location: 'Tudun Wada',
    condition: 'Fair',
    lmDate: '2024-12-15',
    nsmDate: '2024-12-20',
  },
];

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Good':
      return green[500];
    case 'Fair':
      return orange[500];
    case 'Poor':
      return red[500];
    default:
      return blue[500];
  }
};