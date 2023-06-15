import { PerformanceIndexContainer } from "../../../models/performance.index/performance.index.container";
import { PerformanceColorSelector } from "../service.color/performance.color.selector";
import { PerformanceData } from "./performance.data";
import { ServicePerformanceData } from "./service.performance.data";

export class PerformanceDataCreator {
    public static create(performanceContainer: PerformanceIndexContainer): PerformanceData[] {
        var performanceData: PerformanceData[] = new Array();

        for (const [key, value] of Object.entries(performanceContainer)) {
            if (key === 'hospitalityContainer') {
                var hospitalityServicePerformanceData: ServicePerformanceData[] = new Array();
                for (const [hospitalityKey, hospitalityValue] of Object.entries(value)) {
                    var hospitalityPerformanceData: ServicePerformanceData = this.construcServicePerformanceData(hospitalityKey, hospitalityValue);
                    hospitalityPerformanceData.color = PerformanceColorSelector.select('hospitality', hospitalityPerformanceData.performanceName, hospitalityPerformanceData.performanceValue);
                    hospitalityServicePerformanceData.push(hospitalityPerformanceData);
                }
                performanceData.push({
                    hospitalityService: hospitalityServicePerformanceData
                })
            }
            if (key === 'clinicalContainer') {
                var clinicalServicePerformanceData: ServicePerformanceData[] = new Array();
                for (const [hospitalityKey, hospitalityValue] of Object.entries(value)) {
                    var clinicalPerformanceData: ServicePerformanceData = this.construcServicePerformanceData(hospitalityKey, hospitalityValue);
                    clinicalPerformanceData.color = PerformanceColorSelector.select('clinical', clinicalPerformanceData.performanceName, clinicalPerformanceData.performanceValue);
                    clinicalServicePerformanceData.push(clinicalPerformanceData);
                }
                performanceData.push({
                    clinicalService: clinicalServicePerformanceData
                })
            }
        }
        return performanceData;
    }

    private static construcServicePerformanceData(name: string, value: any): ServicePerformanceData {
        var performanceCounters: ServicePerformanceData = {
            performanceName: "",
            performanceLabel: "",
            performanceValue: 0,
            color: ""
        };
        if (name === 'happyIndex') {
            performanceCounters = {
                "performanceName": "Happy Index",
                "performanceLabel": "It can range from 0 to 100.",
                "performanceValue": Number(value),
                "color": ""
            }
        }
        if (name === 'nps') {
            performanceCounters = {
                "performanceName": "NPS",
                "performanceLabel": "It can range from -100 to 100.",
                "performanceValue": Number(value),
                "color": ""
            }
        }
        if (name === 'average') {
            performanceCounters = {
                "performanceName": "Average",
                "performanceLabel": "Average with 4-scale surveys.",
                "performanceValue": Number(value),
                "color": ""
            }
        }
        return performanceCounters;
    }
}