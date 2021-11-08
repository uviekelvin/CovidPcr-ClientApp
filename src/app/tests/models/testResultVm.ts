import { TestResultTypes } from './testResultTypes';

export interface TestResultVm {
  lab: string;
  location: string;
  patient: string;
  scheduleDate: Date;
  resultType: TestResultTypes;
  remarks: string;
}
