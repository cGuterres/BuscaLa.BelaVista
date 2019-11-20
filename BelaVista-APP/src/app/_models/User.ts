import { UserRoles } from './UserRoles';

export class User {
    userName: string;
    email: string;
    password: string;
    fullName: string;
    userRoles: UserRoles[];
}
