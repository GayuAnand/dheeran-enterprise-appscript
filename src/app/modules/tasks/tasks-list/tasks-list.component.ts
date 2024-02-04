import { concatMap, map } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { Component, ViewChild } from '@angular/core';
import { debounce } from 'typescript-debounce-decorator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { TaskModel } from 'src/app/models';
import { BaseComponent } from 'src/app/common';

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
  durationColName = 'Duration';

  data = new MatTableDataSource<TaskModel>([]);

  fullData: TaskModel[] = [];

  activeTaskStatus: 'Open' | 'Done' | 'Verified' = 'Open';

  expandedElement!: TaskModel | null;

  taskColumns = this.settingsService.metadata.sheetsInfo?.TASKS?.cols;

  detailViewInfo = [
    this.taskColumns?.TYPE?.label || '',
    this.taskColumns?.PRIORITY?.label || '',
    this.taskColumns?.TITLE?.label || '',
    this.taskColumns?.ASSIGNEDTO?.label || '',
    this.taskColumns?.DETAILS?.label || '',
    this.taskColumns?.NOTES?.label || '',
    this.taskColumns?.OPENDATE?.label || '',
    this.taskColumns?.DONEDATE?.label || '',
  ];

  allColumns = [
    this.taskColumns?.PRIORITY?.label || '',
    this.taskColumns?.TYPE?.label || '',
    this.taskColumns?.TITLE?.label || '',
    this.durationColName,
    this.taskColumns?.ASSIGNEDTO?.label || '',
  ];

  displayedColumns: string[] = [];

  recordToEditOrig!: TaskModel | null;

  recordToEdit!: TaskModel | null;

  recordToDelete!: TaskModel | null;

  searchText = '';

  searchTextRegexp = new RegExp('');

  cacheInfo: any = null;

  tasksStatus = this.settingsService.metadata.taskStatus;

  loginUsers = this.settingsService.metadata.loginUsers?.filter(u => !u.match(/(test|service)/i));

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.filterSearch = this.filterSearch.bind(this);
    this.filterTaskStatus = this.filterTaskStatus.bind(this);

    this._subscriptions.push(this.eventService.isMobile.subscribe(() => this.refreshDisplayedColumns()));

    this.settingsService.pageTitle = this.TKey.COMMON.CABLE;

    if (!this.authService.isTasksAdmin()) {
      this.tasksStatus = this.settingsService.metadata.taskStatus?.slice(0, this.settingsService.metadata.taskStatus.length - 1);
    }
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.paginator;
    this.refreshDisplayedColumns();
    this.refreshData(false, true);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cacheInfo?.destroy();
  }

  refreshDisplayedColumns() {
    if (this.authService.isTasksAdmin() && !this.settingsService.isMobile) {
      this.displayedColumns = this.allColumns.slice(0, 5);
    } else {
      this.displayedColumns = this.allColumns.slice(0, 4);
    }
    this.displayedColumns.push('ACTIONS');
  }

  hideEditDetailsDialog() {
    this.recordToEdit = null;
    this.recordToEditOrig = null;
  }

  saveOrUpdateTask() {
    if (!this.recordToEdit) return;

    this.settingsService.processingText = `Updating data...`;
    const recordToEdit = this.recordToEdit.clone();
    recordToEdit.ID = recordToEdit.ID || Date.now().toString();
    recordToEdit.OpenDate = recordToEdit.getOpenCloseDate(recordToEdit.OpenDate || Date.now());
    recordToEdit.AssignedTo = recordToEdit.AssignedTo;

    if ((this.recordToEditOrig?.Status !== recordToEdit.Status) && recordToEdit.Status === 'Done') {
      recordToEdit.DoneDate = recordToEdit.getOpenCloseDate(Date.now());
    }

    this.apiGSheetDataService.saveOrUpdateRecord<TaskModel>(this.settingsService.metadata.sheetsInfo?.TASKS?.label as string,
      [this.taskColumns?.ID?.label as string],
      recordToEdit as TaskModel
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
          if (this.authService.isTasksAdmin()) {
            this.fullData = data;
          } else {
            this.fullData = data.filter(d => d.isAssignedTo(this.authService.Username));
          }
          this.initializeFilters(resetFilters);
        },
        error: () => this.settingsService.processingText = '',
        complete: () => {
          this.recordToDelete = null;
          this.hideEditDetailsDialog();
        }
      });
  }

  initializeFilters(resetFilters = false) {
    this.onFilterChange();
  }

  @debounce(500)
  override onFilterChange(): void {
    this.immediateFilterChange();
  }

  filterSearch(data: TaskModel) {
    return data.freeTextSearch(this.searchTextRegexp);
  }

  filterTaskStatus(data: TaskModel) {
    return data.Status === this.activeTaskStatus;
  }

  createRecord() {
    this.recordToEditOrig = null;
    this.recordToEdit = new TaskModel({ Date: new Date(), By: this.authService.Username, Status: 'Open' });
  }

  editRecord(record: TaskModel) {
    this.recordToEditOrig = record;
    this.recordToEdit = record.clone();
  }

  deleteRecord() {
    this.settingsService.processingText = `Deleting record...`;
    this.apiGSheetDataService.deleteRecord<TaskModel>(this.settingsService.metadata.sheetsInfo?.TASKS?.label as string,
      [this.taskColumns?.ID?.label as string],
      this.recordToDelete as TaskModel
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

  getCellClassNames(data: any, columnName: string) {
    return ``;
  }

  toggleExpandedRow(row: TaskModel) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  selectedTabChange(e: MatTabChangeEvent) {
    switch (e.index) {
      case 0:
        this.activeTaskStatus = 'Open';
        break;
      case 1:
        this.activeTaskStatus = 'Done';
        break;
      case 2:
        this.activeTaskStatus = 'Verified';
        break;
      default:
        this.activeTaskStatus = 'Open';
        break;
    }
    this.immediateFilterChange();
  }

  private immediateFilterChange() {
    const byPassFilter = (data: TaskModel) => true;
    let filterSearch = this.filterSearch;
    let filterTaskStatus = this.filterTaskStatus;

    if (!this.searchText) {
      filterSearch = byPassFilter;
    } else {
      this.searchTextRegexp = this.utilService.getFlexibleSearchTextRegexp(this.searchText);
    }

    this.data.data = this.fullData.filter(filterSearch).filter(filterTaskStatus);
  }
}
