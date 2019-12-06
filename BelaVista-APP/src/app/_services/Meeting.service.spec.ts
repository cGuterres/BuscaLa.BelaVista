/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingService } from './Meeting.service';

describe('Service: Meeting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingService]
    });
  });

  it('should ...', inject([MeetingService], (service: MeetingService) => {
    expect(service).toBeTruthy();
  }));
});
