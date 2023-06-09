import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator/subnet-mask-calculator.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PrivateIpAddressCalculatorComponent } from './private-ip-address-calculator/private-ip-address-calculator.component';

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
      
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
