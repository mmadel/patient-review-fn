import { INavData } from '@coreui/angular-pro';

export const NavItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Administration',
    url: '',
    iconComponent: { name: 'cil-applicationsSettings' },
    children: [
      {
        name: 'Feedback Create',
        url: 'feedback/create'
      },
      {
        name: 'Clinics',
        url: 'clinic/list'
      }
    ]
  },
];
