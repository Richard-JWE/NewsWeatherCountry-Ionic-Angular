import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettPage1 } from './sett';

@NgModule({
  declarations: [
    SettPage1,
  ],
  imports: [
    IonicPageModule.forChild(SettPage1),
  ],
})
export class SettPageModule {}
