import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvanceItemDetailPage } from './advance-item-detail';

@NgModule({
  declarations: [
    AdvanceItemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvanceItemDetailPage),
  ],
})
export class AdvanceItemDetailPageModule {}
