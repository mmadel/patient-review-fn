import { ClinicalContainer } from "./clinical.container";
import { HospitalityContainer } from "./hospitality.container";

export interface PerformanceIndexContainer {
  hospitalityContainer: HospitalityContainer;
  clinicalContainer: ClinicalContainer;
}