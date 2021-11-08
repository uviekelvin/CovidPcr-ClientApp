import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LabVm } from '../models/lab.vm';
import { LocationVm } from '../models/locationVm';
import { TestDayVm } from '../models/testDayVm';
import { TestTypesVm } from '../models/testTypesVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/scheduleTest.html',
})
export class ScheduleTestComponent implements OnInit {
  form: FormGroup;
  locations: LocationVm[] = [];
  labs: LabVm[] = [];
  testDays: TestDayVm[] = [];
  testTypes: TestTypesVm[] = [];
  constructor(private testService: TestService, private router: Router) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      surName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      testDayId: new FormControl('', [Validators.required]),
      testTypeId: new FormControl('', [Validators.required]),
      locationId: new FormControl('', [Validators.required]),
      labId: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.testService.getLabLocationsAndTestDays().subscribe((res) => {
      this.locations = res.data;
    });
    this.testService.getTestTypes().subscribe((res) => {
      this.testTypes = res.data;
    });
  }
  getLabs() {
    let locationId = +this.form.get('locationId')?.value;
    let location = this.locations.find((x) => x.id === locationId);
    this.labs = location.labs;
  }
  getTestDays() {
    let labId = +this.form.get('labId')?.value;
    let lab = this.labs.find((x) => x.id === labId);
    this.testDays = lab.testDays;
  }
  scheduleTest() {
    this.testService.scheduleTest(this.form.value).subscribe((res) => {
      this.router.navigate(['../test/bookings']);
    });
  }
}
