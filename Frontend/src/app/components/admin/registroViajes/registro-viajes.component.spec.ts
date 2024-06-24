import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroViajesComponent } from './registro-viajes.component';

describe('RegistroViajesComponent', () => {
  let component: RegistroViajesComponent;
  let fixture: ComponentFixture<RegistroViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroViajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
