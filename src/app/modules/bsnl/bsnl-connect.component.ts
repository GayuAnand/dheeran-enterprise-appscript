import { Observable, concatMap, map } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { debounce } from 'typescript-debounce-decorator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiBSNLConnectService } from 'src/app/api/bsnl-connect.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { FMSCustomerModel } from 'src/app/models';

@Component({
  selector: 'de-bsnl-connect',
  templateUrl: './bsnl-connect.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './bsnl-connect.component.scss'],
})
export class BSNLConnectComponent extends BaseComponent implements OnInit, AfterViewInit {
  data = new MatTableDataSource<FMSCustomerModel>([]);

  fullData: FMSCustomerModel[] = [];

  expandedElement!: FMSCustomerModel | null;

  searchText = '';

  searchPhoneNumber = '';

  franchiseFilter = this.getNewFilterControl([], []);

  bbplanFilter = this.getNewFilterControl([], []);

  statusFilter = this.getNewFilterControl([], []);

  exchangeFilter = this.getNewFilterControl([], []);

  searchTextRegexp = new RegExp('');

  searchPhoneNumberRegexp = new RegExp('');

  fmsColumns = this.settingsService.metadata.sheetsInfo?.FMS_EXPORT?.cols;

  allColumns = [
    this.fmsColumns?.CUSTOMER_NAME?.label || '',
    this.fmsColumns?.PHONE_NO?.label || '',
    this.fmsColumns?.MOBILE_NO?.label || '',
    this.fmsColumns?.MTCE_FRANCHISE_CODE?.label || '',
    this.fmsColumns?.BB_PLAN?.label || '',
  ];

  displayedColumns: string[] = [];

  informationFor = '';

  informationType: 'Bill View' | 'VLAN Info' | '' = '';

  information: any = null;

  cacheInfo: any = null;

  showAdvancedFilters = false;

  rawAccountsText: string[] = [];

  processedAccountsObj: any[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bsnlConnectService: ApiBSNLConnectService) {
    super();
  }

  ngOnInit(): void {
    this.filterSearch = this.filterSearch.bind(this);
    this.filterSearchPhoneNumber = this.filterSearchPhoneNumber.bind(this);
    this.filterFranchise = this.filterFranchise.bind(this);
    this.filterBbplan = this.filterBbplan.bind(this);
    this.filterStatus = this.filterStatus.bind(this);
    this.filterExchange = this.filterExchange.bind(this);
    this.settingsService.pageTitle = this.TKey.COMMON.BSNL;

    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));
  }
  
  ngAfterViewInit(): void {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
    this.refreshData();
    this.refreshDisplayedColumns();
  }

  refreshData(force = false, resetFilters = false) {
    this.settingsService.processingText = `Refreshing data...`;
    this.apiGSheetDataService.getSheetData<FMSCustomerModel>(this.settingsService.metadata.sheetsInfo?.FMS_EXPORT.label as string, FMSCustomerModel, force)
      .pipe(
        concatMap((res) => this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.FMS_EXPORT.label}` as string, this.cacheInfo)
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

  refreshDisplayedColumns() {
    if (this.settingsService.isMobile) {
      this.displayedColumns = this.allColumns.slice(0, 2);
    } else {
      this.displayedColumns = this.allColumns.slice(0, 4);
    }
  }

  initializeFilters(resetFilters = false) {
    const franchise: any = {};
    const appliedFranchiseFilters = this.franchiseFilter.control.value;
    this.fullData.forEach(d => franchise[d.MTCE_FRANCHISE_CODE] = true);
    this.franchiseFilter.controlOptions = Object.keys(franchise);
    this.franchiseFilter.controlOptions.sort();
    this.franchiseFilter.selectAll = false;
    if (!appliedFranchiseFilters?.length || resetFilters) {
      this.franchiseFilter.control.setValue([]);
    } else {
      this.franchiseFilter.control.setValue(appliedFranchiseFilters);
    }

    const bbplan: any = {};
    const appliedBbplanFilters = this.bbplanFilter.control.value;
    this.fullData.forEach(d => bbplan[d.BB_PLAN] = true);
    this.bbplanFilter.controlOptions = Object.keys(bbplan);
    this.bbplanFilter.controlOptions.sort();
    this.bbplanFilter.selectAll = false;
    if (!appliedBbplanFilters?.length || resetFilters) {
      this.bbplanFilter.control.setValue([]);
    } else {
      this.bbplanFilter.control.setValue(appliedBbplanFilters);
    }

    const status: any = {};
    const appliedStatusFilters = this.statusFilter.control.value;
    this.fullData.forEach(d => status[d.WKG_STATUS] = true);
    this.statusFilter.controlOptions = Object.keys(status);
    this.statusFilter.controlOptions.sort();
    this.statusFilter.selectAll = false;
    if (!appliedStatusFilters?.length || resetFilters) {
      this.statusFilter.control.setValue([]);
    } else {
      this.statusFilter.control.setValue(appliedStatusFilters);
    }

    const exchange: any = {};
    const appliedExchangeFilters = this.exchangeFilter.control.value;
    this.fullData.forEach(d => exchange[d.FTTH_EXCHANGE] = true);
    this.exchangeFilter.controlOptions = Object.keys(exchange);
    this.exchangeFilter.controlOptions.sort();
    this.exchangeFilter.selectAll = false;
    if (!appliedExchangeFilters?.length || resetFilters) {
      this.exchangeFilter.control.setValue([]);
    } else {
      this.exchangeFilter.control.setValue(appliedExchangeFilters);
    }
    this.onFilterChange();
  }

  @debounce(500)
  override onFilterChange(): void {
    const byPassFilter = (data: FMSCustomerModel) => true;
    let filterSearch = this.filterSearch;
    let filterSearchPhoneNumber = this.filterSearchPhoneNumber;
    let filterFranchise = this.filterFranchise;
    let filterBbplan = this.filterBbplan;
    let filterStatus = this.filterStatus;
    let filterExchange = this.filterExchange;

    this.franchiseFilter._selectedObj = {};
    (this.franchiseFilter.control.value || []).forEach(franchise => this.franchiseFilter._selectedObj[franchise] = true);

    this.bbplanFilter._selectedObj = {};
    (this.bbplanFilter.control.value || []).forEach(bbplan => this.bbplanFilter._selectedObj[bbplan] = true);

    this.statusFilter._selectedObj = {};
    (this.statusFilter.control.value || []).forEach(status => this.statusFilter._selectedObj[status] = true);

    this.exchangeFilter._selectedObj = {};
    (this.exchangeFilter.control.value || []).forEach(exchange => this.exchangeFilter._selectedObj[exchange] = true);

    // None or all selected
    if (!this.franchiseFilter.control.value?.length ||
        (this.franchiseFilter.control?.value || []).length === this.franchiseFilter.controlOptions?.length) {
      filterFranchise = byPassFilter;
    }

    // None or all selected
    if (!this.bbplanFilter.control.value?.length ||
        (this.bbplanFilter.control?.value || []).length === this.bbplanFilter.controlOptions?.length) {
      filterBbplan = byPassFilter;
    }

    // None or all selected
    if (!this.statusFilter.control.value?.length ||
        (this.statusFilter.control?.value || []).length === this.statusFilter.controlOptions?.length) {
      filterStatus = byPassFilter;
    }

    // None or all selected
    if (!this.exchangeFilter.control.value?.length ||
        (this.exchangeFilter.control?.value || []).length === this.exchangeFilter.controlOptions?.length) {
      filterExchange = byPassFilter;
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

    this.data.data = this.fullData.filter(filterFranchise).filter(filterBbplan).filter(filterStatus).filter(filterExchange).filter(filterSearch).filter(filterSearchPhoneNumber);
  }

  filterSearch(data: FMSCustomerModel) {
    return data.freeTextSearch(this.searchTextRegexp);
  }

  filterSearchPhoneNumber(data: FMSCustomerModel) {
    return data.freeTextSearch(this.searchPhoneNumberRegexp);
  }

  filterFranchise(data: FMSCustomerModel) {
    return this.franchiseFilter._selectedObj[data.MTCE_FRANCHISE_CODE];
  }

  filterBbplan(data: FMSCustomerModel) {
    return this.bbplanFilter._selectedObj[data.BB_PLAN];
  }

  filterStatus(data: FMSCustomerModel) {
    return this.statusFilter._selectedObj[data.WKG_STATUS];
  }

  filterExchange(data: FMSCustomerModel) {
    return this.exchangeFilter._selectedObj[data.FTTH_EXCHANGE];
  }

  getCellClassNames(data: any, columnName: string) {
    return ``;
  }

  getBillView() {
    if (this.expandedElement?.PHONE_NO) {
      this.information = null;
      this.processResponse(this.bsnlConnectService.getBillView(this.expandedElement.getPhoneNumber()), 'Bill View', this.expandedElement.getPhoneNumber());
    }
  }
  
  getVLANInfo() {
    if (this.expandedElement?.PHONE_NO) {
      this.information = null;
      this.processResponse(this.bsnlConnectService.getVLANInfo(this.expandedElement.getPhoneNumber()), 'VLAN Info', this.expandedElement.getPhoneNumber());
    }
  }

  private processResponse(call: Observable<any>, infoType: any, infoFor: string) {
    this.informationType = infoType;
    call.subscribe({
      next: (res: any) => {
        this.informationType = infoType;
        this.informationFor = infoFor;
        this.information = res;
      },
      error: (err: any) => {
        this.informationType = '';
        this.informationFor = '';
        this.information = null;
        this.utilService.openErrorSnackBar(`${infoFor}: ${err}`, 'Close');
      }
    });
  }

  toggleExpandedRow(row: FMSCustomerModel) {
    this.expandedElement = this.expandedElement === row ? null : row;
    this.informationType = '';
    this.informationFor = '';
    this.information = null;
  }

  downloadAccounts() {
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=pradeep_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=yogapradeep_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=krbdheeran_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
    window.open('https://fms.bsnl.in/downloadAccountsList?userName=krbsuresh_tnslm&serviceType=Bharat%20Fiber%20BB', '_blank');
  }

  processAccounts(event: any) {
    this.rawAccountsText = [];
    this.processedAccountsObj = [];
    const files = event.target.files as FileList;
    Array.from(files).forEach(f => {
      console.log(f);
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.rawAccountsText.push(e.target.result as string);
        if (files.length === this.rawAccountsText.length) {
          this.rawAccountsText.forEach(rat => {
            const dom = (new DOMParser()).parseFromString(rat, 'text/html');
            const arrayValues: string[][] = Array.from(dom.querySelectorAll('table')[0].querySelectorAll('tr')).map(tr => Array.from(tr.querySelectorAll('th,td')).map((td) => (td as HTMLElement).innerText));
            const headers: string[] = arrayValues.shift() as string[];
            arrayValues.forEach(row => {
              const accountObj: any = {};
              row.forEach((d, i) => accountObj[headers[i]] = d);
              this.processedAccountsObj.push(accountObj);
            });
          });
          this.utilService.exportObjectsToCSV(this.processedAccountsObj, 'Master BSNL Accounts');
        }
      };
      reader.readAsText(f);
    });
  }
}
