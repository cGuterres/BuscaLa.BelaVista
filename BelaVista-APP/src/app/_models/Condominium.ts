import { Visitant } from './Visitant';

export interface Condominium {
    id: number;
    name: string;
    email: string;
    cpf: string;
    rg: string;
    phone: string;
    contactPhone: string;
    active: boolean;
    password: string;
    createDate: Date;
    updateDate: Date;
    visitants: Visitant[];
}
