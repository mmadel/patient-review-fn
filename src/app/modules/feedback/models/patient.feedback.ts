import { PateintFeedbackQuestion } from "./patient.feedback.question";

export interface PatientFeedback {
    id?: number;
    clinicId: number;
    feedbackQuestions: PateintFeedbackQuestion | null;
    patientName: string;
    optionalFeedback?: string;
}
