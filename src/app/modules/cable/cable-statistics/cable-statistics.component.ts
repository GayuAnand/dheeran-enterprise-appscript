import { concatMap, map } from 'rxjs';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { BaseComponent } from 'src/app/common';
import { CustomerModel } from 'src/app/models';

@Component({
  selector: 'de-cable-statistics',
  templateUrl: './cable-statistics.component.html',
  styleUrls: ['./../../../../reusable-styles/page-component.scss', './cable-statistics.component.scss']
})
export class CableStatisticsComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  chart!: any;

  cacheInfo: any = null;

  rawCustomersData: CustomerModel[] = [];

  visibleAgents: Record<string, boolean> = {
    Anand: true,
    Sarath: true,
  };

  collectionType: 'month' | 'collectionDate' = 'collectionDate';

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
				return this.utilService.formatDate(e.label, "MMM'YY");
			},
      labelFontSize: 14
    },
    axisY: { 
      title: '',
      valueFormatString: '#,###,.##K',
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
        this.visibleAgents[e.dataSeries.name] = e.dataSeries.visible;
        e.chart.render();
      },
      fontSize: 16
    },
    data: []
  };

  ngOnInit(): void {
    this.settingsService.pageTitle = this.TKey.COMMON.CABLE;
    this.refreshRawData();
  }

  ngAfterViewInit(): void {
    this.chartOptions.data = [];
    this.renderChart();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cacheInfo?.destroy();
  }

  setChartInstance(chart: object) {
		this.chart = chart;
	}

  renderChart() {
    setTimeout(() => this.chart?.render());
  }

  refreshFilters() {
    let agents: Record<string, boolean> = {};
    this.rawCustomersData.forEach((data) => agents = Object.assign(agents, data.getCollectionAgents()));
    const agentsArr: string[] = Object.keys(agents);
    agentsArr.push('Total');
    agentsArr.sort();
    
    let chartData: Record<string, Record<string, number>> = {};
    const monthsInOrder = this.rawCustomersData[0]?.getMonthsInOrder() || [];
    agentsArr.forEach(agent => {
      chartData[agent] = {};
      monthsInOrder.forEach(month => chartData[agent][month] = 0);
    });

    this.rawCustomersData.forEach((data) => {
      const agentWiseCollection = data.getCollectionInfoByAgent(this.collectionType);
      Object.keys(agentWiseCollection).forEach(agent => {
        Object.keys(agentWiseCollection[agent]).forEach(month => {
          chartData[agent][month] = chartData[agent][month] || 0;
          chartData['Total'][month] = chartData['Total'][month] || 0;
          chartData[agent][month] += agentWiseCollection[agent][month];
          chartData['Total'][month] += agentWiseCollection[agent][month];
        });
      });
    });

    this.chartOptions.data = agentsArr.map(agent => {
      return {
        type: this.chartType,
        showInLegend: true,
        name: agent,
        visible: this.visibleAgents[agent],
        dataPoints: monthsInOrder.map(month => ({ label: month, y: chartData[agent][month] }))
      };
    });
    this.renderChart();
  }

  refreshRawData(force = false): void {
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
          this.rawCustomersData = data;
          this.refreshFilters();
        },
        error: (err) => {
          this.utilService.openErrorSnackBar(err.message, 'Close');
          this.settingsService.processingText = '';
        }
      });
  }
}
