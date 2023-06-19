import { Injectable } from "@angular/core";
import { DashboardChartsData } from "./dashboard-charts-data";
import { IChartProps } from "./IChartProps";

@Injectable({
    providedIn: 'any'
})
export class ClinicalChartsData extends DashboardChartsData {
    public happyIndexData: number[] | undefined;
    public npsData: number[] | undefined;
    public averageData: number[] | undefined;
    createDataSet(): any[] {
        return [
            {
                data: this.happyIndexData,
                label: 'HappyIndex',
                ...this.assignColor()[0]
            },
            {
                data: this.npsData,
                label: 'NPS',
                ...this.assignColor()[1]
            },
            {
                data: this.averageData,
                label: 'Average',
                ...this.assignColor()[2]
            }
        ]
    }
    public mainChart: IChartProps = {};
    constructor() {
        super();
    }
    initMainChart(period: string) {
        this.mainChart['elements'] = period === 'Month' ? 31 : 31;
        this.mainChart['Data1'] = this.happyIndexData;
        this.mainChart['Data2'] = this.npsData;
        this.mainChart['Data3'] = this.averageData;
        let labels: string[] = this.assignLabel(period);
        let dataset: any[] = this.createDataSet();
        this.mainChart.type = 'line';
        this.mainChart.options = this.createChartOptions();
        this.mainChart.data = {
            dataset,
            labels
        };
    }

}