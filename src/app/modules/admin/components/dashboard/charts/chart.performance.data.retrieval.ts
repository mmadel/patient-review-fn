import { Injectable } from "@angular/core";
import { ChartMetaData } from "./ChartMetaData";
import { IChartProps } from "./charts.models/IChartProps";

@Injectable({
    providedIn: 'any'
})
export class ChartPerformanceDataRetrieval {
    private happyIndexData: number[] | undefined;
    private npsData: number[] | undefined;
    private averageData: number[] | undefined;
    public mainChart: IChartProps = {};

    initMainChart(period: string = 'Month') {
        this.mainChart['elements'] = period === 'Month' ? 30 : 3;
        this.mainChart['Data1'] = this.happyIndexData;
        this.mainChart['Data2'] = this.npsData;
        this.mainChart['Data3'] = this.averageData;
        let labels: string[] = ChartMetaData.chartLabel(period)
        let datasets: any[] = [
            {
                data: this.mainChart['Data1'],
                label: 'HappUIndex',
                ...ChartMetaData.chartColors()[0]
            },
            {
                data: this.mainChart['Data2'],
                label: 'NPS',
                ...ChartMetaData.chartColors()[1]
            },
            {
                data: this.mainChart['Data3'],
                label: 'Average',
                ...ChartMetaData.chartColors()[2]
            }
        ];
        console.log(JSON.stringify(datasets))
        this.mainChart.type = 'line';
        this.mainChart.options = ChartMetaData.chartOptions();
        this.mainChart.data = {
            datasets,
            labels
        };
    }

    initData(happyIndexData: number[] | undefined,
        npsData: number[] | undefined,
        averageData: number[] | undefined) {
        this.happyIndexData = happyIndexData;
        this.npsData = npsData;
        this.averageData = averageData;
    }
}