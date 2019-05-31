import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CalendarayaComponent } from './calendaraya.component';

@NgModule({
    imports:[
        CommonModule,
        IonicModule
    ],
    exports:[
        CalendarayaComponent
    ],
    declarations:[
        CalendarayaComponent
    ]
})
export class CalendarayaModule{}