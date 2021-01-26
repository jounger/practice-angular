import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

export interface Service {
  type: string;
  color: string;
  spent: number;
}

const ELEMENT_DATA: Service[] = []

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input('services') services: Service;

  displayColumns: string[] = ["type", "spent"]

  dataSource

  // Doughnut
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = []

  public doughnutChartOptions: any = {
    legend: {
      display: false
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.services
    // this.dataSource.forEach(x => {
    //   this.doughnutChartColors.push(x.color)
    // })
  }

}
