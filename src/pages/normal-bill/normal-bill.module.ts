import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NormalBillPage } from './normal-bill';

@NgModule({
  declarations: [
    NormalBillPage,
  ],
  imports: [
    IonicPageModule.forChild(NormalBillPage),
  ],
})
export class NormalBillPageModule {}
