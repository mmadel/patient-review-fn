import { Injectable } from "@angular/core";
import { IChartProps } from "../../../../dashboard-charts-data";
import { ChartMetaData } from "../../../ChartMetaData";

@Injectable({
    providedIn: 'any'
})
export class HospitalityChartPerformanceDataRetrieval {
    private happyIndexData: number[] | undefined;
    private npsData: number[] | undefined;
    public mainChart: IChartProps = {};

    initMainChart(period: string = 'Month') {
        this.mainChart['elements'] = period === 'Month' ? 30 : 3;
        this.mainChart['Data1'] = this.happyIndexData;
        this.mainChart['Data2'] = this.npsData;
        let labels: string[] = ChartMetaData.chartLabel(period)
        let datasets: any[] = [
            {
                data: this.mainChart['Data1'],
                label: 'HappyIndex',
                ...ChartMetaData.chartColors()[0]
            },
            {
                data: this.mainChart['Data2'],
                label: 'NPS',
                ...ChartMetaData.chartColors()[1]
            }
        ];
        this.mainChart.type = 'line';
        this.mainChart.options = ChartMetaData.chartOptions(100);
        this.mainChart.data = {
            datasets,
            labels
        };
    }

    initData(happyIndexData: number[] | undefined,
        npsData: number[] | undefined) {
        this.happyIndexData = happyIndexData;
        this.npsData = npsData;
    }
}