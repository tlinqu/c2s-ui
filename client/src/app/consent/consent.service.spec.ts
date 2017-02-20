/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsentService } from './consent.service';

describe('ConsentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsentService]
    });
  });

  it('should ...', inject([ConsentService], (service: ConsentService) => {
    expect(service).toBeTruthy();
  }));
});
