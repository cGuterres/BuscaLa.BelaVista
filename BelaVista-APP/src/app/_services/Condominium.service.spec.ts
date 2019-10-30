/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CondominiumService } from './Condominium.service';

describe('Service: Condominium', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CondominiumService]
    });
  });

  it('should ...', inject([CondominiumService], (service: CondominiumService) => {
    expect(service).toBeTruthy();
  }));
});
