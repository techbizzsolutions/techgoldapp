import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvanceBillPage } from './advance-bill';

@NgModule({
  declarations: [
    AdvanceBillPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvanceBillPage),
  ],
})
export class AdvanceBillPageModule {}
