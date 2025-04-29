import { cilFrown, cilHappy, cilMeh, cilMoodVeryGood } from '@coreui/icons';
import { CountersContainer } from '../../../models/counters/counters.container';

export class countersContainerFiller {
    private static icons = { cilMoodVeryGood, cilHappy, cilMeh, cilFrown };
    private static data = [
        {
            icon: this.icons.cilMoodVeryGood,
            color: 'success',
            values: [{ title: 'hospitality', value: '' }, { title: 'clinical', value: '' }],
            capBg: { '--cui-card-cap-bg': '#3b5998' },


        },
        {
            icon: this.icons.cilHappy,
            color: 'info',
            values: [{ title: 'hospitality', value: '' }, { title: 'clinical', value: '' }],
            capBg: { '--cui-card-cap-bg': '#00aced' },

        },
        {
            icon: this.icons.cilMeh,
            color: 'danger',
            values: [{ title: 'hospitality', value: '' }, { title: 'clinical', value: '' }],
            capBg: { '--cui-card-cap-bg': '#4875b4' },
        },
    ];

    public static fill(countersContainer: CountersContainer) {
        this.data[0].values[0].value = "(" + countersContainer.hospitalityCounterContainer.veryPositive.toString() + ")"
            + " " + countersContainer.hospitalityCounterContainer.veryPositivePercentage.toString() + "%";

        this.data[0].values[1].value = "(" + countersContainer.clinicalCountersContainer.veryPositive.toString() + ")"
            + " " + countersContainer.clinicalCountersContainer.veryPositivePercentage.toString() + "%";

        this.data[1].values[0].value = "(" + countersContainer.hospitalityCounterContainer.positive.toString() + ")"
            + " " + countersContainer.hospitalityCounterContainer.positivePercentage.toString() + "%";

        this.data[1].values[1].value = "(" + countersContainer.clinicalCountersContainer.positive.toString() + ")"
            + " " + countersContainer.clinicalCountersContainer.positivePercentage.toString() + "%";

        this.data[2].values[0].value = "(" + countersContainer.hospitalityCounterContainer.negative.toString() + ")"
            + " " + countersContainer.hospitalityCounterContainer.negativePercentage.toString() + "%";

        this.data[2].values[1].value = "(" + countersContainer.clinicalCountersContainer.negative.toString() + ")"
            + " " + countersContainer.clinicalCountersContainer.negativePercentage.toString() + "%";
        return this.data;
    }
}