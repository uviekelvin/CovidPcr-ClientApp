import { Component, OnInit } from '@angular/core';
import { TestResultTypes } from '../models/testResultTypes';
import { TestResultVm } from '../models/testResultVm';
import { TestService } from '../test.service';

@Component({
  templateUrl: '../views/testResults.html',
})
export class TestResultsComponent implements OnInit {
  testResults: TestResultVm[] = [];
  resultTypes = TestResultTypes;
  query: any = {
    page: 1,
    pageSize: 50,
  };
  constructor(private testService: TestService) {}
  ngOnInit(): void {
    this.testService.getTestResults(this.query).subscribe((res) => {
      this.testResults = res.data;
    });
  }
}
