import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SnackbarComponent} from './snackbar/snackbar.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SnackbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SnackbarComponent
    ],
    entryComponents: [ SnackbarComponent ]
})
export class ComponentsModule {
}
