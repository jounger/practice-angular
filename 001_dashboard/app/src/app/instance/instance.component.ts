import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { InstanceService } from '../api/instance.service';

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

  // bar
  public barChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public barChartData: MultiDataSet = [
    [350, 450, 120],
    [35, 45, 12],
  ];
  public barChartType: ChartType = 'horizontalBar';

  public barChartOptions: any = {
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

  constructor(private instanceService: InstanceService) { }

  ngOnInit(): void {
  }

  getInstance(id: any) {
    // this.instanceService.getInstanceByServiceId(id)
    // .subscribe(services => {
    //   this.services = services
    // });
  }

}
