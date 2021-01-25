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

  @Input('services') services: Service[];

  displayColumns: string[] = ["type", "spent"]

  dataSource

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
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
    this.dataSource.total = this.services.reduce((sum, val) => sum += val.spent, 0)
    const data = []
    const color = []
    const type = []
    this.services.forEach(x => {
      data.push(x.spent)
      color.push(x.color)
      this.doughnutChartLabels.push(x.type)
    })
    this.doughnutChartData.push(data)
    this.doughnutChartColors.push({ backgroundColor: color })
  }

}
