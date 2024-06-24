import { TestBed } from '@angular/core/testing';

import { RegistroRecepcionistaService } from './registro-recepcionista.service';

describe('RegistroRecepcionistaService', () => {
  let service: RegistroRecepcionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroRecepcionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
