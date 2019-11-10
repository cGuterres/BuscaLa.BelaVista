import { Condominium } from './Condominium';
import { ScheduleType } from './ScheduleType';
import { ScheduleStatus } from './ScheduleStatus';

export interface Scheduling {
    id: number;
    scheduleTypeId: number;
    scheduleStatus: ScheduleStatus;
    schedulyTYpe: ScheduleType;
    condominiumId: number;
    condominium: Condominium;
    scheduleStatusId: number;
    createDate: Date;
    scheduleDate: Date;
    description: string;
}
