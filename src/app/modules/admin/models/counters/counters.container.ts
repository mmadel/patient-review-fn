import { ClinicalCountersContainer } from "./clinical.counters.container";
import { HospitalityCounterContainer } from "./hospitality.counter.container";

export interface CountersContainer{
    hospitalityCounterContainer:HospitalityCounterContainer;
    clinicalCountersContainer:ClinicalCountersContainer;
}