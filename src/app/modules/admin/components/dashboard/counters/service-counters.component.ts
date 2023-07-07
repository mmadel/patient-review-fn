import { AfterContentInit, Component, Input } from '@angular/core';
import { cilFrown, cilHappy, cilMeh, cilMoodVeryGood } from '@coreui/icons';
@Component({
  selector: 'app-service-counters',
  templateUrl: './service-counters.component.html',
  styleUrls: ['./service-counters.component.css']
})
export class ServiceCountersComponent implements AfterContentInit {

  constructor() { }
  icons = { cilMoodVeryGood, cilHappy, cilMeh, cilFrown };
  @Input() withCharts?: boolean = true;
  brandData = [
    {
      icon: this.icons.cilMoodVeryGood,
      color:'success',
      values: [{ title: 'friends', value: '89K' }, { title: 'feeds', value: '459' }],
      capBg: { '--cui-card-cap-bg': '#3b5998' },


    },
    {
      icon: this.icons.cilHappy,
      color:'info',
      values: [{ title: 'followers', value: '973k' }, { title: 'tweets', value: '1.792' }],
      capBg: { '--cui-card-cap-bg': '#00aced' },

    },
    {
      icon: this.icons.cilMeh,
      color:'warning',
      values: [{ title: 'contacts', value: '500' }, { title: 'feeds', value: '1.292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' },
    },
    {
      icon: this.icons.cilFrown,
      color:'danger',
      values: [{ title: 'contacts', value: '500' }, { title: 'feeds', value: '1.292' }],
      capBg: { '--cui-card-cap-bg': '#4875b4' },
    },
  ];
  capStyle(value: string) {
    return !!value ? { '--cui-card-cap-bg': value } : {};
  }

  ngAfterContentInit(): void {
  }
  ngOnInit(): void {
  }

}
