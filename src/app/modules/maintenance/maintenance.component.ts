import { FileInfo } from '@capacitor/filesystem';
import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { BaseComponent, UiBundleUpdaterService } from 'src/app/common';
import { IFileInfo } from 'src/app/api';

interface FileNode extends FileInfo {
  name: string;
  children?: FileNode[];
}

interface FlatFileNode extends FileNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'de-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './maintenance.component.scss'],
})
export class MaintenanceComponent extends BaseComponent implements OnInit {
  mobile = '';

  filesInfo: (FileInfo & { children?: FileInfo[] })[] = [];

  private _transformer = (node: FileNode, level: number) => {
    return Object.assign({
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    }, node);
  };

  treeControl = new FlatTreeControl<FlatFileNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public uiUpdaterService: UiBundleUpdaterService) {
    super();
  }

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.UTILITY;
  }

  hasChild(_: number, node: FlatFileNode) {
    return node.expandable;
  }

  clearData() {
    this.storageService.clearData();
  }

  async deleteFileOrFolder(node: IFileInfo) {
    await this.fs.deleteFileOrFolder(node.path as string, node.type === 'directory');
    await this.listDir();
  }

  async listDir() {
    this.dataSource.data = await this.fs.listDir('', true);
    console.log(this.dataSource.data);
  }
}
