import {
  Assignment,
  BarChart,
  CleaningServices,
  ReportProblem,
} from '@mui/icons-material';
import BuildIcon from "@mui/icons-material/Build";
import CallSplitIcon from "@mui/icons-material/CallSplit";
import CheckIcon from "@mui/icons-material/Check";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import WcIcon from "@mui/icons-material/Wc";
import {
  Box,
  Card,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ToiletStats = () => {
  const toiletTypes = [
    { type: 'Western Style', count: 50, status: 'Operational' },
    { type: 'Eastern Style', count: 30, status: 'Maintenance' },
    { type: 'Accessible', count: 20, status: 'Operational' },
  ];

  const actions = [
    {
      icon: <ReportProblem fontSize="small" sx={{ color: '#3b82f6' }} />,
      label: 'Report Issue',
      bgColor: '#f1f5f9',
      textColor: '#3b82f6',
    },
    {
      icon: <CleaningServices fontSize="small" sx={{ color: '#8b5cf6' }} />,
      label: 'Schedule Cleaning',
      bgColor: '#faf5ff',
      textColor: '#8b5cf6',
    },
    {
      icon: <Assignment fontSize="small" sx={{ color: '#22c55e' }} />,
      label: 'Maintenance Log',
      bgColor: '#f0fdf4',
      textColor: '#22c55e',
    },
    {
      icon: <BarChart fontSize="small" sx={{ color: '#f97316' }} />,
      label: 'View Analytics',
      bgColor: '#fff7ed',
      textColor: '#f97316',
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 3,
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Toilet Facilities
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
          <Button
            variant="contained"
            sx={{
              bgcolor: '#00b4d8',
              '&:hover': { bgcolor: '#0096c7' },
            }}
          >
            View Report
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
{
  icon: <WcIcon sx={{ fontSize: 60, color: "#25306b" }} />,
  label: "Total Units",
  value: 85,
},
{
  icon: <CheckIcon sx={{ fontSize: 60, color: "#25306b" }} />,
  label: "Functional",
  value: 77,
},
{
  icon: <BuildIcon sx={{ fontSize: 60, color: "#ff0000" }} />,
  label: "Under Repair",
  value: 7,
  labelColor: "#ff0000",
  valueColor: "#ff0000",
},
{
  icon: <CallSplitIcon sx={{ fontSize: 60, color: "#25306b" }} />,
  label: "Latrines",
  value: 34,
},
{
  icon: <GroupIcon sx={{ fontSize: 60, color: "#25306b" }} />,
  label: "Squatting",
  value: 18,
},
{
  icon: <StarIcon sx={{ fontSize: 60, color: "#25306b" }} />,
  label: "WC",
  value: 20,
},        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.icon}
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', mt: 2, color: '#1e3a8a' }}
              >
                {item.value}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {item.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Toilet Types Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Toilet Types Overview
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#1e3a8a' }}>
                      <TableCell sx={{ color: 'white' }}>Type</TableCell>
                      <TableCell sx={{ color: 'white' }}>Count</TableCell>
                      <TableCell sx={{ color: 'white' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {toiletTypes.map((type) => (
                      <TableRow key={type.type}>
                        <TableCell>{type.type}</TableCell>
                        <TableCell>{type.count}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              bgcolor:
                                type.status === 'Operational'
                                  ? '#dcfce7'
                                  : '#fef9c3',
                              color:
                                type.status === 'Operational'
                                  ? '#166534'
                                  : '#854d0e',
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block',
                            }}
                          >
                            {type.status}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Card>
        </Grid>

        {/* Maintenance Status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Maintenance Status
              </Typography>
              <Box
                sx={{
                  bgcolor: '#f0fdf4',
                  p: 3,
                  borderRadius: 1,
                  mb: 2,
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Well Maintained</Typography>
                  <Typography variant="h4" color="success.main">
                    75%
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  bgcolor: '#fef2f2',
                  p: 3,
                  borderRadius: 1,
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Needs Attention</Typography>
                  <Typography variant="h4" color="error.main">
                    25%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 3 }}>
        <Card>
          <Box sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 500, color: '#1e293b' }}
            >
              Quick Actions
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2,
              }}
            >
              {actions.map((action, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    bgcolor: action.bgColor,
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      opacity: 0.9,
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  {action.icon}
                  <Typography
                    sx={{
                      color: action.textColor,
                      fontWeight: 500,
                    }}
                  >
                    {action.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default ToiletStats;
