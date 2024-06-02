import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesMixtaDetalleComponent } from './votes-mixta-detalle.component';

describe('VotesMixtaDetalleComponent', () => {
  let component: VotesMixtaDetalleComponent;
  let fixture: ComponentFixture<VotesMixtaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotesMixtaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VotesMixtaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
