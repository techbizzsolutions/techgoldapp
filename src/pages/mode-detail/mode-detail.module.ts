import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModeDetailPage } from './mode-detail';

@NgModule({
  declarations: [
    ModeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ModeDetailPage),
  ],
})
export class ModeDetailPageModule {}
