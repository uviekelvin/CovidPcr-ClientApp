import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { BookingStatus } from '../models/bookingStatus';
import { BookingVm } from '../models/bookingVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/bookings.html',
})
export class BookingsComponent implements OnInit {
  bookings: BookingVm[] = [];
  booking: BookingVm;
  bookingStatus = BookingStatus;
  form: FormGroup;
  modalRef?: BsModalRef;
  constructor(
    private testService: TestService,
    private modalService: BsModalService,
    private confirmService: ConfirmService
  ) {
    this.form = new FormGroup({
      resultType: new FormControl('', [Validators.required]),
      remarks: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.testService.getBookings({}).subscribe((res) => {
      this.bookings = res.data;
    });
  }

  openAddTestModal(template: TemplateRef<any>, booking: BookingVm) {
    this.modalRef = this.modalService.show(template);
    this.booking = booking;
  }
  addTest() {
    let addTest = {
      bookingCode: this.booking.bookingCode,
      resultType: +this.form.get('resultType')?.value,
      remarks: this.form.get('remarks')?.value,
    };
    this.testService.addTestResult(addTest).subscribe((res) => {
      this.updateBooking(res.data);
      this.modalRef.hide();
      this.form.reset();
      this.form.markAsPristine();
    });
  }
  cancelBooking(booking: BookingVm) {
    this.booking = booking;
    this.confirmService.confirm().subscribe((result) => {
      if (result) {
        this.testService
          .cancelBooking({
            bookingCode: booking.bookingCode,
            email: booking.email,
          })
          .subscribe((res) => {
            this.updateBooking(res.data);
          });
      }
    });
  }
  updateBooking(booking: BookingVm) {
    let findIndex = this.bookings.findIndex(
      (x) => x.bookingCode === this.booking.bookingCode
    );
    this.bookings[findIndex] = booking;
  }
}
