import { Condominium } from './Condominium';

export interface Visitant {
    id: number;
    condominiumId: number;
    condominium: Condominium;
    name: string;
    cpf: string;
    phone: string;
    createDate: Date;
}
