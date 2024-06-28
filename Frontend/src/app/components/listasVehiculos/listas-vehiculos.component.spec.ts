import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasVehiculosComponent } from './listas-vehiculos.component';

describe('ListasVehiculosComponent', () => {
  let component: ListasVehiculosComponent;
  let fixture: ComponentFixture<ListasVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasVehiculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
