import { PateintFeedbackQuestion } from "./patient.feedback.question";

export interface PatientFeedback {
    id?: number;
    clinicId: number;
    feedbackQuestions: PateintFeedbackQuestion | null;
    patientName: string;
    firstName: string,
    lastName: string
    optionalFeedback?: string;
}
