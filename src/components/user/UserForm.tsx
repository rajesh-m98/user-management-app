import React, { useState, useEffect } from "react";
import { User, UserCreateInput } from "../../types/user.types";
import { userFormSchema } from "./userSchema";
import InputField from "../common/InputField";

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
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {initialData ? "Update Profile" : "Create New User"}
        </h2>
        <p className="text-slate-500 text-sm font-medium">
          {initialData
            ? "Modify information for this team member"
            : "Fill in the details to add a new team member"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-1">
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
              isPhone={field.name === "phoneNumber"}
            />
          ))}
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 transform active:scale-[0.98] 
                        ${
                          loading
                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                            : "bg-blue-600 text-white shadow-xl shadow-blue-500/30 hover:bg-blue-700 hover:-translate-y-1"
                        }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : initialData ? (
              "Save Changes"
            ) : (
              "Confirm & Add User"
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 font-medium px-4">
            By proceeding, you agree to add this user to your secure team
            directory.
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
