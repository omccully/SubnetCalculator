import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component';
import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator/subnet-mask-calculator.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PrivateIpAddressCalculatorComponent } from './private-ip-address-calculator/private-ip-address-calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubnetMaskComponent } from './subnet-mask/subnet-mask.component';
import { HelpToolTipComponent } from './help-tool-tip/help-tool-tip.component';

@NgModule({
  declarations: [
    AppComponent,
    SubnetMaskCalculatorComponent,
    NavMenuComponent,
    PrivateIpAddressCalculatorComponent,
    SubnetMaskComponent,
    HelpToolTipComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
