import * as moment from "moment";

export class TimeUtil {

    public static getHours() {
        const items: string[] = [];
        for (var i = 0; i < 24; i++) {
            var ff = moment({ hour: i }).format('h A');
            items.push(ff)
        }
        return items;
    }
    public static getDays() {
        var daysInMonth = moment().daysInMonth();
        var arrDays = [];

        while (daysInMonth) {
            var current = moment(new Date()).date(daysInMonth).format('DD')
            arrDays.push(current);
            daysInMonth--;
        }
        arrDays.reverse();
        return arrDays;
    }
    public static getMonths() {
        return Array.apply(0, Array(12)).map(function (_, i) { return moment(new Date()).month(i).format('MMMM') });
    }

    public static getDateRangePerTimeUnit(timeUnit: string) {
        
        var dateRange: number[] = new Array();
        if (timeUnit === 'Day') {
            dateRange[0]= moment(new Date()).startOf('day').valueOf()
            dateRange[1] =moment(new Date()).endOf('day').valueOf()
        }
        if (timeUnit == 'Month') {
            dateRange[0]= moment(new Date()).startOf('month').valueOf()
            dateRange[1] =moment(new Date()).endOf('month').valueOf()
        }
        if (timeUnit == 'Year') {
            dateRange[0]= moment(new Date()).startOf('year').valueOf()
            dateRange[1] =moment(new Date()).endOf('year').valueOf()
        }
        return dateRange;
    }
}