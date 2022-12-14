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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { FileUploadModule } from 'primeng/fileupload';
import { CardComponent } from './components/card/card.component';

@NgModule({
    declarations: [SpinnerComponent, CardComponent],
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
        TooltipModule,
        SkeletonModule,
        FileUploadModule,
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
        TooltipModule,
        SkeletonModule,
        FileUploadModule,
        // Components
        CardComponent,
    ],
    providers: [],
})
export class SharedModule {}
