import React from "react";
import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const Button: React.FC<CustomButtonProps> = ({
  children,
  loading,
  disabled,
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      disabled={loading || disabled}
      sx={{
        borderRadius: "12px",
        textTransform: "none",
        fontWeight: 600,
        padding: "10px 24px",
        boxShadow:
          props.variant === "contained"
            ? "0 4px 14px 0 rgba(0,118,255,0.39)"
            : "none",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            props.variant === "contained"
              ? "0 6px 20px rgba(0,118,255,0.23)"
              : "none",
        },
        ...props.sx,
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </MuiButton>
  );
};

export default Button;
