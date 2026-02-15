import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "error"> {
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ error, ...props }) => {
  return (
    <TextField
      {...props}
      error={!!error}
      helperText={error}
      fullWidth
      variant="outlined"
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          },
        },
      }}
    />
  );
};

export default InputField;
