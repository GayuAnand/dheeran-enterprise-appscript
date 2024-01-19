import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { IApps, IMetadata } from '../interfaces';
import { EventService } from './event.service';
import versionInfo from './../../../versionInfo.json';
import { EN_MAPPING } from './../../../../src/assets/i18n/en.mapping';
import { AuthService } from './auth.service';

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

  isOnline = true;

  /**
   * Show app level loading screen with given message. This will prevent user from interacting with the application while processing.
   */
  _processingText = '';

  /**
   * Metadata from Google sheet
   */
  metadata: IMetadata = {};

  navigationTreeControl = new NestedTreeControl<NavMenuItem>((node) => node.children);

  flags = {
    showAboutDialog: false,
    showConfigDialog: false,
  };

  configurations = {
    showCableCSVExport: false,
  };

  private _navigationData: MatTreeNestedDataSource<NavMenuItem> = new MatTreeNestedDataSource();

  get pageTitle() {
    return this._pageTitle;
  }

  set pageTitle(value) {
    setTimeout(() => this._pageTitle = value);
  }

  get processingText() {
    return this._processingText;
  }

  set processingText(value) {
    setTimeout(() => this._processingText = value);
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

  constructor(
    private ngZone: NgZone,
    private authService: AuthService,
    private eventService: EventService,
  ) {
    this.init();
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }

  private async init() {
    this.checkAndPopulateNavigationData();
    this.eventService.isMobile.subscribe((isMobile) => (this.isMobile = isMobile));
    await this.getNetworkStatus();
    Network.addListener('networkStatusChange', (status) => this.ngZone.run(() => this.isOnline = status.connected));
  }

  async getNetworkStatus() {
    return this.isOnline = (await Network.getStatus()).connected;
  }

  checkAndPopulateNavigationData() {
    const navigationData: NavMenuItem[] = [
      {
        name: EN_MAPPING.COMMON.DASHBOARD,
        routerLink: ['/app/dashboard']
      },
    ];
    
    if (this.authService.hasAnyCablePermission()) {
      navigationData.push({
        name: EN_MAPPING.COMMON.CABLE,
        children: [
          {
            name: EN_MAPPING.COMMON.LIST,
            routerLink: ['/app/cable/list'],
          },
          {
            name: EN_MAPPING.COMMON.STATISTICS,
            routerLink: ['/app/cable/statistics'],
          },
          {
            name: EN_MAPPING.COMMON.OFFLINE_UPDATES,
            routerLink: ['/app/cable/offline-updates'],
          },
        ]
      });
    }

    if (this.authService.hasAnyBSNLPermission()) {
      const bsnlNavigationData = {
        name: EN_MAPPING.COMMON.BSNL,
        children: [
          {
            name: EN_MAPPING.COMMON.LIST,
            routerLink: ['/app/bsnl/list']
          },
        ]
      };

      if (this.authService.isBSNLAdmin()) {
        bsnlNavigationData.children.push({
          name: EN_MAPPING.COMMON.UTILITY,
          routerLink: ['/app/bsnl/utility']
        });
        bsnlNavigationData.children.push({
          name: EN_MAPPING.COMMON.OLT,
          routerLink: ['/app/bsnl/olt']
        });
        bsnlNavigationData.children.push({
          name: EN_MAPPING.COMMON.SYNC,
          routerLink: ['/app/bsnl/sync']
        });
      }

      navigationData.push(bsnlNavigationData);
    }

    if (this.authService.hasAnyUGPermission()) {
      navigationData.push({
        name: EN_MAPPING.COMMON.UG,
        children: [
          {
            name: EN_MAPPING.UG.PATROL_LIST,
            routerLink: ['/app/ug/patrol-list'],
          },
          {
            name: EN_MAPPING.UG.PATROL_STATISTICS,
            routerLink: ['/app/ug/patrol-statistics'],
          },
          {
            name: EN_MAPPING.UG.WORK_LIST,
            routerLink: ['/app/ug/work-list'],
          },
        ],
      });
    }

    if (this.authService.isAdmin()) {
      navigationData.push({
        name: EN_MAPPING.COMMON.UTILITY,
        routerLink: ['/app/utility'],
      });
    }

    this.navigationData = navigationData;
  }

  getGhPageAssetUrl(filename: string) {
    return `${this.ghPageUrl}/${filename}`;
  }

  getCustomerCols() {
    return this.metadata.sheetsInfo?.CUSTOMERS?.cols;
  }
}
