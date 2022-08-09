import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FrcComponent } from './frc.component';



describe('FrcComponent', () => {
  let component: FrcComponent;
  let fixture: ComponentFixture<FrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FrcComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
