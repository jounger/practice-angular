import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CostingComponent } from './costing/costing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from 'ng2-charts';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ServiceComponent } from './service/service.component';
import {MatTableModule} from '@angular/material/table';
import { InstanceComponent } from './instance/instance.component';

@NgModule({
  declarations: [
    AppComponent,
    CostingComponent,
    ServiceComponent,
    InstanceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
