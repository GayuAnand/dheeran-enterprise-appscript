import { Component, OnInit } from '@angular/core';

import { BaseComponent } from 'src/app/common';

@Component({
  selector: 'de-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.DASHBOARD;
  }
}
