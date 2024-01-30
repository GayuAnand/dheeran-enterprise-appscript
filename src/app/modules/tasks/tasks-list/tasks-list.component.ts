import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { TaskModel } from 'src/app/models';
import { BaseComponent } from 'src/app/common';
import { concatMap, map } from 'rxjs';
import { debounce } from 'typescript-debounce-decorator';

@Component({
  selector: 'de-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './tasks-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TasksListComponent extends BaseComponent {
  data = new MatTableDataSource<TaskModel>([]);

  fullData: TaskModel[] = [];

  expandedElement!: TaskModel | null;

  taskColumns = this.settingsService.metadata.sheetsInfo?.TASKS?.cols;

  allColumns = [
    this.taskColumns?.ID?.label || '',
    this.taskColumns?.PRIORITY?.label || '',
    this.taskColumns?.OPENDATE?.label || '',
    this.taskColumns?.ASSIGNEDTO?.label || '',
  ];

  displayedColumns: string[] = [];

  searchText = '';

  searchTextRegexp = new RegExp('');

  cacheInfo: any = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.filterSearch = this.filterSearch.bind(this);

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

  refreshDisplayedColumns() {
    if (this.authService.isTasksAdmin()) {
      this.displayedColumns = this.allColumns.slice(0, 4);
    } else {
      this.displayedColumns = this.allColumns.slice(0, 3);
    }
    this.displayedColumns.push('ACTIONS');
  }

  refreshData(force = false, resetFilters = false) {
    this.settingsService.processingText = `Refreshing data...`;
    this.apiGSheetDataService.getSheetData<TaskModel>(this.settingsService.metadata.sheetsInfo?.TASKS.label as string, TaskModel, force)
      .pipe(
        concatMap((res) => this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.TASKS.label}` as string, this.cacheInfo)
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

  initializeFilters(resetFilters = false) {}

  @debounce(500)
  override onFilterChange(): void {
    const byPassFilter = (data: TaskModel) => true;
    let filterSearch = this.filterSearch;

    if (!this.searchText) {
      filterSearch = byPassFilter;
    } else {
      this.searchTextRegexp = this.utilService.getFlexibleSearchTextRegexp(this.searchText);
    }

    this.data.data = this.fullData.filter(filterSearch);
  }

  filterSearch(data: TaskModel) {
    return data.freeTextSearch(this.searchTextRegexp);
  }

  getCellClassNames(data: any, columnName: string) {
    return ``;
  }

  toggleExpandedRow(row: TaskModel) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }
}
