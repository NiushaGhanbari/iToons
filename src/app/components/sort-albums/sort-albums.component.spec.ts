import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAlbumsComponent } from './sort-albums.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SortAlbumsComponent', () => {
  let component: SortAlbumsComponent;
  let fixture: ComponentFixture<SortAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAlbumsComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SortAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
