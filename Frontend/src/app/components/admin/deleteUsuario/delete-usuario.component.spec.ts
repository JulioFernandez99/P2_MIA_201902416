import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUsuarioComponent } from './delete-usuario.component';

describe('DeleteUsuarioComponent', () => {
  let component: DeleteUsuarioComponent;
  let fixture: ComponentFixture<DeleteUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
