import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { IMetadata } from '../interfaces';
import { AuthService } from './auth.service';
import { EventService } from './event.service';
import versionInfo from './../../../versionInfo.json';
import { environment } from 'src/environments/environment';
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

  assetDomain = 'https://portal.dheeranenterprise.in';

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
    if (!environment.production) console.log(this);
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

  getPaymentInfo() {
    const paymentInfo = this.metadata.paymentInfo || {};
    return {
      upiId: paymentInfo.upiId || '7204413241@paytm',
      isMerchant: paymentInfo.isMerchant || false,
      merchantCode: paymentInfo.merchantCode || '',
      bankingName: paymentInfo.bankingName || '',
      companyName: paymentInfo.companyName || '',
    };
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

    if (this.authService.hasAnyNklCablePermission()) {
      navigationData.push({
        name: EN_MAPPING.COMMON.NKL_CABLE,
        children: [
          {
            name: EN_MAPPING.COMMON.LIST,
            routerLink: ['/app/nklcable/list'],
          },
          {
            name: EN_MAPPING.COMMON.STATISTICS,
            routerLink: ['/app/nklcable/statistics'],
          },
          {
            name: EN_MAPPING.COMMON.OFFLINE_UPDATES,
            routerLink: ['/app/nklcable/offline-updates'],
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
          {
            name: EN_MAPPING.COMMON.UTILITY,
            routerLink: ['/app/bsnl/utility']
          }
        ]
      };

      if (this.authService.isBSNLAdmin()) {
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

    if (this.authService.hasAnyTasksPermission()) {
      const tasksNavigationData = {
        name: EN_MAPPING.COMMON.TASKS,
        children: [
          {
            name: EN_MAPPING.COMMON.LIST,
            routerLink: ['/app/tasks/list']
          },
        ]
      };

      navigationData.push(tasksNavigationData);
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

  getUserMobileNumber(userName: string) {
    return this.metadata.loginUsers?.find(user => user.name === userName)?.mobile?.toString() || '';
  }

  getAssetUrl(filename: string) {
    return `${this.assetDomain}/${filename}`;
  }

  getCustomerCols() {
    return this.metadata.sheetsInfo?.CUSTOMERS?.cols;
  }
}
