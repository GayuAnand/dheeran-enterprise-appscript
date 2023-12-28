import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NavMenuItem } from './../../services';
import { BaseComponent } from './../base.component';
import { IApps, IRoleValue } from '../../interfaces';

@Component({
  selector: 'de-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent extends BaseComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;

  ngOnInit() {
    this.eventService.isMobile.subscribe((isMobile) => {
      if (isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  checkAndCloseMainNavForMobile() {
    if (this.settingsService.isMobile) {
      setTimeout(() => this.sidenav.close());
    }
  }

  hybridClearData() {
    if (this.storageService.isNative) {
      this.fs.deleteFileOrFolder('data', true);
    } else {
      this.storageService.clearData();
    }
  }

  signOut() {
    this.apiServices.auth.signOut();
  }

  hasChild(_: number, node: NavMenuItem) {
    return !!node.children && node.children.length > 0;
  }
}
