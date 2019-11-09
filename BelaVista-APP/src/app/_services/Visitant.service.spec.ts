/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisitantService } from './Visitant.service';

describe('Service: Visitant', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitantService]
    });
  });

  it('should ...', inject([VisitantService], (service: VisitantService) => {
    expect(service).toBeTruthy();
  }));
});
