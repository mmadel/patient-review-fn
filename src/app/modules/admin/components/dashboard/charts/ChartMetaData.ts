import { getStyle, hexToRgba } from '@coreui/utils/src';
import { TimeUtil } from 'src/app/modules/admin/utils/time.uti';
export class ChartMetaData {
    public static chartOptions(yMax:number) {
        const plugins = {
            legend: {
                display: true
            },
            tooltip: {
                callbacks: {
                    labelColor: function (context: any) {
                        return {
                            backgroundColor: context.dataset.borderColor
                        };
                    }
                }
            }
        };
        const options = {
            maintainAspectRatio: false,
            plugins,
            scales: {
                x: {
                    grid: {
                        drawOnChartArea: true
                    }
                },
                y: {
                    beginAtZero: true,
                    max: yMax,
                }
            },
            elements: {
                line: {
                    tension: 0.4
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 0
                }
            }
        };
        return options;
    }
    public static chartColors() {
        const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
        const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
        const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';
        const brandDanger = getStyle('--cui-danger') || '#f86c6b';
        return [
            {
                // brandInfo
                backgroundColor: 'transparent',
                borderColor: brandInfo,
                pointHoverBackgroundColor: brandInfo,
                borderWidth: 2,
                fill: true
            },
            {
                // brandSuccess
                backgroundColor: 'transparent',
                borderColor: brandSuccess || '#4dbd74',
                pointHoverBackgroundColor: '#fff'
            },
            {
                // brandDanger
                backgroundColor: 'transparent',
                borderColor: brandDanger || '#f86c6b',
                pointHoverBackgroundColor: brandDanger,
            }
        ];
    }
    public static chartLabel(period: string = 'Month') {
        let labels: string[] = [];
        if (period === 'Year')
            labels = TimeUtil.getMonths();
        if (period === 'Month')
            labels = TimeUtil.getDays();
        if (period === 'Day')
            labels = TimeUtil.getHours();
        return labels;
    }
}