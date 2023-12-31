import { concatMap, map } from 'rxjs';
import { debounce } from 'typescript-debounce-decorator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';
import { CableService } from '../cable.service';

@Component({
  selector: 'de-cable-list',
  templateUrl: './cable-list.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './cable-list.component.scss'],
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
    this.customerColumns?.ID?.label || '',
    this.customerColumns?.MOBILE?.label || '',
    this.customerColumns?.STB?.label || '',
  ];

  displayedColumns: string[] = [];

  searchText = '';

  searchTextRegexp = new RegExp('');

  searchPhoneNumber = '';

  searchPhoneNumberRegexp = new RegExp('');

  statusFilter = this.getNewFilterControl(['Active'], ['Active', 'Inactive']);

  gpayFilter = this.getNewFilterControl([], ['1', '0']);

  areaFilter = this.getNewFilterControl([], []);

  agentsFilter = this.getNewFilterControl([], []);

  monthsFilter = this.getNewFilterControl([], []);

  showAdvancedFilters = false;

  showCollectedCustomers = false;

  showPendingSettlement = false;

  pendingSettlementAmount = 0;

  showSettlementConfirmationDialog = false;

  cacheInfo: any = null;

  editCustomerOrig!: CustomerModel | null;

  editCustomer!: CustomerModel;

  processingLatLng = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cableService: CableService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterArea = this.filterArea.bind(this);
    this.filterGpay = this.filterGpay.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
    this.filterSearchPhoneNumber = this.filterSearchPhoneNumber.bind(this);
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
      this.displayedColumns = this.allColumns.slice(0, 3);
    } else {
      this.displayedColumns = this.allColumns.slice(0, 5);
      this.displayedColumns.push('ACTIONS');
    }
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
    let filterGpay = this.filterGpay;
    let filterStatus = this.filterStatus;
    let filterSearch = this.filterSearch;
    let filterSearchPhoneNumber = this.filterSearchPhoneNumber;
    let filterCollection = this.filterCollection;
    let filterPendingSettlement = this.filterPendingSettlement;

    this.areaFilter._selectedObj = {};
    (this.areaFilter.control.value || []).forEach(area => this.areaFilter._selectedObj[area] = true);

    this.gpayFilter._selectedObj = {};
    (this.gpayFilter.control.value || []).forEach(area => this.gpayFilter._selectedObj[area] = true);

    this.statusFilter._selectedObj = {};
    (this.statusFilter.control.value || []).forEach(status => this.statusFilter._selectedObj[status] = true);

    // None or all selected
    if (!this.gpayFilter.control.value?.length ||
        (this.gpayFilter.control?.value || []).length === this.gpayFilter.controlOptions?.length) {
      filterGpay = byPassFilter;
    }

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
    } else {
      this.searchTextRegexp = this.utilService.getFlexibleSearchTextRegexp(this.searchText);
    }

    if (!this.searchPhoneNumber) {
      filterSearchPhoneNumber = byPassFilter;
    } else {
      this.searchPhoneNumberRegexp = this.utilService.getFlexibleSearchTextRegexp(this.searchPhoneNumber);
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

    this.data.data = this.fullData.filter(filterGpay).filter(filterArea).filter(filterStatus).filter(filterSearch).filter(filterSearchPhoneNumber).filter(filterCollection).filter(filterPendingSettlement);

    if (this.showPendingSettlement) {
      this.data.data.forEach((d) => this.pendingSettlementAmount += d.getPendingSettlement(false, this.agentsFilter.control.value) as number);
    }
  }

  filterSearch(data: CustomerModel) {
    return data.freeTextSearch(this.searchTextRegexp);
  }

  filterSearchPhoneNumber(data: CustomerModel) {
    return data.freeTextSearch(this.searchPhoneNumberRegexp);
  }

  filterArea(data: CustomerModel) {
    return this.areaFilter._selectedObj[data.Area];
  }

  filterStatus(data: CustomerModel) {
    return (this.statusFilter._selectedObj['Active'] && data.isActive()) || (this.statusFilter._selectedObj['Inactive'] && !data.isActive());
  }

  filterGpay(data: CustomerModel) {
    return (this.gpayFilter._selectedObj['1'] && data.hasGpay()) || (this.gpayFilter._selectedObj['0'] && !data.hasGpay());
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

  canEditMonth(month: keyof CustomerModel): boolean {
    const editCustomerOrig: CustomerModel = this.editCustomerOrig as CustomerModel;
    
    // No collection yet, no collection by and settlement information
    return (!editCustomerOrig[month] && !editCustomerOrig.getCollectionBy(month) && !editCustomerOrig.getSettlementDate(month));
  }
  
  checkUpdateCollections(offlineUpdate = false) {
    try {
      const editCustomerOrig: CustomerModel = this.editCustomerOrig as CustomerModel;
      const customerCols = this.settingsService.getCustomerCols();
      const payload: any = {
        [customerCols?.ID.label as string]: editCustomerOrig.ID,
        [customerCols?.NAME.label as string]: editCustomerOrig.Name,
      };
      const keysToUpdate: (keyof CustomerModel)[] = [
        customerCols?.NAME.label as any,
        customerCols?.AREA.label as any,
        customerCols?.STATUS.label as any,
        customerCols?.STB.label as any,
        customerCols?.STB_STATUS.label as any,
        customerCols?.MOBILE.label as any,
        customerCols?.GPAY.label as any,
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
        } else if (this.authService.isCableAdmin() &&
          (this.editCustomer[month] != editCustomerOrig[month]) || (this.editCustomer.getNotes(month) != editCustomerOrig.getNotes(month))) {
          payload[month] = this.editCustomer[month];
          payload[this.editCustomer.getNotesKey(month)] = this.editCustomer.getNotes(month) || '';
          if (!this.editCustomer[month]) {
            payload[this.editCustomer.getCollectionByKey(month)] = '';
            payload[this.editCustomer.getCollectionDateKey(month)] = '';
            payload[this.editCustomer.getSettlementToKey(month)] = '';
            payload[this.editCustomer.getSettlementDateKey(month)] = '';
          }
        }
      });

      if (Object.keys(payload).length === 0) {
        return this.hideEditDetailsDialog();
      }

      if (offlineUpdate) {
        this.cableService.saveOfflineUpdate(payload);
        this.hideEditDetailsDialog();
      } else {
        this.settingsService.processingText = `Updating '${editCustomerOrig?.Name}'...`;
        
        this.cableService.saveCollectionUpdates(payload, (err: any) => {
          this.settingsService.processingText = '';
          if (err) {
            this.utilService.openErrorSnackBar(err, 'Close');
          } else {
            this.utilService.openSnackBar(`Successfully updated '${editCustomerOrig?.Name}'`, 'Close');
            this.hideEditDetailsDialog();
            this.refreshData(true, false);
          }
        });
      }
    } catch(e) {
      this.settingsService.processingText = '';
      this.utilService.openErrorSnackBar(e?.toString() || 'Script error in submitting changes.', 'Close');
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

  settlePendingCollections() {
    console.log(this.agentsFilter.control.value);
    this.fullData.forEach((data) => {
      // TODO
      // data.getPayload
    });
  }

  exportFilteredDataToCSV() {
    this.utilService.exportObjectsToCSV(
      this.data.data,
      'Cable Customers',
      ['ID', 'Name', 'Mobile', 'Area', 'Status', 'GPay', 'Bulk Payment', 'STB', 'STB Status', 'STB Type', 'Own Notes']
    );
  }

  // TODO: Cleanup
  exportQrCSV() {
    const csvData = this.fullData
      .map(d => {
        return [
          this.utilService.escapeCSVCell(d.ID),
          this.utilService.escapeCSVCell(d.Name),
          this.utilService.escapeCSVCell(d.Area),
          this.utilService.escapeCSVCell(d.Mobile),
          this.utilService.escapeCSVCell(this.utilService.rawPaymentNote(d)),
          this.utilService.escapeCSVCell(this.utilService.processedPaymentNote(d)),
          this.utilService.escapeCSVCell(this.utilService.upiUrl(d)),
          this.utilService.escapeCSVCell(encodeURIComponent(this.utilService.upiUrl(d))),
          this.utilService.escapeCSVCell(this.utilService.qrCodeUrl(d)),
        ];
      });
    csvData.unshift(['ID', 'Name', 'Area', 'Mobile', 'Raw Payment Note', 'Processed Payment Note', 'UPI Url', 'Encoded UPI Url', 'QR Code URL']);
    this.utilService.exportToCSV(csvData, 'customers');
  }
}
