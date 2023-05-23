import { INavData } from '@coreui/angular-pro';

export const NavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Patient',
    url: '',
    iconComponent: { name: 'cil-disabled' },
    children: [
      {
        name: 'Patient List',
        url: 'patient/list'
      },
    ]
  },
  {
    name: 'User',
    url: '',
    iconComponent: { name: 'cil-user' },
    children: [
      {
        name: 'List Users',
        url: ''
      },
    ]
  },
  {
    name: 'Administration',
    url: '',
    iconComponent: { name: 'cil-devices' },
    children: [
      {
        name: 'Insurance Compnay',
        url: 'insurance/company/list'
      },
      {
        name: 'Appointment Type',
        url: ''
      },
      {
        name: 'Scheduler Configuration',
        url: ''
      }
    ],
  },
  {
    name: 'Scheduler',
    url: '',
    iconComponent: { name: 'cil-calendar' },
    children: [
      {
        name: 'View Scheduler',
        url: ''
      }
    ]
  }
];
