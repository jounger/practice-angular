import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../api/service.service';

@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrls: ['./costing.component.scss']
})
export class CostingComponent implements OnInit {

  constructor(private serviceService: ServiceService) { }

  services: any[]
  monthToDate = 0
  estimatedSpend = 0
  lastMonth = 0
  changeFromLastMonth = 0

  ngOnInit(): void {
    this.getServices()
  }

  getServices() {
    this.serviceService.getServices()
    .subscribe(services => {
      this.services = services
      this.monthToDate = this.services.reduce((sum, val) => sum + val.spent, 0)
      this.estimatedSpend = this.services.reduce((sum, val) => sum + val.estimated, 0)
    });
  }

}
