import { INavData } from '@coreui/angular-pro';

export const NavItemsNormal: INavData[] = [
  
  {
    name: 'Patient',
    url: '',
    iconComponent: { name: 'cil-applicationsSettings' },
    children: [
      {
        name: 'Feedback Create',
        url: 'feedback/create'
      },
    ]
  }
];
