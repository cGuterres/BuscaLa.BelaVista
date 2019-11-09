import { Condominium } from './Condominium';

export interface Complaint {
    id: number;
    condominiumId: number;
    condominium: Condominium;
    description: string;
    isResolved: boolean;
    createDate: Date;
    occurrenceDate: Date;
}
