import { ServicePerformanceData } from "./service.performance.data"

export interface PerformanceData {
    hospitalityService?: ServicePerformanceData[],
    clinicalService?: ServicePerformanceData[]
}