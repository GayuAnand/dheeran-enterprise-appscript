import { debounce } from 'typescript-debounce-decorator';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { BaseModel, UGPatrolModel } from 'src/app/models';

@Component({
  selector: 'de-ug-patrol',
  templateUrl: './ug-patrol.component.html',
  styleUrls: ['./../../../reusable-styles/page-component.scss', './ug-patrol.component.scss'],
})
export class UGPatrolComponent extends BaseComponent implements OnInit, AfterViewInit {
  data = new MatTableDataSource<UGPatrolModel>([]);

  fullData: UGPatrolModel[] = [];

  ugPatrolColumns = this.settingsService.metadata.sheetsInfo?.UG_PATROL?.cols;

  allColumns = [
    this.ugPatrolColumns?.DATE?.label || '',
    this.ugPatrolColumns?.LOCATION?.label || '',
    this.ugPatrolColumns?.ROUTE?.label || '',
    this.ugPatrolColumns?.WORK_TYPE?.label || '',
    this.ugPatrolColumns?.PATROL_COUNT?.label || '',
    this.ugPatrolColumns?.REMARKS?.label || '',
  ];

  displayedColumns: string[] = [];

  displayedColumnsWithAction: string[] = [];

  searchText = '';

  workTypeFilter = this.getNewFilterControl([], []);

  routeFilter = this.getNewFilterControl([], []);
  
  recordToEdit: UGPatrolModel | null = null;

  recordToDelete: UGPatrolModel | null = null;

  options: Record<string, string[]> = {
    location: [],
    route: [],
    workType: [],
  };

  processingData = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  chartOptions = {
    theme: "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: { text: this.TKey.COMMON.UG_PATROL },
    data: [{
      type: "line",
      xValueFormatString: "DD MMM'YY",
      yValueFormatString: "#",
      dataPoints: []
    }]
  }

  constructor() {
    super();
    console.log(this);
    this.filterRoute = this.filterRoute.bind(this);
    this.filterWorkType = this.filterWorkType.bind(this);

    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));

    this.settingsService.pageTitle = this.TKey.COMMON.UG_PATROL;
  }

  ngOnInit(): void {
    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));

    this.settingsService.pageTitle = this.TKey.COMMON.UG_PATROL;
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.refreshData();
  }

  refreshDisplayedColumns() {
    if (this.settingsService.isMobile) {
      this.displayedColumns = this.allColumns.slice(0, 5);
    } else {
      this.displayedColumns = this.allColumns.slice(0, 6);
    }
    this.displayedColumnsWithAction = [...this.displayedColumns, 'ACTIONS'];
  }

  refreshData() {
    this.apiGSheetDataService.getSheetData<UGPatrolModel>(this.settingsService.metadata.sheetsInfo?.UG_PATROL.label as string, UGPatrolModel, true)
      .subscribe({
        next: (data) => {
          this.fullData = data;
          // const dates = this.fullData.map((d) => ({ x: this.utilService.moment(d.Date).valueOf(), y: 1 }));
          // this.chartOptions.data[0].dataPoints = dates.sort(this.utilService.sortObjectsByProperty('x'));
          this.options.location = Object.keys(this.fullData.reduce((acc, data) => { acc[data.Location] = true; return acc; }, {} as Record<string, boolean>));
          this.options.route = Object.keys(this.fullData.reduce((acc, data) => { acc[data.Route] = true; return acc; }, {} as Record<string, boolean>));
          this.options.workType = Object.keys(this.fullData.reduce((acc, data) => { acc[data.WorkType] = true; return acc; }, {} as Record<string, boolean>));
          this.initializeFilters();
          this.recordToEdit = null;
          this.recordToDelete = null;
          this.processingData = false;
        },
        error: (err) => this.utilService.openSnackBar(`ERROR IN FETCHING DATA: ${err}`, 'Close')
      });
  }

  createRecord() {
    this.recordToEdit = new UGPatrolModel({ Date: new Date(), PatrolCount: 1 });
  }
  
  editRecord(record: UGPatrolModel) {
    this.recordToEdit = record.clone();
  }

  updateRecord() {
    if (!this.recordToEdit) return;

    this.processingData = true;
    const recordToEdit = this.recordToEdit.clone();
    recordToEdit.ID = recordToEdit.ID || Date.now().toString();
    recordToEdit.Date = BaseModel.formatDate(recordToEdit.Date) as string;
    this.apiGSheetDataService.saveOrUpdateRecord<UGPatrolModel>(this.settingsService.metadata.sheetsInfo?.UG_PATROL?.label as string,
      [this.ugPatrolColumns?.ID?.label as string],
      recordToEdit as UGPatrolModel
    ).subscribe({
      next: () => this.refreshData(),
      error: (err) => {
        this.processingData = false;
        this.utilService.openSnackBar(err, 'Close');
      }
    });
  }

  deleteRecord() {
    this.processingData = true;
    this.apiGSheetDataService.deleteRecord<UGPatrolModel>(this.settingsService.metadata.sheetsInfo?.UG_PATROL?.label as string,
      [this.ugPatrolColumns?.ID?.label as string],
      this.recordToDelete as UGPatrolModel
    ).subscribe({
      next: () => this.refreshData(),
      error: (err) => {
        this.processingData = false;
        this.utilService.openSnackBar(err, 'Close');
      }
    });
  }

  initializeFilters() {
    const route: any = {};
    const workType: any = {};
    this.fullData.forEach(d => {
      route[d.Route] = true;
      workType[d.WorkType] = true;
    });
    this.routeFilter.controlOptions = Object.keys(route);
    this.routeFilter.controlOptions.sort();
    this.routeFilter.control.setValue([]);
    this.routeFilter.selectAll = false;

    this.workTypeFilter.controlOptions = Object.keys(workType);
    this.workTypeFilter.controlOptions.sort();
    this.workTypeFilter.control.setValue([]);
    this.workTypeFilter.selectAll = false;
    this.onFilterChange();
  }

  @debounce(500)
  override onFilterChange() {
    const byPassFilter = (data: UGPatrolModel) => true;
    let filterRoute = this.filterRoute;
    let filterWorkType = this.filterWorkType;
    let filterSearch = this.filterSearch;

    this.routeFilter._selectedObj = {};
    (this.routeFilter.control.value || []).forEach(route => this.routeFilter._selectedObj[route] = true);

    this.workTypeFilter._selectedObj = {};
    (this.workTypeFilter.control.value || []).forEach(workType => this.workTypeFilter._selectedObj[workType] = true);

    // None or all selected
    if (!this.routeFilter.control.value?.length ||
        (this.routeFilter.control?.value || []).length === this.routeFilter.controlOptions?.length) {
      filterRoute = byPassFilter;
    }

    // None or all selected
    if (!this.workTypeFilter.control.value?.length ||
        (this.workTypeFilter.control?.value || []).length === this.workTypeFilter.controlOptions?.length) {
          filterWorkType = byPassFilter;
    }

    if (!this.searchText) {
      filterSearch = byPassFilter;
    }

    this.data.data = this.fullData.filter(filterRoute).filter(filterWorkType).filter(filterSearch);
  }

  filterSearch(data: UGPatrolModel) {
    return data.freeTextSearch(this.searchText);
  }

  filterRoute(data: UGPatrolModel) {
    return this.routeFilter._selectedObj[data.Route];
  }

  filterWorkType(data: UGPatrolModel) {
    return this.routeFilter._selectedObj[data.WorkType];
  }

  getCellClassNames(data: any, columnName: string) {
    const centerAlign = ((columnName === this.ugPatrolColumns?.DATE?.label) ||
                         (columnName === this.ugPatrolColumns?.PATROL_COUNT?.label) ||
                         (columnName === 'ACTIONS')) ? 'align-center' : '';
    return `${centerAlign}`;
  }
}
