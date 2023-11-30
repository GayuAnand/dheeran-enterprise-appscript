import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { IMetadata } from '../interfaces';
import { EventService } from './event.service';
import versionInfo from './../../../versionInfo.json';
import { EN_MAPPING } from './../../../../src/assets/i18n/en.mapping';

export interface NavMenuItem {
  name: string;
  icon?: string;
  index?: number;
  children?: NavMenuItem[];
  routerLink?: string[];
}

@Injectable()
export class SettingsService implements OnDestroy {
  private _pageTitle = EN_MAPPING.COMMON.HOME;

  currentVersion = versionInfo.latest;

  ghPageUrl = 'https://gayuanand.github.io/dheeran-enterprise-appscript';

  isMobile = false;

  isNative = Capacitor.isNativePlatform();

  isOnline = false;

  /**
   * Metadata from Google sheet
   */
  metadata: IMetadata = {};

  navigationTreeControl = new NestedTreeControl<NavMenuItem>((node) => node.children);

  flags = {
    showAboutDialog: false,
  };

  private _navigationData: MatTreeNestedDataSource<NavMenuItem> = new MatTreeNestedDataSource();

  get pageTitle() {
    return this._pageTitle;
  }

  set pageTitle(value) {
    setTimeout(() => this._pageTitle = value);
  }

  get navigationData() {
    return this._navigationData.data;
  }

  set navigationData(data: NavMenuItem[]) {
    const processIndex = (nodes: NavMenuItem[], index = 0) => {
      nodes.forEach((node) => {
        node.index = index;
        processIndex(node?.children || [], index + 1);
      });
    };

    processIndex(data);
    this._navigationData.data = data;
  }

  constructor(private eventService: EventService, private ngZone: NgZone) {
    this.init();
    this.navigationData = [
      {
        name: EN_MAPPING.COMMON.DASHBOARD,
        routerLink: ['/app/dashboard']
      },
      {
        name: EN_MAPPING.COMMON.CABLE,
        routerLink: ['/app/cable-list']
      },
      {
        name: EN_MAPPING.COMMON.BSNL_CONNECT,
        routerLink: ['/app/bsnl-connect']
      },
      {
        name: EN_MAPPING.COMMON.UG_PATROL,
        routerLink: ['/app/ug-patrol']
      },
    ];
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }

  private async init() {
    this.eventService.isMobile.subscribe((isMobile) => (this.isMobile = isMobile));
    await this.getNetworkStatus();
    Network.addListener('networkStatusChange', (status) => this.ngZone.run(() => this.isOnline = status.connected));
  }

  async getNetworkStatus() {
    return this.isOnline = (await Network.getStatus()).connected;
  }

  getGhPageAssetUrl(filename: string) {
    return `${this.ghPageUrl}/${filename}`;
  }

  getCustomerCols() {
    return this.metadata.sheetsInfo?.CUSTOMERS?.cols;
  }
}
