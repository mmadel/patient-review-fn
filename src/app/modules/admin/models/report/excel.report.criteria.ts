import { Clinic } from "../clinic.model";

export class ExcelReportCriteria {
    startDate: number;
    endDate: number;
    startDate_date: Date | null;
    endDate_date: Date | null;
    clinic: Clinic | null;
    clinics: Clinic[] | undefined;
    serviceName: string[];
    feedbackFilter: string[];
    timeZone:string
}