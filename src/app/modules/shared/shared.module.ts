import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    TieredMenuModule,
    MenuModule,
    RippleModule,
    ButtonModule,
    CardModule,
    DialogModule,
    AutoCompleteModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    TabMenuModule,
    AccordionModule,
    TabViewModule,
  ],
  exports: [
    CommonModule,
    TieredMenuModule,
    MenuModule,
    RippleModule,
    ButtonModule,
    CardModule,
    DialogModule,
    AutoCompleteModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    TabMenuModule,
    AccordionModule,
    TabViewModule,
    SpinnerComponent,
  ],
  providers: [],
})
export class SharedModule {}
