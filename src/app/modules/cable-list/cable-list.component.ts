import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';

@Component({
  selector: 'de-cable-list',
  templateUrl: './cable-list.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './cable-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CableListComponent extends BaseComponent implements OnInit, AfterViewInit {
  data = new MatTableDataSource<CustomerModel>([]);

  fullData: CustomerModel[] = [];

  expandedElement!: CustomerModel;

  displayedColumns: string[] = [
    this.settingsService.getCustomerCols()?.NAME?.label as string,
    this.settingsService.getCustomerCols()?.AREA?.label as string,
    this.settingsService.getCustomerCols()?.MOBILE?.label as string,
    // this.settingsService.getCustomerCols()?.STB?.label as string,
  ];

  searchText = '';

  statusFilter = this.getNewFilterControl(['Active'], ['Active', 'Inactive']);

  areaFilter = this.getNewFilterControl([], []);

  monthsFilter = this.getNewFilterControl([], []);

  showAdvancedFilters = false;

  showCollectedCustomers = false;

  showPendingSettlement = false;

  pendingSettlementAmount = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.filterArea = this.filterArea.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
    this.filterPendingSettlement = this.filterPendingSettlement.bind(this);

    this.settingsService.pageTitle = this.TKey.COMMON.CABLE;
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.refreshData();
  }

  refreshData() {
    this.apiGSheetDataService.getSheetData(this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label as string, true)
      .subscribe((data) => {
        this.fullData = data;
        this.initializeFilters();
      });
  }

  getNewFilterControl(defaultValue: string[] = [], options: string[] = []) {
    const self = this;

    return {
      control: new FormControl<string[]>(defaultValue),
      controlOptions: options,
      selectAll: false,
      _selectedObj: {},
      toggleSelectAll() {
        this.control.setValue(this.selectAll ? this.controlOptions.slice() : []);
        self.onFilterChange();
      },
      onSelectionChange() {
        this.selectAll = this.control.value?.length === this.controlOptions?.length;
        self.onFilterChange();
      }
    } as {
      control: FormControl<string[]>,
      controlOptions: string[],
      selectAll: boolean,
      _selectedObj: Record<string, boolean>,
      toggleSelectAll: () => void,
      onSelectionChange: () => void,
    };
  }

  initializeFilters() {
    const area: any = {};
    this.fullData.forEach(d => area[d.Area] = true);
    this.areaFilter.controlOptions = Object.keys(area);
    this.areaFilter.controlOptions.sort();
    this.areaFilter.control.setValue(this.areaFilter.controlOptions.slice());
    this.areaFilter.selectAll = true;
    this.monthsFilter.controlOptions = this.fullData[0].getMonthsInOrder();
    this.onFilterChange();
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
    this.showPendingSettlement = false;
    this.showCollectedCustomers = false;
    this.monthsFilter.control.setValue([]);
    this.onFilterChange();
  }

  onFilterChange() {
    const byPassFilter = (data: CustomerModel) => true;
    let filterArea = this.filterArea;
    let filterStatus = this.filterStatus;
    let filterSearch = this.filterSearch;
    let filterCollection = this.filterCollection;
    let filterPendingSettlement = this.filterPendingSettlement;

    this.areaFilter._selectedObj = {};
    (this.areaFilter.control.value || []).forEach(area => this.areaFilter._selectedObj[area] = true);

    this.statusFilter._selectedObj = {};
    (this.statusFilter.control.value || []).forEach(status => this.statusFilter._selectedObj[status] = true);

    // None or all selected
    if (!this.areaFilter.control.value?.length ||
        (this.areaFilter.control?.value || []).length === this.areaFilter.controlOptions?.length) {
      filterArea = byPassFilter;
    }

    // None or all selected
    if (!this.statusFilter.control.value?.length ||
        (this.statusFilter.control?.value || []).length === this.statusFilter.controlOptions?.length) {
      filterStatus = byPassFilter;
    }

    if (!this.searchText) {
      filterSearch = byPassFilter;
    }

    // None or all selected
    if (!this.monthsFilter.control.value?.length ||
        (this.monthsFilter.control.value || []).length === this.monthsFilter.controlOptions?.length) {
      filterCollection = byPassFilter;
    }

    // Skip collection filter when PendingSettlement filter is enabled
    this.pendingSettlementAmount = 0;
    if (this.showPendingSettlement) {
      filterCollection = byPassFilter;
    } else {
      filterPendingSettlement = byPassFilter;
    }

    this.data.data = this.fullData.filter(filterArea).filter(filterStatus).filter(filterSearch).filter(filterCollection).filter(filterPendingSettlement);

    if (this.showPendingSettlement) {
      this.pendingSettlementAmount = this.data.data.reduce((acc, d) => {
        acc += d.getPendingSettlement() as number;
        return acc;
      }, 0);
    }
  }

  filterSearch(data: CustomerModel) {
    return data.freeTextSearch(this.searchText);
  }

  filterArea(data: CustomerModel) {
    return this.areaFilter._selectedObj[data.Area];
  }

  filterStatus(data: CustomerModel) {
    return (this.statusFilter._selectedObj['Active'] && data.isActive()) || (this.statusFilter._selectedObj['Inactive'] && !data.isActive());
  }

  filterCollection(data: CustomerModel) {
    const value = this.monthsFilter.control.value || [];
    if (value.length) {
      return value.every((month) => {
        const collectedAmount = !!data[month as keyof CustomerModel];
        return (collectedAmount && this.showCollectedCustomers) || (!collectedAmount && !this.showCollectedCustomers);
      });
    }
    return true;
  }

  filterPendingSettlement(data: CustomerModel) {
    if (this.showPendingSettlement) {
      return !!data.getPendingSettlement();
    }
    return true;
  }

  getCellClassNames(data: any, columnName: string) {
    const centerAlign = ((columnName === this.settingsService.getCustomerCols()?.NAME?.label) || 
                         (columnName === this.settingsService.getCustomerCols()?.AREA?.label)) ? '' : 'align-center';
    const isActiveCustomer = (columnName === this.settingsService.getCustomerCols()?.NAME?.label) ? (data.isActive() ? 'success-text' : 'danger-text') : '';
    const mobileColumnFlow = (columnName === this.settingsService.getCustomerCols()?.MOBILE?.label) ? 'de-f-column' : '';
    const showBorder = (data === this.expandedElement) ? 'de-noborder--force' : '';
    return `${isActiveCustomer} ${centerAlign} ${mobileColumnFlow} ${showBorder}`;
  }
}
