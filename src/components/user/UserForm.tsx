import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { User, UserCreateInput } from "../../types/user.types";
import { userFormSchema } from "./userSchema";
import InputField from "../common/InputField";
import Button from "../common/Button";

interface UserFormProps {
  onSubmit: (user: UserCreateInput) => void;
  initialData?: User | null;
  loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  loading,
}) => {
  const [formData, setFormData] = useState<UserCreateInput>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      });
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    userFormSchema.forEach((field) => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      } else if (field.validation) {
        const validationResult = field.validation(value);
        if (typeof validationResult === "string") {
          newErrors[field.name] = validationResult;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        gutterBottom
        color="primary"
        sx={{ fontWeight: 700 }}
      >
        {initialData ? "Edit User" : "Create New User"}
      </Typography>

      {userFormSchema.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
          required={field.required}
        />
      ))}

      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" fullWidth loading={loading}>
          {initialData ? "Update User" : "Add User"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
