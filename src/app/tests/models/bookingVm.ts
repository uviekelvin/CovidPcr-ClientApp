import { BookingStatus } from './bookingStatus';
import { TestResultVm } from './testResultVm';

export interface BookingVm {
  bookingCode: string;
  scheduledDate: Date;
  firstName: string;
  surName: string;
  phoneNumber: string;
  email: string;
  testType: string;
  lab: string;
  location: string;
  status: BookingStatus;
  testResult: TestResultVm;
}
