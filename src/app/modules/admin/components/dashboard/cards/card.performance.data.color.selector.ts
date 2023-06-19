import { CardPerformanceDataColorLoader } from "./card.performance.data.color.loader";
import { ColorRange } from "./cards.models/colors/color.range.values";

export class CardPerformanceDataColorSelector{
    public static select(serviceName: string, indexName: string, indexValue: number) {
        CardPerformanceDataColorLoader.serviceName = serviceName;
        var colorRange: ColorRange | null = CardPerformanceDataColorLoader.load(indexName);
        return this.chooseServiceByService(indexValue, colorRange);
    }
    
    private static numberInRange(value: number, min: number, max: number) {
        if (value >= min && value <= max)
            return true;
        return false;
    }
    private static chooseServiceByService(indexValue: number, colorRange: ColorRange | null): string {
        if (colorRange !== null) {
            if (this.numberInRange(indexValue,
                colorRange.successMin, colorRange.successMax))
                return "border-start-success"
            if (this.numberInRange(indexValue,
                colorRange.primaryMin, colorRange.primaryMax))
                return "border-start-primary"
            if (this.numberInRange(indexValue,
                colorRange.warningMin, colorRange.warningMax))
                return "border-start-warning"
            if (this.numberInRange(indexValue,
                colorRange.dangerMin, colorRange.dangerMax))
                return "border-start-danger"
        }
        return ""
    }
}