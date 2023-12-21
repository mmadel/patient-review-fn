export class ExcelReportCriteria {
    startDate: number;
    endDate: number;
    startDate_date: Date | null;
    endDate_date: Date | null;
    clinicId: number | null;
    serviceName: string[];
    feedbackFilter: string[];
    timeZone:string
}