import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from 'ngx-spinner';
import { KeysPipe } from './pipes/enum.pipe';
import { ReadMoreComponent } from './components/readmore.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ShareButtonsModule, ShareDirectiveModule } from 'ngx-sharebuttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShortNumberPipe } from './pipes/ShortNumberPipe';

//import { TextInputComponent } from './components/text.component';
import { HasPermissionDirective } from './directives/user-permission.directive';
import { HasRoleDirective } from './directives/user-role.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ModalModule, NgxSpinnerModule],
  exports: [
    CommonModule,
    KeysPipe,
    ReadMoreComponent,
    ReactiveFormsModule,
    ModalModule,
    NgxSpinnerModule,
  ],
  declarations: [KeysPipe, ReadMoreComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
