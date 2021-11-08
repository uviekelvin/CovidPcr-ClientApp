import { Component, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TestResultTypes } from '../models/testResultTypes';
import { TestResultVm } from '../models/testResultVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/viewResult.html',
})
export class ViewTestResultComponent {
  form: FormGroup;
  modalRef?: BsModalRef;
  testResult: TestResultVm;
  resultTypes = TestResultTypes;
  constructor(
    private testService: TestService,
    private modalService: BsModalService
  ) {
    this.form = new FormGroup({
      bookingCode: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    });
  }

  viewResult(template: TemplateRef<any>) {
    this.testService.viewTestResult(this.form.value).subscribe((res) => {
      this.testResult = res.data;
      this.modalRef = this.modalService.show(template);
    });
  }
}
