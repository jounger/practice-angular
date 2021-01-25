import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

export interface Service {
  type: string;
  onDemandHours: number;
  reservedHours: number;
  totalHours: number;
  coverage: number;
}

const ELEMENT_DATA: Service[] = [
  {type: "T2.Medium", onDemandHours: 1071.22, reservedHours: 0, totalHours: 1071.22, coverage: 0},
]


@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss']
})
export class InstanceComponent implements OnInit {

  displayColumns: string[] = ["name", "onDemandHours", "reservedHours", "totalHours", "coverage"]

  dataSource = ELEMENT_DATA

  // Doughnut
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  public doughnutChartType: ChartType = 'bar';

  constructor() { }

  ngOnInit(): void {
  }

}
