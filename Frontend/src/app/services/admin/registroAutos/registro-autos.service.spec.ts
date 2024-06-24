import { TestBed } from '@angular/core/testing';

import { RegistroAutosService } from './registro-autos.service';

describe('RegistroAutosService', () => {
  let service: RegistroAutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroAutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
