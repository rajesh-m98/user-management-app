import { FormFieldSchema } from '../../types/user.types';
import { validateEmail, validatePhone } from '../../utils/validators';

export const userFormSchema: FormFieldSchema[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        validation: (value: string) => validateEmail(value) || 'Invalid email format',
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        validation: (value: string) => validatePhone(value) || 'Phone number must be 10 digits',
    },
];
