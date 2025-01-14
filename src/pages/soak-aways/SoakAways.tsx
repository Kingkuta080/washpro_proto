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
  Paper,
} from "@mui/material";
import { Check, Wrench, AlertTriangle, Circle } from "lucide-react";

const SoakawaysDashboard = () => {
  const soakawaysTypes = [
    { type: "Maintained", count: 964, percentage: "75%", riskLevel: "Low" },
    { type: "Unmaintained", count: 847, percentage: "68%", riskLevel: "Medium" },
    { type: "Dilapidated", count: 311, percentage: "25%", riskLevel: "Low" },
    { type: "Maintained", count: 89, percentage: "7%", riskLevel: "High" },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "Low":
        return { bg: "#dcfce7", text: "#22c55e" };
      case "Medium":
        return { bg: "#fef9c3", text: "#ca8a04" };
      case "High":
        return { bg: "#fee2e2", text: "#ef4444" };
      default:
        return { bg: "#f1f5f9", text: "#64748b" };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#1e3a8a", fontWeight: "bold" }}
        >
          Soakaways
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {["LGA", "Ward", "Village", "Hamlet"].map((label) => (
            <Select
              key={label}
              size="small"
              defaultValue={label.toLowerCase()}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value={label.toLowerCase()}>{label}</MenuItem>
            </Select>
          ))}
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0ea5e9",
              "&:hover": { bgcolor: "#0284c7" },
            }}
          >
            View Report
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          {
            icon: "🚰",
            label: "Total Soakaways",
            value: "1,247",
            color: "#1e3a8a",
          },
          {
            icon: <Check size={24} color="#22c55e" />,
            label: "Inspected this Month",
            value: "342",
            color: "#22c55e",
          },
          {
            icon: <Wrench size={24} color="#ef4444" />,
            label: "Critical Condition",
            value: "89",
            color: "#ef4444",
          },
          {
            icon: <AlertTriangle size={24} color="#eab308" />,
            label: "Maintenance Due",
            value: "156",
            color: "#eab308",
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box>{stat.icon}</Box>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: stat.color }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Types Table */}
      <Card sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1e3a8a" }}>
                <TableCell sx={{ color: "white" }}>Soakaways Types</TableCell>
                <TableCell sx={{ color: "white" }}>Count</TableCell>
                <TableCell sx={{ color: "white" }}>Percentage</TableCell>
                <TableCell sx={{ color: "white" }}>Risk Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soakawaysTypes.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: getRiskColor(row.riskLevel).bg,
                        color: getRiskColor(row.riskLevel).text,
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    >
                      {row.riskLevel}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Showing 1 to 3 of 3 entries
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button disabled variant="outlined" size="small">
              Previous
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "#1e3a8a" }}
            >
              1
            </Button>
            <Button disabled variant="outlined" size="small">
              Next
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Slab Safety Risk */}
      <Box
        sx={{
          p: 3,
          bgcolor: "white",
          borderRadius: 2,
          border: 1,
          borderColor: "grey.100",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "600",
            color: "grey.800",
            mb: 2,
          }}
        >
          Slab Safety Risk
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: "Fair Condition (75%)", value: 936, color: "green" },
            { label: "Bad/Fail (25%)", value: 311, color: "red" },
          ].map((risk, index) => (
            <Grid item xs={6} key={index}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 3,
                  bgcolor: "grey.50",
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Circle sx={{ color: risk.color, fontSize: 12, mr: 1.5 }} />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "400", color: "text.primary" }}
                  >
                    {risk.label}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "700",
                    color: "text.primary",
                  }}
                >
                  {risk.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SoakawaysDashboard;