import { concatMap, map } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { UGPatrolModel } from 'src/app/models';

@Component({
  selector: 'de-ug-statistics',
  templateUrl: './ug-patrol-statistics.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './ug-patrol-statistics.component.scss'],
})
export class UGPatrolStatisticsComponent extends BaseComponent implements OnInit, AfterViewInit {
  chart!: any;

  fullData: UGPatrolModel[] = [];

  cacheInfo: any = null;

  chartType = 'line';

  chartOptions: any = {
    animationEnabled: true,
    exportEnabled: true,
    zoomEnabled: true,
    zoomType: 'x',
    title:{
      text: ''
    },
    axisX: {
      title: '',
      labelFormatter: (e: any) => {
				return this.utilService.formatDate(e.label, "DD-MMM-YYYY");
			},
      labelFontSize: 14
    },
    axisY: { 
      title: '',
      gridDashType: 'dash',
      labelFontSize: 14
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor:'pointer',
      itemclick: (e: any) => {
        if (typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      },
      fontSize: 16
    },
    data: []
  };

  constructor() {
    super();
    this.settingsService.pageTitle = this.TKey.COMMON.UG_PATROL;
  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.refreshData();
  }

  refreshData(force = false) {
    this.settingsService.processingText = `Refreshing data...`;
    this.apiGSheetDataService.getSheetData<UGPatrolModel>(this.settingsService.metadata.sheetsInfo?.UG_PATROL.label as string, UGPatrolModel, force)
      .pipe(
        concatMap((res) => this.getRefreshCacheInfo(`SHEET_${this.settingsService.metadata.sheetsInfo?.UG_PATROL.label}` as string, this.cacheInfo)
          .pipe(
            map((value) => {
              this.cacheInfo = value;
              return res;
            }))
          )
      )
      .subscribe({
        next: (data) => {
          this.fullData = data;
          this.initializeChartData();
        },
        error: (err) => this.utilService.openErrorSnackBar(`ERROR IN FETCHING DATA: ${err}`, 'Close'),
        complete: () => {
          this.settingsService.processingText = '';
        }
      });
  }

  initializeChartData() {
    const dateWiseData: Record<string, number> = {};

    this.fullData.forEach((data) => {
      const dateStr = this.utilService.formatDate(data.Date, 'DD-MMM-YY');
      dateWiseData[dateStr] = dateWiseData[dateStr] || 0;
      dateWiseData[dateStr] += data.PatrolCount;
    });

    this.chartOptions.data = [{
        type: this.chartType,
        showInLegend: true,
        name: 'Patrol Count',
        dataPoints: Object.keys(dateWiseData).map(dateStr => ({ label: dateStr, y: dateWiseData[dateStr] }))
    }];
    this.renderChart();
  }

  renderChart() {
    setTimeout(() => this.chart?.render());
  }

  setChartInstance(chart: object) {
		this.chart = chart;
	}
}
