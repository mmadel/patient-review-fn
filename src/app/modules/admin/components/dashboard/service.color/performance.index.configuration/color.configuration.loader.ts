import { ColorRange } from "./models/color.range.values";
import { ClinicalAverageColorRange } from "./models/clinical.average.color.values";
import { ClinicalHappyIndexColorRange } from "./models/clinical.happy.index.color.values";
import { ClinicalNPSColorRange } from "./models/clinical.nps.color.values";
import { HospitalityAverageColorRange } from "./models/hospitality.average.color.values";
import { HospitalityHappyIndexColorRange } from "./models/hospitality.happy.index.color.values";
import { HospitalityNPSColorRange } from "./models/hospitality.nps.color.values";

export class ServiceColorLoader {
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