import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAlbumsComponent } from './sort-albums.component';

describe('SortAlbumsComponent', () => {
  let component: SortAlbumsComponent;
  let fixture: ComponentFixture<SortAlbumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAlbumsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SortAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
