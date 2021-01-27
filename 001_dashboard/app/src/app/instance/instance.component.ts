import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

export interface Instance {
  type: string;
  onDemandHours: number;
  reservedHours: number;
  totalHours: number;
  coverage: number;
}

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: ['./instance.component.scss']
})
export class InstanceComponent implements OnInit {

  @Input('instances') instances: Instance[];

  displayColumns: string[] = ["type", "onDemandHours", "reservedHours", "totalHours", "coverage"]

  dataSource

  // bar
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'On Demand Hours' },
    { data: [], label: 'Reserved Hours' }
  ];
  public barChartType: ChartType = 'horizontalBar';

  public barChartColors: Color[] = [
    {backgroundColor: "#c0422b"},
    {backgroundColor: "#abc187"}
  ]

  public barChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.instances

    const onDemandHours = []
    const reservedHours = []
    this.instances.forEach(x => {
      this.barChartLabels.push(x.type.toLocaleLowerCase())
      this.barChartData[0].data.push(x.onDemandHours)
      this.barChartData[1].data.push(x.reservedHours)
    })
  }



}
