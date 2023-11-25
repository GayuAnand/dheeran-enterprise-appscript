import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';

@Component({
  selector: 'de-cable-list',
  templateUrl: './cable-list.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './cable-list.component.scss'],
})
export class CableListComponent extends BaseComponent implements OnInit, AfterViewInit {
  data = new MatTableDataSource<CustomerModel>([]);

  fullData: CustomerModel[] = [];

  displayedColumns: string[] = [
    this.settingsService.getCustomerCols()?.NAME?.label as string,
    this.settingsService.getCustomerCols()?.AREA?.label as string,
    this.settingsService.getCustomerCols()?.MOBILE?.label as string,
    // this.settingsService.getCustomerCols()?.STB?.label as string,
  ];

  searchText = '';

  statusControl = new FormControl<string[]>(['Active']);

  statusControlOptions: string[] = ['Active', 'Inactive'];

  selectAllStatus = false;

  areaControl = new FormControl<string[]>([]);
  
  areaControlOptions: string[] = [];

  selectAllArea = false;

  private _selectedStatusObj: Record<string, boolean> = {};

  private _selectedAreaObj: Record<string, boolean> = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.CABLE;
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.apiGSheetDataService.getSheetData(this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label as string)
      .subscribe((data) => {
        this.fullData = data;
        this.initializeFilters();
      });
  }

  initializeFilters() {
    const area: any = {};
    this.fullData.forEach(d => area[d.Area] = true);
    this.areaControlOptions = Object.keys(area);
    this.areaControlOptions.sort();
    this.areaControl.setValue(this.areaControlOptions.slice());
    this.selectAllArea = true;
    this.onFilterChange();
  }

  onFilterChange() {
    const byPassFilter = (data: CustomerModel) => true;
    let areaFilter = this.checkAreaFilter.bind(this);
    let statusFilter = this.checkStatusFilter.bind(this);
    let searchFilter = this.checkSearchFilter.bind(this);

    this._selectedAreaObj = {};
    (this.areaControl.value || []).forEach(area => this._selectedAreaObj[area] = true);

    this._selectedStatusObj = {};
    (this.statusControl.value || []).forEach(status => this._selectedStatusObj[status] = true);

    if ((this.areaControl.value || []).length === this.areaControlOptions?.length) {
      areaFilter = byPassFilter;
    }

    if ((this.statusControl.value || []).length === this.statusControlOptions?.length) {
      statusFilter = byPassFilter;
    }

    if (!this.searchText) {
      searchFilter = byPassFilter;
    }

    this.data.data = this.fullData.filter(areaFilter).filter(statusFilter).filter(searchFilter);
  }

  checkSearchFilter(data: CustomerModel) {
    return (`${data.Name || ''} ${data.Mobile || ''} ${data.STB || ''} ${data['Own Notes'] || ''} ${data.Notes || ''}`).toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0;
  }

  checkAreaFilter(data: CustomerModel) {
    return this._selectedAreaObj[data.Area];
  }

  checkStatusFilter(data: CustomerModel) {
    return (this._selectedStatusObj['Active'] && data.isActive()) || (this._selectedStatusObj['Inactive'] && !data.isActive());
  }

  toggleAllAreaSelection() {
    this.areaControl.setValue(this.selectAllArea ? this.areaControlOptions.slice() : []);
    this.onFilterChange();
  }

  onAreaSelectionChange() {
    this.selectAllArea = this.areaControl.value?.length === this.areaControlOptions?.length;
    this.onFilterChange();
  }

  toggleAllStatusSelection() {
    this.statusControl.setValue(this.selectAllStatus ? this.statusControlOptions.slice() : []);
    this.onFilterChange();
  }

  onStatusSelectionChange() {
    this.selectAllStatus = this.statusControl.value?.length === this.statusControlOptions?.length;
    this.onFilterChange();
  }

  getCellClassNames(data: any, columnName: string) {
    const centerAlign = ((columnName === this.settingsService.getCustomerCols()?.NAME?.label) || 
                         (columnName === this.settingsService.getCustomerCols()?.AREA?.label)) ? '' : 'align-center';
    const isActiveCustomer = (columnName === this.settingsService.getCustomerCols()?.NAME?.label) ? ((data.isActive()) ? 'bold-text success-text' : 'bold-text danger-text') : '';
    const mobileColumnFlow = (columnName === this.settingsService.getCustomerCols()?.MOBILE?.label) ? 'de-f-column' : '';
    return `${isActiveCustomer} ${centerAlign} ${mobileColumnFlow}`;
  }

  getMobileNumbers(data: string): string[] {
    return (data || '').split(/\s+/);
  }
}
