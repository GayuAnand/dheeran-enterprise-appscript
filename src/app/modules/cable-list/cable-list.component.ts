import { concatMap, map } from 'rxjs';
import { debounce } from 'typescript-debounce-decorator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';
import { IApps, IRoleValue } from 'src/app/common/interfaces';

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
export class CableListComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  data = new MatTableDataSource<CustomerModel>([]);

  fullData: CustomerModel[] = [];

  expandedElement!: CustomerModel;

  customerColumns = this.settingsService.metadata.sheetsInfo?.CUSTOMERS?.cols;

  allColumns = [
    this.customerColumns?.NAME?.label || '',
    this.customerColumns?.AREA?.label || '',
    this.customerColumns?.MOBILE?.label || '',
    this.customerColumns?.STB?.label || '',
  ];

  displayedColumns: string[] = [];

  searchText = '';

  statusFilter = this.getNewFilterControl(['Active'], ['Active', 'Inactive']);

  areaFilter = this.getNewFilterControl([], []);

  agentsFilter = this.getNewFilterControl([], []);

  monthsFilter = this.getNewFilterControl([], []);

  showAdvancedFilters = false;

  showCollectedCustomers = false;

  showPendingSettlement = false;

  pendingSettlementAmount = 0;

  cacheInfo: any = null;

  editCustomerOrig!: CustomerModel | null;

  editCustomer!: CustomerModel;

  processingLatLng = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.filterArea = this.filterArea.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.filterCollection = this.filterCollection.bind(this);
    this.filterPendingSettlement = this.filterPendingSettlement.bind(this);

    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));

    this.settingsService.pageTitle = this.TKey.COMMON.CABLE;
    this.geolocationService.getCurrentPosition().subscribe(s => console.log(s));
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.refreshDisplayedColumns();
    this.refreshData(false, true);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cacheInfo?.destroy();
  }

  getLatLng(customer: CustomerModel) {
    this.processingLatLng = true;
    this.geolocationService.getCurrentPosition()
      .subscribe((position) => {
        this.processingLatLng = false;
        customer.Latitude = position.coords.latitude;
        customer.Longitude = position.coords.longitude;
      });
  }

  refreshDisplayedColumns() {
    if (this.settingsService.isMobile) {
      this.displayedColumns = this.allColumns.slice(0, 2);
    } else {
      this.displayedColumns = this.allColumns.slice(0, 4);
    }
    this.displayedColumns.push('ACTIONS');
  }

  refreshData(force = false, resetFilters = false) {
    this.settingsService.processingText = `Refreshing data...`;
    this.apiGSheetDataService.getSheetData<CustomerModel>(this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label as string, CustomerModel, force)
      .pipe(
        concatMap((res) => this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label}` as string, this.cacheInfo)
          .pipe(
            map((value) => {
              this.cacheInfo = value;
              return res;
            }))
          )
      )
      .subscribe({
        next: (data) => {
          this.settingsService.processingText = '';
          this.fullData = data;
          this.initializeFilters(resetFilters);
        },
        error: () => this.settingsService.processingText = ''
      });
  }

  initializeFilters(resetFilters = false) {
    const area: any = {};
    const appliedAreaFilters = this.areaFilter.control.value;
    this.fullData.forEach(d => area[d.Area] = true);
    this.areaFilter.controlOptions = Object.keys(area);
    this.areaFilter.controlOptions.sort();
    this.areaFilter.selectAll = false;
    if (!appliedAreaFilters?.length || resetFilters) {
      this.areaFilter.control.setValue([]);
    } else {
      this.areaFilter.control.setValue(appliedAreaFilters);
    }

    const appliedMonthsFilters = this.monthsFilter.control.value;
    this.monthsFilter.controlOptions = this.fullData[0]?.getMonthsInOrder() || [];
    if (!appliedMonthsFilters?.length || resetFilters) {
      this.monthsFilter.control.setValue([]);
    } else {
      this.monthsFilter.control.setValue(appliedMonthsFilters);
    }
    
    let agents: any = {};
    const appliedAgentsFilters = this.agentsFilter.control.value;
    this.fullData.forEach((data) => agents = Object.assign(agents, data.getCollectionAgents()));
    this.agentsFilter.controlOptions = Object.keys(agents);
    this.agentsFilter.controlOptions.sort();
    if (this.authService.hasPermission(this.METADATA.APPS.CABLE, this.METADATA.ROLES.ADMIN)) {
      if (!appliedAgentsFilters?.length || resetFilters) {
        this.agentsFilter.control.setValue([]);
      } else {
        this.agentsFilter.control.setValue(appliedAgentsFilters);
      }
      this.agentsFilter.control.setValue([]);
    } else {
      this.agentsFilter.control.setValue([this.authService.Username as string]);
    }
    this.onFilterChange();
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
    this.showPendingSettlement = false;
    this.showCollectedCustomers = false;
    this.monthsFilter.control.setValue([]);
    this.onFilterChange();
  }

  onPendingSettlementFilterChange() {
    if (this.showPendingSettlement) {
      this.showCollectedCustomers = false;
      this.monthsFilter.control.setValue([]);
    }
    this.onFilterChange();
  }
  
  onShowCollectedCustomersFilterChange() {
    if (this.showCollectedCustomers) {
      this.showPendingSettlement = false;
      this.agentsFilter.control.setValue([]);
    }
    this.onFilterChange();
  }

  @debounce(500)
  override onFilterChange() {
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
      this.data.data.forEach((d) => this.pendingSettlementAmount += d.getPendingSettlement(false, this.agentsFilter.control.value) as number);
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
      return !!data.getPendingSettlement(false, this.agentsFilter.control.value);
    }
    return true;
  }

  getCellClassNames(data: any, columnName: string) {
    const centerAlign = ((columnName === this.customerColumns?.NAME?.label) || 
                         (columnName === this.customerColumns?.AREA?.label)) ? '' : 'align-center';
    const isActiveCustomer = (columnName === this.customerColumns?.NAME?.label) ? (data.isActive() ? 'success-text' : 'danger-text') : '';
    const mobileColumnFlow = (columnName === this.customerColumns?.MOBILE?.label) ? 'de-f-column' : '';
    const showBorder = (data === this.expandedElement) ? 'de-noborder--force' : '';
    return `${isActiveCustomer} ${centerAlign} ${mobileColumnFlow} ${showBorder}`;
  }

  isCableAdmin() {
    return this.authService.hasPermission(IApps.CABLE, IRoleValue.ADMIN);
  }

  canEditMonth(month: keyof CustomerModel): boolean {
    const editCustomerOrig: CustomerModel = this.editCustomerOrig as CustomerModel;
    
    // No collection yet, no collection by and settlement information
    return this.isCableAdmin() || (!editCustomerOrig[month] && !editCustomerOrig.getCollectionBy(month) && !editCustomerOrig.getSettlementDate(month));
  }
  
  checkUpdateCollections() {
    try {
      const editCustomerOrig: CustomerModel = this.editCustomerOrig as CustomerModel;
      const customerCols = this.settingsService.getCustomerCols();
      const payload: any = {
        [customerCols?.ID.label as string]: editCustomerOrig.ID,
      };
      const keysToUpdate: (keyof CustomerModel)[] = [
        customerCols?.STB.label as any,
        customerCols?.STB_STATUS.label as any,
        customerCols?.MOBILE.label as any,
        customerCols?.OWN_NOTES.label as any,
        customerCols?.CONNECTION_ON.label as any,
        customerCols?.LATITUDE.label as any,
        customerCols?.LONGITUDE.label as any,
      ];
      keysToUpdate
        .filter(key => editCustomerOrig[key] != this.editCustomer[key])
        .forEach(key => {
          if (this.editCustomer[key] && (key === customerCols?.CONNECTION_ON.label)) {
            payload[key] = this.editCustomer.formatDate(this.editCustomer[key]);
          } else {
            payload[key] = this.editCustomer[key];
          }
        });

      this.editCustomer.getMonthsInOrder().forEach(month => {
        if (this.canEditMonth(month) && (this.editCustomer[month] || this.editCustomer.getNotes(month))) {
          if (this.editCustomer[month]) {
            payload[month] = this.editCustomer[month];
            payload[this.editCustomer.getCollectionByKey(month)] = this.authService.Username;
            payload[this.editCustomer.getCollectionDateKey(month)] = this.editCustomer.formatDate(Date.now());
          }
          payload[this.editCustomer.getNotesKey(month)] = this.editCustomer.getNotes(month) || '';
        }
      });

      if (Object.keys(payload).length === 0) {
        return this.hideEditDetailsDialog();
      }

      const customerSheetName = this.settingsService.metadata.sheetsInfo?.CUSTOMERS.label as string;
      this.settingsService.processingText = `Updating '${editCustomerOrig?.Name}'...`;
      this.apiGSheetDataService.saveOrUpdateRecord(
        customerSheetName,
        [this.settingsService.getCustomerCols()?.ID.label as string],
        payload
      )
        .subscribe({
          next: () => {
            this.settingsService.processingText = '';
            this.utilService.openSnackBar(`Successfully updated '${editCustomerOrig?.Name}'`, 'Close');
            this.hideEditDetailsDialog();
            this.refreshData(true, false);
          },
          error: (err) => {
            this.settingsService.processingText = '';
            this.utilService.openSnackBar(err, 'Close');
          }
        });
      } catch(e) {
        this.settingsService.processingText = '';
        this.utilService.openSnackBar(e?.toString() || 'Script error in submitting changes.', 'Close');
    }
  }

  showEditDetailsDialog(customer: CustomerModel, event?: MouseEvent) {
    event?.stopPropagation();
    event?.preventDefault();
    this.editCustomerOrig = customer;
    this.editCustomer = this.editCustomerOrig.clone();
  }

  hideEditDetailsDialog() {
    this.editCustomerOrig = null;
  }
}
