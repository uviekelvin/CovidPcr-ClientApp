import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../shared/services/Api.services';
import { BookingCapacityVm } from './models/bookingCapacityVm';
import { BookingVm } from './models/bookingVm';
import { LocationVm } from './models/locationVm';
import { TestResultVm } from './models/testResultVm';
import { TestTypesVm } from './models/testTypesVm';

@Injectable({
  providedIn: 'root',
})
export class TestService extends ApiService {
  baseUrl = `${environment.baseUrl}/api/v1/tests`;
  backOfficeUrl = `${environment.baseUrl}/api/v1/backoffice`;
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  getBookings(query: any) {
    return this.GetDataWithFilter<BookingVm[]>(
      query,
      `${this.baseUrl}/getBookings`
    );
  }
  scheduleTest(model: any) {
    return this.post<BookingVm>(model, `${this.baseUrl}/schedule`);
  }
  cancelBooking(model: any) {
    return this.post<BookingVm>(model, `${this.baseUrl}/cancelBooking`);
  }
  getLabLocationsAndTestDays() {
    return this.GetAll<LocationVm[]>(
      `${this.baseUrl}/getLabLocationsAndTestDays`
    );
  }
  getTestTypes() {
    return this.GetAll<TestTypesVm[]>(`${this.baseUrl}/getTestTypes`);
  }
  addTestResult(model: any) {
    return this.post<BookingVm>(model, `${this.backOfficeUrl}/addTestResult`);
  }
  getTestResults(query: any) {
    return this.GetDataWithFilter<TestResultVm[]>(
      query,
      `${this.backOfficeUrl}/getTestsResult`
    );
  }
  viewTestResult(model: any) {
    return this.post<TestResultVm>(model, `${this.baseUrl}/getTestResults`);
  }
  getBookingCapacity(query: any) {
    return this.GetDataWithFilter<BookingCapacityVm[]>(
      query,
      `${this.backOfficeUrl}/getBookingCapacity`
    );
  }
  getLocationsWithLabs() {
    return this.GetAll<LocationVm[]>(
      `${this.backOfficeUrl}/getLocationsWithLabs`
    );
  }
  allocateSpace(model: any) {
    return this.post<any>(model, `${this.backOfficeUrl}/allocateTestDay`);
  }
  addMoreSpace(model: any) {
    return this.post<number>(model, `${this.backOfficeUrl}/addMoreSpace`);
  }
}
