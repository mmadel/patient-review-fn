import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { NavItems } from './_nav';
import { NavItemsNormal } from './_navnormal';

@Component({
  selector: 'app-admin-layout-component',
  templateUrl: './admin-layout-component.component.html',
  styleUrls: ['./admin-layout-component.component.css']
})
export class AdminLayoutComponentComponent implements OnInit {
  navItems: INavData[] | null | undefined;
  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('userRole') === 'USER')
      this.navItems = NavItemsNormal;
    else
      this.navItems = NavItems;
  }

}
