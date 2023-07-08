import { cilFrown, cilHappy, cilMeh, cilMoodVeryGood } from '@coreui/icons';
import { CountersContainer } from '../../../models/counters/counters.container';

export class countersContainerFiller {
    private static icons = { cilMoodVeryGood, cilHappy, cilMeh, cilFrown };
    private static data = [
        {
            icon: this.icons.cilMoodVeryGood,
            color: 'success',
            values: [{ title: 'hospitality', value: '89K' }, { title: 'clinical', value: '459' }],
            capBg: { '--cui-card-cap-bg': '#3b5998' },


        },
        {
            icon: this.icons.cilHappy,
            color: 'info',
            values: [{ title: 'hospitality', value: '973k' }, { title: 'clinical', value: '1.792' }],
            capBg: { '--cui-card-cap-bg': '#00aced' },

        },
        {
            icon: this.icons.cilMeh,
            color: 'warning',
            values: [{ title: 'hospitality', value: '500' }, { title: 'clinical', value: '1.292' }],
            capBg: { '--cui-card-cap-bg': '#4875b4' },
        },
        {
            icon: this.icons.cilFrown,
            color: 'danger',
            values: [{ title: 'hospitality', value: '500' }, { title: 'clinical', value: '1.292' }],
            capBg: { '--cui-card-cap-bg': '#4875b4' },
        },
    ];
    
    public static fill(countersContainer: CountersContainer) {
       this.data[0].values[0].value = countersContainer.hospitalityCounterContainer.veryPositive.toString()
       this.data[0].values[1].value = countersContainer.clinicalCountersContainer.veryPositive.toString()

       this.data[1].values[0].value = countersContainer.hospitalityCounterContainer.positive.toString()
       this.data[1].values[1].value = countersContainer.clinicalCountersContainer.positive.toString()

       this.data[2].values[0].value = countersContainer.hospitalityCounterContainer.negative.toString()
       this.data[2].values[1].value = countersContainer.clinicalCountersContainer.negative.toString()

       this.data[3].values[0].value = countersContainer.hospitalityCounterContainer.veryNegative.toString()
       this.data[3].values[1].value = countersContainer.clinicalCountersContainer.veryNegative.toString()

       return this.data;
    }
}