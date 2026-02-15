export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type UserCreateInput = Omit<User, 'id'>;

export interface FormFieldSchema {
  name: keyof UserCreateInput;
  label: string;
  type: string;
  required: boolean;
  validation?: (value: string) => string | boolean;
}
