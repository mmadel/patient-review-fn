import { ClinicalAverageColorRange } from "./cards.models/colors/clinical.average.color.values";
import { ClinicalHappyIndexColorRange } from "./cards.models/colors/clinical.happy.index.color.values";
import { ClinicalNPSColorRange } from "./cards.models/colors/clinical.nps.color.values";
import { HospitalityAverageColorRange } from "./cards.models/colors/hospitality.average.color.values";
import { HospitalityHappyIndexColorRange } from "./cards.models/colors/hospitality.happy.index.color.values";
import { HospitalityNPSColorRange } from "./cards.models/colors/hospitality.nps.color.values";

export class CardPerformanceDataColorLoader {
    static serviceName: string;
    public static load(perfromaneIndexName: string) {
        if (this.serviceName === 'hospitality') {
            if (perfromaneIndexName === 'Happy Index')
                return HospitalityHappyIndexColorRange;
            if (perfromaneIndexName === 'NPS')
                return HospitalityNPSColorRange;
            if (perfromaneIndexName === 'Average')
                return HospitalityAverageColorRange
        }

        if (this.serviceName === 'clinical') {
            if (perfromaneIndexName === 'Happy Index')
                return ClinicalHappyIndexColorRange
            if (perfromaneIndexName === 'NPS')
                return ClinicalNPSColorRange
            if (perfromaneIndexName === 'Average')
                return ClinicalAverageColorRange
        }
        return null;
    }
}