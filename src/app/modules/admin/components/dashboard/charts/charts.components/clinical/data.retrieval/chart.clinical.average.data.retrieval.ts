import { Injectable } from "@angular/core";
import { IChartProps } from "../../../../dashboard-charts-data";
import { ChartMetaData } from "../../../ChartMetaData";

@Injectable({
    providedIn: 'any'
})
export class ClinicalChartAverageDataRetrieval {
    public mainChart: IChartProps = {};
    private averageData: number[] | undefined;

    initMainChart(period: string = 'Month') {
        this.mainChart['elements'] = period === 'Month' ? 30 : 3;
        this.mainChart['Data1'] = this.averageData;
        let labels: string[] = ChartMetaData.chartLabel(period)
        let datasets: any[] = [
            {
                data: this.mainChart['Data1'],
                label: 'Average',
                ...ChartMetaData.chartColors()[2]
            }
        ];
        this.mainChart.type = 'line';
        this.mainChart.options = ChartMetaData.chartOptions(3);
        this.mainChart.data = {
            datasets,
            labels
        };
    }

    initData(
        averageData: number[] | undefined) {
        this.averageData = averageData;
    }
}