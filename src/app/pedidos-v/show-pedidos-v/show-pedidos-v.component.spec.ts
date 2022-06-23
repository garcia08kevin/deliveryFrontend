import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPedidosVComponent } from './show-pedidos-v.component';

describe('ShowPedidosVComponent', () => {
  let component: ShowPedidosVComponent;
  let fixture: ComponentFixture<ShowPedidosVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPedidosVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPedidosVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
