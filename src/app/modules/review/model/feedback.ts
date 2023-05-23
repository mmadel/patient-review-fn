import { FeedbackItem } from "./feedback.item";
import { OptionalFeedback } from "./optional.feedback";

export interface FeedBack {
    id: number | null;
    feedbackValue: string;
    clinicId: number;
    items: FeedbackItem[] ;
    optionalFeedback: OptionalFeedback | null;
}