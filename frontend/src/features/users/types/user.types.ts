export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle?: string | null;
    avatar?: string | null;
    status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}