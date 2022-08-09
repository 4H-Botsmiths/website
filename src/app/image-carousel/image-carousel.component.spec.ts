import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ImageCarouselComponent } from './image-carousel.component';



describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent;
  let fixture: ComponentFixture<ImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ImageCarouselComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
