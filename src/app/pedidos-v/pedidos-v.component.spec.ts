import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosVComponent } from './pedidos-v.component';

describe('PedidosVComponent', () => {
  let component: PedidosVComponent;
  let fixture: ComponentFixture<PedidosVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
