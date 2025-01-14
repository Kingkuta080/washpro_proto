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
  styled,
  CircularProgress,
  Pagination,
  Divider,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Bar, ResponsiveContainer, Legend } from 'recharts';
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

// Sample data
const waterQualityData = [
  { date: 'Jan', '2024': 30, '2025': 70 },
  { date: 'Feb', '2024': 40, '2025': 60 },
  { date: 'Mar', '2024': 50, '2025': 90 },
  { date: 'Apr', '2024': 60, '2025': 80 },
  { date: 'May', '2024': 70, '2025': 50 },
  { date: 'Jun', '2024': 40, '2025': 70 },
];

const contaminationData = [
  { source: 'Source 1', '2022': 85, '2023': 65 },
  { source: 'Source 2', '2022': 75, '2023': 50 },
  { source: 'Source 3', '2022': 60, '2023': 40 },
  { source: 'Source 4', '2022': 50, '2023': 30 },
  { source: 'Source 5', '2022': 65, '2023': 45 },
];

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
      <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Historical Trends in Water Quality */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
              backgroundColor: '#f8f9fc',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
              mb={2}
            >
              Historical Trends in Water Quality
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={waterQualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="2024"
                  stroke="#1976d2"
                  strokeWidth={2}
                  dot
                />
                <Line
                  type="monotone"
                  dataKey="2025"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  dot
                  fillOpacity={0.6}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Contamination Levels by Source */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              height: '100%',
              backgroundColor: '#f8f9fc',
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
              mb={2}
            >
              Contamination Levels by Source
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contaminationData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="2022" fill="#1976d2" barSize={30} />
                <Bar dataKey="2023" fill="#82ca9d" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>

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

      {/* Progress Tracker */}
      <Box
  sx={{
    width: "100%",
    maxWidth: 1200,
    mx: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    p: 3,
  }}
>
  <Typography variant="h6" color="primary" fontWeight="bold" textAlign="left">
    Hygiene Programs
  </Typography>

  <Grid container spacing={4}>
    {/* Left Container */}
    <Grid item xs={12} md={3}>
      <Paper
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Typography variant="h3" color="primary" fontWeight="bold">
            44
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Number of active hygiene education programs.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "5px solid #8dffb7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="success.main">
              70%
            </Typography>
          </Box>
          <Typography variant="body1" color="textPrimary">
            % of community participation.
          </Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box>
          <Typography variant="h3" color="primary" fontWeight="bold">
            27
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Number of handwashing stations installed.
          </Typography>
        </Box>
      </Paper>
    </Grid>

    {/* Right Container */}
    <Grid item xs={12} md={9}>
      <Paper sx={{ borderRadius: 2, boxShadow: 3, p: 3, height: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#25306b" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Trainer Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Participant Count
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Feedback Summary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>2025-01-02</TableCell>
                <TableCell>Aisha Abdullahi</TableCell>
                <TableCell>25</TableCell>
                <TableCell>
                  Participants appreciated practical demonstrations but suggested
                  more time for Q&A.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2024-12-18</TableCell>
                <TableCell>Musa Ibrahim</TableCell>
                <TableCell>30</TableCell>
                <TableCell>
                  Engaging session; participants requested advanced follow-up
                  training.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            Showing 1 to 3 of 3 entries
          </Typography>
          <Pagination count={1} color="primary" />
        </Box>
      </Paper>
    </Grid>
  </Grid>

  {/* Progress Tracker */}
  <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    maxWidth: "100%",
    p: 4,
    bgcolor: "white",
    borderRadius: 2,
    border: 1,
    borderColor: "grey.300",
  }}
>
  <Typography
    variant="h6"
    sx={{ fontWeight: "bold", color: "grey.900", mb: 3 }}
  >
    Progress Tracker
  </Typography>

  {/* Progress Bar */}
  <Box
    sx={{
      position: "relative",
      width: "100%",
      height: 24,
      mb: 3,
      display: "flex",
      alignItems: "center",
    }}
  >
    {/* Progress Bar Background */}
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: 8,
        bgcolor: "#b4c0ff",
        borderRadius: 1,
        transform: "translateY(-50%)",
      }}
    />
    {/* Progress Bar Filled */}
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "50%",
        height: 8,
        bgcolor: "#25306b",
        borderRadius: 1,
        transform: "translateY(-50%)",
      }}
    />
    {/* Markers */}
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: 24,
        height: 24,
        bgcolor: "#25306b",
        borderRadius: "50%",
        transform: "translateY(-50%)",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 24,
        height: 24,
        bgcolor: "#25306b",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        right: 0,
        width: 24,
        height: 24,
        bgcolor: "#b4c0ff",
        borderRadius: "50%",
        transform: "translateY(-50%)",
      }}
    />
  </Box>

  {/* Details Section */}
  <Grid container spacing={2}>
    {/* Left Column */}
    <Grid item xs={12} sm={4}>
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Handwashing Awareness Campaign
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600", display: "block" }}>
          2024-12-01 - 2025-01-15
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600", display: "block" }}>
          2024-12-25 (50% completion)
        </Typography>
      </Box>
    </Grid>

    {/* Center Column */}
    <Grid item xs={12} sm={4}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Safe Water Initiative
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600", display: "block" }}>
          2024-11-20 - 2025-02-10
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600", display: "block" }}>
          2025-01-01 (75% completion)
        </Typography>
      </Box>
    </Grid>

    {/* Right Column */}
    <Grid item xs={12} sm={4}>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Waste Disposal Drive
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600", display: "block" }}>
          2024-12-10 - 2025-01-30
        </Typography>
        <Typography variant="caption" sx={{ color: "grey.600", display: "block" }}>
          Waste transport and community engagement.
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Box>
</Box>
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