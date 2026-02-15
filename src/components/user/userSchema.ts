import { FormFieldSchema } from '../../types/user.types';
import {
    validateEmailStrict,
    validatePhoneIndia,
    validateName,
    validateLastName
} from '../../utils/validators';

export const userFormSchema: FormFieldSchema[] = [
    {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        validation: validateName,
    },
    {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        validation: validateLastName,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        validation: validateEmailStrict,
    },
    {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        validation: validatePhoneIndia,
    },
];
