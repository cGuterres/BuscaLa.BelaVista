export interface Meeting {
     id: number;
     condominiunId: number;
     description: string;
     docAta: Blob;
     isCancel: boolean;
     createDate: Date;
     cpdateDate: Date;
     scheduleDate: Date;
}
