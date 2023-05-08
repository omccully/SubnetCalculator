import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator/subnet-mask-calculator.component';
import { PrivateIpAddressCalculatorComponent } from './private-ip-address-calculator/private-ip-address-calculator.component';

const routes: Routes = [
  { path: 'subnet-mask-calculator', component: SubnetMaskCalculatorComponent },
  { path: 'private-ip-address-calculator', component: PrivateIpAddressCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
