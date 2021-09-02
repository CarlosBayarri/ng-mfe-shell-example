import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Mfe3RoutingModule } from './mfe3-routing.module';
import { Mfe3Component } from './mfe3.component';


@NgModule({
  declarations: [Mfe3Component],
  imports: [
    CommonModule,
    Mfe3RoutingModule
  ]
})
export class Mfe3Module { }
