import { Component, OnInit } from '@angular/core';

import { BaseComponent } from 'src/app/common';

@Component({
  selector: 'de-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  cards: any[] = [];

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.DASHBOARD;
  }

  getCardsInfo() {
    this.cards = [];

    if (this.authService.hasAnyCablePermission()) {
      this.cards.push({
        routerLink: '../cable',
        icon: 'cable',
        text: this.TKey.COMMON.CABLE,
      })
    }

    if (this.authService.hasAnyBSNLPermission()) {
      this.cards.push({
        routerLink: '../bsnl',
        icon: 'bsnl',
        isSvgIcon: true,
        text: this.TKey.COMMON.BSNL,
      })
    }

    if (this.authService.hasAnyTasksPermission()) {
      this.cards.push({
        routerLink: '../tasks',
        icon: 'task',
        text: this.TKey.COMMON.TASKS,
      })
    }

    if (this.authService.hasAnyUGPermission()) {
      this.cards.push({
        routerLink: '../ug',
        icon: 'groups',
        text: this.TKey.COMMON.UG,
      })
    }

    if (this.authService.isAdmin()) {
      this.cards.push({
        routerLink: '../utility',
        icon: 'engineering',
        text: this.TKey.COMMON.UTILITY,
      })
    }

    return this.cards;
  }
}
