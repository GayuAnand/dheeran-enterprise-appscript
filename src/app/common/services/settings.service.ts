import { Injectable } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { IMetadata } from '../interfaces';
import { EventService } from './event.service';
import { EN_MAPPING } from './../../../../src/assets/i18n/en.mapping';

export interface NavMenuItem {
  name: string;
  icon?: string;
  index?: number;
  children?: NavMenuItem[];
  routerLink?: string[];
}

@Injectable()
export class SettingsService {
  pageTitle = EN_MAPPING.COMMON.HOME;

  metadata: IMetadata = {};

  isMobile = false;

  navigationTreeControl = new NestedTreeControl<NavMenuItem>((node) => node.children);

  private _navigationData: MatTreeNestedDataSource<NavMenuItem> = new MatTreeNestedDataSource();

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

  constructor(private eventService: EventService) {
    this.init();
    this.navigationData = [
      {
        name: 'Search',
        routerLink: ['/app/search']
      },
      {
        name: 'Tasks',
        routerLink: ['/app/tasks']
      },
    ];
  }

  private init() {
    this.eventService.isMobile.subscribe((isMobile) => (this.isMobile = isMobile));
  }
}
