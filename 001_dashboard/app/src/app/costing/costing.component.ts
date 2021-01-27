import { Component, OnInit } from '@angular/core';
import { BillingService } from '../api/billing.service';
import { ServiceService } from '../api/service.service';
import { UserService } from '../api/user.service';
import { Service } from '../service/service.component';

@Component({
  selector: 'app-costing',
  templateUrl: './costing.component.html',
  styleUrls: ['./costing.component.scss']
})
export class CostingComponent implements OnInit {

  constructor(private serviceService: ServiceService, private billingService: BillingService, private userService: UserService) { }

  user: any
  services: Service[]
  monthToDate = 0
  estimatedSpend = 0
  lastMonth = 0
  changeFromLastMonth = 0

  ngOnInit(): void {
    this.getServices()
    this.getBilling()
    this.getUser()
  }

  getServices() {
    this.serviceService.getServices()
      .subscribe(services => {
        this.services = services
        this.monthToDate = this.services.reduce((sum, val) => sum + val.spent, 0)
        this.estimatedSpend = this.services.reduce((sum, val) => sum + val.estimated, 0)
      });
  }

  getBilling() {
    this.billingService.getLastmonthBills().subscribe(bills => {
      this.lastMonth = bills.reduce((sum, val) => sum + val.paid, 0)
      this.changeFromLastMonth = this.estimatedSpend - this.lastMonth
    })
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user
    })
  }

  formatMoney(value: number) {
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: this.user && this.user.currency != null ? this.user.currency : 'USD',
    });
    return formatter.format(value)
  }

}
