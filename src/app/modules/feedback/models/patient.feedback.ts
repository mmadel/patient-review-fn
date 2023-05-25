import { PateintFeedbackQuestion } from "./patient.feedback.question";

export interface PatientFeedback {
    id?: number;
    clinicId: number;
    items: PateintFeedbackQuestion[];
    patientName: string;
    optionalFeedback?: string;
}
