import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPedidosComponent } from './add-edit-pedidos.component';

describe('AddEditPedidosComponent', () => {
  let component: AddEditPedidosComponent;
  let fixture: ComponentFixture<AddEditPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
