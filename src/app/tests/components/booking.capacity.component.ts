import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookingCapacityVm } from '../models/bookingCapacityVm';
import { LabVm } from '../models/lab.vm';
import { LocationVm } from '../models/locationVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/bookingCapacity.html',
})
export class BookingCapacityComponent implements OnInit {
  bookingCapacity: BookingCapacityVm[] = [];
  query: any = {
    page: 1,
    pageSize: 50,
  };
  date = new Date();
  testDayId: number;
  locations: LocationVm[] = [];
  labs: LabVm[] = [];
  form: FormGroup;
  modalRef?: BsModalRef;
  constructor(
    private testService: TestService,
    private modalService: BsModalService
  ) {
    this.form = new FormGroup({
      date: new FormControl(''),
      locationId: new FormControl('', Validators.required),
      labId: new FormControl('', Validators.required),
      availableSpace: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.populateBookingCapacity();
  }
  populateBookingCapacity() {
    this.testService.getBookingCapacity(this.query).subscribe((res) => {
      this.bookingCapacity = res.data;
    });
  }
  allocateSpaceModal(template: TemplateRef<any>) {
    this.testService.getLocationsWithLabs().subscribe((res) => {
      this.locations = res.data;
      this.modalRef = this.modalService.show(template);
    });
  }

  allocateSpace() {
    this.form.get('date').setValue(this.date);
    this.testService.allocateSpace(this.form.value).subscribe((res) => {
      this.modalRef.hide();
      this.form.reset();
      this.form.markAsPristine();
      this.populateBookingCapacity();
    });
  }
  getLabs() {
    let locationId = +this.form.get('locationId')?.value;
    let location = this.locations.find((x) => x.id === locationId);
    this.labs = location.labs;
  }
  addMoreSpaceModal(template: TemplateRef<any>, testDayId: number) {
    this.testDayId = testDayId;
    this.modalRef = this.modalService.show(template);
  }
  addMoreSpace(form: any) {
    this.testService
      .addMoreSpace({
        testDayId: this.testDayId,
        space: form?.availableSpace,
      })
      .subscribe((res) => {
        this.modalRef.hide();
        let testDay = this.bookingCapacity.findIndex(
          (x) => x.id === this.testDayId
        );
        this.bookingCapacity[testDay].availableSpace = res.data;
      });
  }
}
