import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

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

  dataSource: any

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
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
            drawBorder: false,
            drawOnChartArea: false,
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines: {
            drawBorder: false,
            drawOnChartArea: false,
        }
      }]
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.instances
    this.instances.forEach(x => {
      this.barChartLabels.push(x.type.toLocaleLowerCase())
      this.barChartData[0].data.push(x.onDemandHours)
      this.barChartData[1].data.push(x.reservedHours)
    })
  }
}
