import { concatMap, map } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { debounce } from 'typescript-debounce-decorator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { UGWorkModel } from 'src/app/models';
import { IApps, IRoleValue } from 'src/app/common/interfaces';

@Component({
  selector: 'de-ug-work-list',
  templateUrl: './ug-work-list.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './ug-work-list.component.scss'],
})
export class UGWorkListComponent extends BaseComponent implements OnInit, AfterViewInit {
  data = new MatTableDataSource<UGWorkModel>([]);

  fullData: UGWorkModel[] = [];

  ugWorkColumns = this.settingsService.metadata.sheetsInfo?.UG_WORK?.cols;

  allColumns = [
    this.ugWorkColumns?.BREAK_TIME?.label || '',
    this.ugWorkColumns?.RESTORE_TIME?.label || '',
    this.ugWorkColumns?.ROUTE_NAME?.label || '',
    this.ugWorkColumns?.TYPE?.label || '',
    this.ugWorkColumns?.REMARKS?.label || '',
  ];

  displayedColumns: string[] = [];

  displayedColumnsWithAction: string[] = [];

  searchText = '';

  searchTextRegexp = new RegExp('');

  routeFilter = this.getNewFilterControl([], []);

  typeFilter = this.getNewFilterControl([], []);
  
  recordToEdit: UGWorkModel | null = null;

  recordToDelete: UGWorkModel | null = null;

  options: Record<string, string[]> = {
    exchange: [],
    routeName: [],
    cableCapacity: [],
    type: [],
    workLocation: [],
  };

  cacheInfo: any = null;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    super();
    this.filterType = this.filterType.bind(this);
    this.filterRouteName = this.filterRouteName.bind(this);
    this.filterSearch = this.filterSearch.bind(this);

    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));

    this.settingsService.pageTitle = this.TKey.UG.WORK_LIST;
  }

  ngOnInit(): void {
    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
    this.refreshData();
  }

  refreshDisplayedColumns() {
    if (this.settingsService.isMobile) {
      this.displayedColumns = [this.allColumns[0], this.allColumns[2], this.allColumns[3]];
    } else {
      this.displayedColumns = this.allColumns.slice();
    }
    this.displayedColumnsWithAction = [...this.displayedColumns, 'ACTIONS'];
  }

  refreshData(force = false) {
    this.settingsService.processingText = `Refreshing data...`;
    this.apiGSheetDataService.getSheetData<UGWorkModel>(this.settingsService.metadata.sheetsInfo?.UG_WORK.label as string, UGWorkModel, force)
      .pipe(
        concatMap((res) => this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.UG_WORK.label}` as string, this.cacheInfo)
          .pipe(
            map((value) => {
              this.cacheInfo = value;
              return res;
            }))
          )
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fullData = data;
          this.options.type = Object.values(this.settingsService.metadata.sheetsInfo?.UG_WORK.cols.TYPE.data || {});
          this.options.cableCapacity = Object.values(this.settingsService.metadata.sheetsInfo?.UG_WORK.cols.USED_CABLE_CAPACITY.data || {});
          this.options.exchange = Object.keys(this.fullData.reduce((acc, data) => { acc[data.Exchange] = true; return acc; }, {} as Record<string, boolean>));
          this.options.routeName = Object.keys(this.fullData.reduce((acc, data) => { acc[data.RouteName] = true; return acc; }, {} as Record<string, boolean>));
          this.options.workLocation = Object.keys(this.fullData.reduce((acc, data) => { acc[data.WorkLocation] = true; return acc; }, {} as Record<string, boolean>));
          this.options.exchange.sort();
          this.options.routeName.sort();
          this.options.workLocation.sort();
          this.initializeFilters();
        },
        error: (err) => this.utilService.openErrorSnackBar(`ERROR IN FETCHING DATA: ${err}`, 'Close'),
        complete: () => {
          this.recordToEdit = null;
          this.recordToDelete = null;
          this.settingsService.processingText = '';
        }
      });
  }

  createRecord() {
    this.recordToEdit = new UGWorkModel({ Date: new Date(), PatrolCount: 1 });
  }
  
  editRecord(record: UGWorkModel) {
    this.recordToEdit = record.clone();
  }

  updateRecord() {
    if (!this.recordToEdit) return;

    this.settingsService.processingText = `Updating data...`;
    const recordToEdit = this.recordToEdit.clone();
    const newRecord = !recordToEdit.ID;
    recordToEdit.ID = recordToEdit.ID || Date.now().toString();
    recordToEdit.BreakTime = recordToEdit.getBreakTimeStr();
    recordToEdit.RestoreTime = recordToEdit.getRestoreTimeStr();

    if (newRecord) recordToEdit.By = this.authService.Username;
    this.apiGSheetDataService.saveOrUpdateRecord<UGWorkModel>(this.settingsService.metadata.sheetsInfo?.UG_WORK?.label as string,
      [this.ugWorkColumns?.ID?.label as string],
      recordToEdit as UGWorkModel
    ).subscribe({
      next: () => {
        this.settingsService.processingText = '';
        this.refreshData(true);
      },
      error: (err) => {
        this.settingsService.processingText = ''
        this.utilService.openErrorSnackBar(err, 'Close');
      }
    });
  }

  deleteRecord() {
    this.settingsService.processingText = `Deleting record...`;
    this.apiGSheetDataService.deleteRecord<UGWorkModel>(this.settingsService.metadata.sheetsInfo?.UG_WORK?.label as string,
      [this.ugWorkColumns?.ID?.label as string],
      this.recordToDelete as UGWorkModel
    ).subscribe({
      next: () => {
        this.settingsService.processingText = '';
        this.refreshData(true);
      },
      error: (err) => {
        this.settingsService.processingText = '';
        this.utilService.openErrorSnackBar(err, 'Close');
      }
    });
  }

  initializeFilters() {
    const routeName: any = {};
    this.fullData.forEach(d => {
      routeName[d.RouteName] = true;
    });
    this.routeFilter.controlOptions = Object.keys(routeName);
    this.routeFilter.controlOptions.sort();
    this.routeFilter.control.setValue([]);
    this.routeFilter.selectAll = false;

    this.typeFilter.controlOptions = Object.values(this.settingsService.metadata.sheetsInfo?.UG_WORK.cols.TYPE.data || {});
    this.typeFilter.controlOptions.sort();
    this.typeFilter.control.setValue([]);
    this.typeFilter.selectAll = false;

    this.onFilterChange();
  }

  @debounce(500)
  override onFilterChange() {
    const byPassFilter = (data: UGWorkModel) => true;
    let filterType = this.filterType;
    let filterRouteName = this.filterRouteName;
    let filterSearch = this.filterSearch;

    this.routeFilter._selectedObj = {};
    (this.routeFilter.control.value || []).forEach(route => this.routeFilter._selectedObj[route] = true);

    this.typeFilter._selectedObj = {};
    (this.typeFilter.control.value || []).forEach(route => this.typeFilter._selectedObj[route] = true);

    // None or all selected
    if (!this.routeFilter.control.value?.length ||
        (this.routeFilter.control?.value || []).length === this.routeFilter.controlOptions?.length) {
      filterRouteName = byPassFilter;
    }

    // None or all selected
    if (!this.typeFilter.control.value?.length ||
        (this.typeFilter.control?.value || []).length === this.typeFilter.controlOptions?.length) {
      filterType = byPassFilter;
    }

    if (!this.searchText) {
      filterSearch = byPassFilter;
    } else {
      this.searchTextRegexp = this.utilService.getFlexibleSearchTextRegexp(this.searchText);
    }

    this.data.data = this.fullData.filter(filterRouteName).filter(filterType).filter(filterSearch);
  }

  filterSearch(data: UGWorkModel) {
    return data.freeTextSearch(this.searchTextRegexp);
  }

  filterRouteName(data: UGWorkModel) {
    return this.routeFilter._selectedObj[data.RouteName];
  }

  filterType(data: UGWorkModel) {
    return this.typeFilter._selectedObj[data.Type];
  }

  getCellClassNames(data: any, columnName: string) {
    const centerAlign = ((columnName === this.ugWorkColumns?.TYPE.label) ||
                         (columnName === 'ACTIONS')) ? 'align-center' : '';
    return `${centerAlign}`;
  }

  isRecordByLoggedInUser(record: UGWorkModel) {
    return record.By === this.authService.Username;
  }
}
