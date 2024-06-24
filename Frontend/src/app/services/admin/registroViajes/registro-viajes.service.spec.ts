import { TestBed } from '@angular/core/testing';

import { RegistroViajesService } from './registro-viajes.service';

describe('RegistroViajesService', () => {
  let service: RegistroViajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroViajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
