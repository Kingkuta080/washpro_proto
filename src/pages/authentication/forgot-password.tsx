import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!emailOrPhone) {
      setError("Please enter your email or phone number.");
      return;
    }

    setError(""); // Clear error before submitting
    setIsSubmitting(true);

    try {
      const response = await axios.post("/user/reset-password", {
        emailOrPhone,
      });

      if (response.status === 200) {
        alert("Reset password link has been sent to your email or phone.");
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to send reset password link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturn = () => {
    navigate(-1); // Navigate back
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f1f1f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Forgot Password Form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 4,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Visby Round CF, Helvetica",
            fontWeight: 700,
            color: "rgba(61, 67, 74, 1)",
          }}
        >
          Forgot Password?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Visby Round CF, Helvetica",
            fontWeight: 500,
            color: "rgba(171, 172, 168, 1)",
            textAlign: "center",
            maxWidth: 342,
          }}
        >
          Enter your email address or phone number, to which the reset password
          link would be sent.
        </Typography>
        <TextField
          label="Email or Phone Number"
          value={emailOrPhone}
          onChange={(e) => {
            setEmailOrPhone(e.target.value);
            setError(""); // Clear error on input change
          }}
          variant="standard"
          fullWidth
          sx={{
            maxWidth: 320,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              backgroundColor: "#ffffff",
              boxShadow: "0px 1px 2px #0000000d",
            },
            "& .MuiInputLabel-root": {
              fontFamily: "Poppins, Helvetica",
              fontWeight: 500,
              color: "rgba(61, 67, 74, 1)",
            },
            "& .MuiInputBase-input": {
              fontFamily: "Poppins, Helvetica",
              fontWeight: 400,
              color: "rgba(98, 98, 96, 1)",
            },
          }}
        />
        {error && (
          <Typography
            variant="body2"
            sx={{
              color: "red",
              fontFamily: "Poppins, Helvetica",
              fontWeight: 500,
            }}
          >
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            width: 327,
            height: 48,
            backgroundColor: "rgba(44, 190, 239, 1)",
            borderRadius: 2,
            textTransform: "none",
            fontFamily: "Poppins, Helvetica",
            fontWeight: 500,
            fontSize: 16,
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "rgba(34, 160, 210, 1)",
            },
            "&:active": {
              backgroundColor: "rgba(24, 130, 180, 1)",
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>

      {/* Return Button */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleReturn}>
          <ArrowBackIcon
            sx={{
              color: "rgba(98, 98, 96, 1)",
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            ml: 1,
            fontFamily: "Visby Round CF, Helvetica",
            fontWeight: 700,
            color: "rgba(98, 98, 96, 1)",
          }}
        >
          Return
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
