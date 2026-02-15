import React from "react";
import { TextField, TextFieldProps, InputAdornment, Box } from "@mui/material";

interface InputFieldProps extends Omit<TextFieldProps, "error"> {
  error?: string;
  isPhone?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  error,
  isPhone,
  ...props
}) => {
  // Edge Case: Prevent non-numeric input for phone fields at the key event level
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isPhone) {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }
    if (props.onKeyPress) props.onKeyPress(e);
  };

  return (
    <TextField
      {...props}
      onKeyPress={handleKeyPress}
      error={!!error}
      helperText={error}
      fullWidth
      variant="outlined"
      margin="normal"
      autoComplete="off"
      // Stop paste of non-numeric chars for phone
      onInput={(e) => {
        if (isPhone) {
          const target = e.target as HTMLInputElement;
          target.value = target.value.replace(/\D/g, "").slice(0, 10);
        }
      }}
      InputProps={{
        startAdornment: isPhone ? (
          <InputAdornment position="start">
            <Box display="flex" alignItems="center" gap={1}>
              <span className="text-xl">🇮🇳</span>
              <span className="font-bold text-slate-500">+91</span>
              <div className="w-[1px] h-5 bg-slate-200 mx-1" />
            </Box>
          </InputAdornment>
        ) : null,
        className:
          "!rounded-2xl !bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md focus-within:!shadow-lg focus-within:!border-blue-500",
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#e2e8f0", borderWidth: "1.5px" },
          "&:hover fieldset": { borderColor: "#2563eb" },
          "&.Mui-focused fieldset": {
            borderColor: "#2563eb",
            borderWidth: "2px",
          },
        },
        "& .MuiFormHelperText-root": {
          fontWeight: 600,
          color: error ? "#ef4444" : "#64748b",
          fontSize: "0.75rem",
        },
      }}
    />
  );
};

export default InputField;
