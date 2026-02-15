export const validateName = (name: string): string | boolean => {
    if (!name || !name.trim()) return 'First name is required';
    if (name.length < 2) return 'Minimum 2 characters required';
    if (name.length > 50) return 'Maximum 50 characters allowed';
    const re = /^[a-zA-Z]+([. ][a-zA-Z]+)*$/;
    if (!re.test(name)) return 'Only letters, single spaces or dots allowed (not at start/end)';
    return true;
};

export const validateLastName = (name: string): string | boolean => {
    if (!name || !name.trim()) return 'Last name is required';
    if (name.length < 1) return 'Minimum 1 character required';
    if (name.length > 50) return 'Maximum 50 characters allowed';
    const re = /^[a-zA-Z]+([. ][a-zA-Z]+)*$/;
    if (!re.test(name)) return 'Only letters, single spaces or dots allowed (not at start/end)';
    return true;
};

const TYPO_MAP: Record<string, string> = {
    'gamil.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'yaho.in': 'yahoo.in',
    'outluk.com': 'outlook.com',
    'hotmial.com': 'hotmail.com',
};

export const validateEmailStrict = (email: string): string | boolean => {
    if (!email || !email.trim()) return 'Email is required';
    if (email.length > 100) return 'Email is too long';

    // RFC 5322 compliant regex (simplified for common use)
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!re.test(email)) return 'Invalid email format';

    const parts = email.split('@');
    const domain = parts[1].toLowerCase();
    if (TYPO_MAP[domain]) {
        return `Correct spelling to @${TYPO_MAP[domain]}`;
    }

    return true;
};

export const validatePhoneIndia = (phone: string): string | boolean => {
    if (!phone) return 'Phone number is required';
    const cleanPhone = phone.replace(/\s/g, '');

    if (!/^\d+$/.test(cleanPhone)) return 'Only numeric digits allowed';
    if (cleanPhone.length !== 10) return 'Must be exactly 10 digits';

    // Indian mobile numbers start with 6, 7, 8, or 9
    const re = /^[6-9]\d{9}$/;
    if (!re.test(cleanPhone)) return 'Invalid Indian mobile number (must start with 6-9)';

    // Prevent obvious fake numbers like 9999999999
    if (/^(\d)\1{9}$/.test(cleanPhone)) return 'This number looks invalid (all digits same)';

    return true;
};
