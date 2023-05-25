import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { NavItems } from './_nav';

@Component({
  selector: 'app-admin-layout-component',
  templateUrl: './admin-layout-component.component.html',
  styleUrls: ['./admin-layout-component.component.css']
})
export class AdminLayoutComponentComponent implements OnInit {
  navItems: INavData[] | null | undefined;
  constructor() { }

  ngOnInit(): void {
    this.navItems = NavItems;
  }

}
