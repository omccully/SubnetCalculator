import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator/subnet-mask-calculator.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PrivateIpAddressCalculatorComponent } from './private-ip-address-calculator/private-ip-address-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    SubnetMaskCalculatorComponent,
    NavMenuComponent,
    PrivateIpAddressCalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
