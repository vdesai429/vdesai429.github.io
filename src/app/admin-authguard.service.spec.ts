/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminAuthguardService } from './admin-authguard.service';

describe('AdminAuthguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthguardService]
    });
  });

  it('should ...', inject([AdminAuthguardService], (service: AdminAuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
