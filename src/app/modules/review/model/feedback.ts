import { FeedbackItem } from "./feedback.item";
import { OptionalFeedback } from "./optional.feedback";

export interface FeedBack {
    id: number;
    feedbackValue: string;
    clinicId: number;
    items: FeedbackItem[];
    optionalFeedback: OptionalFeedback;
}