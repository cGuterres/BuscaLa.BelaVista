import { Condominium } from './Condominium';

export interface Complaint {
    id: number;
    condominiumId: number;
    description: string;
    isResolved: boolean;
    createDate: Date;
    occurrenceDate: Date;
}
