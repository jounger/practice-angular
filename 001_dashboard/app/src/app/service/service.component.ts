import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import { InstanceService } from '../api/instance.service';
import { UserService } from '../api/user.service';
import { Instance } from '../instance/instance.component';

export interface Service {
  type: string;
  color: string;
  spent: number;
  estimated: number;
}

const ELEMENT_DATA: Service[] = []

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input('services') services: Service[];

  user: any

  displayColumns: string[] = ["type", "spent"]

  dataSource: any

  serviceSelected: Service

  instances: Instance[] = []

  // Doughnut
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors: Color[] = []

  public doughnutChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    }
  }

  constructor(private instanceService: InstanceService, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser()
    this.dataSource = [...this.services]
    const total = this.services.reduce((sum, val) => sum += val.spent, 0)
    this.dataSource.push({type: "TOTAL", spent: total, color: "transparent"})
    const data = []
    const color = []
    this.services.forEach(x => {
      data.push(x.spent)
      color.push(x.color)
      this.doughnutChartLabels.push(x.type)
    })
    this.doughnutChartData.push(data)
    this.doughnutChartColors.push({ backgroundColor: color })
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user
    })
  }

  formatMoney(value: number, type: string) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.user && this.user.currency != null ? this.user.currency : 'USD',
    });
    return formatter.format(value)
  }

  select(value: Service) {
    this.instances = []
    this.serviceSelected = value
    if (this.serviceSelected != null) {
      this.instanceService.getInstanceByServiceId(this.serviceSelected.type)
      .subscribe(instances => {
        this.instances = instances
      });
    }
  }

}
