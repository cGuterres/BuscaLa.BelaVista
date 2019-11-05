import { Condominium } from './Condominium';
export interface Warning {
    id: number;
    condominiumId: number;
    condominium: Condominium;
    description: string;
    scheduleDate: Date;
    createDate: Date;
    updateDate: Date;
}