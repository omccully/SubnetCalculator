import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator/subnet-mask-calculator.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PrivateIpAddressCalculatorComponent } from './private-ip-address-calculator/private-ip-address-calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubnetMaskComponent } from './subnet-mask/subnet-mask.component';

@NgModule({
  declarations: [
    AppComponent,
    SubnetMaskCalculatorComponent,
    NavMenuComponent,
    PrivateIpAddressCalculatorComponent,
    SubnetMaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
